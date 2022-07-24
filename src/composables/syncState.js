import { reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBroadcastChannel } from '@vueuse/core';

export function useSyncState(state, parentAction, childAction) {
  const route = useRoute();
  const viewName = route.name;

  // State 동기화를 위해 Broadcast Channel API 설정
  const { data, post, isClosed } = useBroadcastChannel({
    name: viewName,
  });

  // 부모창의 State를 Broadcast Channel API를 통해 자식창으로 전달
  function sync() {
    parentAction();
    if (!isClosed.value) {
      const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };

      post({ syncMessage: JSON.stringify(state, getCircularReplacer()) });
    }
  }

  // 자식창의 화면이 시작될 때 부모창에 State를 전달 받을 수 있는 상태임을 알리는 메시지 전달
  onMounted(() => {
    if (window.opener) {
      window.opener.postMessage({ syncReady: true });
    }
  });

  // 자식창에서 부모창으로 보내는 메시지 수신 및 동기화 함수 실행
  window.addEventListener('message', (e) => {
    // console.log('get a message', e.data, isSupported, isClosed.value);
    if (e.data.syncReady) {
      sync();
    }
  });

  // window.addEventListener('beforeunload', (e) => {
  //   if (!isClosed.value) close();
  // });

  // onDeactivated(() => {
  //   if (!isClosed.value) close();
  // });

  const syncState = reactive({});

  // Broadcasting된 메시지가 있을 경우 syncState에 반영
  watch(data, () => {
    const json = JSON.parse(data.value.syncMessage || '{}');
    Object.entries(json).forEach(([key, value]) => {
      syncState[key] = value;
    });
  });

  // 자식창에서 동기화 된 데이터를 반영
  watch(syncState, () => {
    Object.entries(syncState).forEach(([key, value]) => {
      state[key] = value;
    });

    childAction();
  });

  return { syncState: syncState };
}
