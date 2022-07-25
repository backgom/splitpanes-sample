<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav class="invisible-scrollbar">
        <Draggable :list="tabs" item-key="id" class="tabs">
          <template #item="{ element }">
            <a
              v-if="element.type === 'popup'"
              href="#"
              class="link"
              @click="() => openWindow(element.url + '?mode=popup')"
              >{{ element.name }}</a
            >
            <RouterLink v-else :to="element.url">{{ element.name }}</RouterLink>
          </template>
        </Draggable>
      </nav>
    </div>
  </header>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Draggable from 'vuedraggable';
import HelloWorld from '@/components/HelloWorld.vue';

const dragOptions = computed(() => ({
  disabled: false,
  group: 'description',
}));

const dragging = ref(false);
const tabs = ref([
  {
    id: 0,
    name: 'Home',
    url: '/home',
    type: 'default',
  },
  {
    id: 1,
    name: 'About',
    url: '/about',
    type: 'default',
  },
  {
    id: 2,
    name: 'About (Popup)',
    url: '/about',
    type: 'popup',
  },
  {
    id: 3,
    name: 'Splitpanes',
    url: '/splitpanes',
    type: 'default',
  },
  {
    id: 4,
    name: 'Splitpanes (Popup)',
    url: '/splitpanes',
    type: 'popup',
  },
]);

function openWindow(url) {
  const hash = Date.now().toString(36);
  // window.open(url, `popup-${hash}`, 'width=700,height=500');
  window.open(url, `popup`, 'width=700,height=500');
}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}

.invisible-scrollbar {
  overflow-x: scroll;
  width: 20vw;
  border: 1px solid red;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tabs {
  min-width: 10vw;
  height: 1.5em;
  display: flex;

  a {
    flex-shrink: 0;
    flex-basis: fit-content;
  }
}
</style>
