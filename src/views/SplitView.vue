<template>
  <Splitpanes class="default-theme">
    <Pane min-size="20">
      <div class="contents">
        <div id="realgrid" style="width: 500px; height: 300px"></div>
      </div>
    </Pane>
    <Pane>
      <div class="contents">
        <div id="realgrid2" style="width: 500px; height: 400px"></div>
      </div>
    </Pane>
    <Pane>
      <div class="contents">
        <TabComponent />
      </div>
    </Pane>
  </Splitpanes>
</template>

<script setup>
// @ts-check
import { onMounted, reactive, watch } from 'vue';
import { useSyncState } from '@/composables/syncState';
import gridData from '../constant/gridData';
import RealGrid, {
  DataFillMode,
  GridView,
  RowStateList,
  RowState,
} from 'realgrid';
import TabComponent from '../components/tab/TabComponent.vue';

const state = reactive({
  data: [],
  fields: [],
  layout: [],
  /**
   * @type {RowStateList}
   */
  stateRows: {},
});

// State 동기화 설정
const { syncState } = useSyncState(state, parentAction, childAction);

// State를 동기화하는 시점에 필요한 로직 추가
function parentAction() {
  state.data = provider.getJsonRows(0, -1, true); // RealGrid의 현재 Data를 가져옴
  state.stateRows = provider.getAllStateRows();
  state.layout = gridView.saveColumnLayout(); // RealGrid의 현재 Column 상태 정보를 가져옴
}

// 부모창으로 부터 전달 받은 State를 현재 화면에 반영
function childAction() {
  gridView.setColumnLayout(state.layout);

  provider.fillJsonData(state.data, { fillMode: DataFillMode.SET });

  provider.setRowStates(
    state.stateRows[RowState.UPDATED],
    RowState.UPDATED,
    false,
    false
  );
  provider.setRowStates(
    state.stateRows[RowState.DELETED],
    RowState.DELETED,
    false
  );
  provider.setRowStates(
    state.stateRows[RowState.CREATE_AND_DELETED],
    RowState.CREATE_AND_DELETED,
    false
  );
}

const provider = new RealGrid.LocalDataProvider(true);
const provider2 = new RealGrid.LocalDataProvider(true);

/**
 * @type {GridView}
 */
let gridView;

onMounted(() => {
  const gridViewInstance = RealGrid.getGridInstance('realgrid');
  gridView = gridViewInstance
    ? gridViewInstance
    : new RealGrid.GridView('realgrid');
  const gridView2Instance = RealGrid.getGridInstance('realgrid2');
  const gridView2 = gridView2Instance
    ? gridView2Instance
    : new RealGrid.GridView('realgrid2');
  gridView.setDataSource(provider);
  gridView2.setDataSource(provider2);

  gridView.displayOptions.rowHeight = 36;

  gridView.setRowIndicator({
    visible: false,
  });

  provider.setFields([
    //@ts-ignore
    { fieldName: 'no' },
    //@ts-ignore
    { fieldName: 'id' },
    //@ts-ignore
    { fieldName: 'pw' },
    //@ts-ignore
    { fieldName: 'name' },
    //@ts-ignore
    { fieldName: 'gender' },
    //@ts-ignore
    { fieldName: 'age' },
    //@ts-ignore
    { fieldName: 'phoneNumber' },
    //@ts-ignore
    {
      fieldName: 'createdAt',
      //@ts-ignore
      dataType: 'datetime',
      datetimeFormat: 'yyyy-MM-dd',
    },
    //@ts-ignore
    { fieldName: 'statusCode' },
    //@ts-ignore
    { fieldName: 'blocked', dataType: 'boolean' },
  ]);

  provider2.setFields([
    //@ts-ignore
    { fieldName: 'no' },
    //@ts-ignore
    { fieldName: 'id' },
    //@ts-ignore
    { fieldName: 'pw' },
    //@ts-ignore
    { fieldName: 'name' },
    //@ts-ignore
    { fieldName: 'gender' },
    //@ts-ignore
    { fieldName: 'age' },
    //@ts-ignore
    { fieldName: 'phoneNumber' },
    //@ts-ignore
    {
      fieldName: 'createdAt',
      //@ts-ignore
      dataType: 'datetime',
      datetimeFormat: 'yyyy-MM-dd',
    },
    //@ts-ignore
    { fieldName: 'statusCode' },
    //@ts-ignore
    { fieldName: 'blocked', dataType: 'boolean' },
  ]);

  gridView.setColumns([
    { name: 'no', fieldName: 'no', width: 60 },
    { name: 'id', fieldName: 'id', width: 60 },
    { name: 'pw', fieldName: 'pw' },
    { name: 'name', fieldName: 'name', width: 60 },
    { name: 'gender', fieldName: 'gender', width: 50 },
    { name: 'age', fieldName: 'age', width: 50 },

    {
      name: 'phoneNumber',
      fieldName: 'phoneNumber',
      textFormat: '([0-9]{3})([0-9]{4})([0-9]{4}); $1-$2-$3',
    },

    {
      name: 'createdAt',
      fieldName: 'createdAt',
      width: 80,
      editor: {
        type: 'date',
      },
    },

    {
      name: 'statusCode',
      fieldName: 'statusCode',
      width: 80,
      lookupDisplay: true,
      values: ['0', '1', '2'],
      labels: ['정상', '휴면', '분리보관'],
    },

    {
      name: 'blocked',
      fieldName: 'blocked',
      editable: false,
      renderer: {
        type: 'html',
        callback: getBlockedButton,
      },
    },
  ]);

  gridView2.setColumns([
    { name: 'no', fieldName: 'no', width: 60 },
    { name: 'id', fieldName: 'id', width: 60 },
    { name: 'pw', fieldName: 'pw' },
    { name: 'name', fieldName: 'name', width: 60 },
    { name: 'gender', fieldName: 'gender', width: 50 },
    { name: 'age', fieldName: 'age', width: 50 },

    {
      name: 'phoneNumber',
      fieldName: 'phoneNumber',
      textFormat: '([0-9]{3})([0-9]{4})([0-9]{4}); $1-$2-$3',
    },

    {
      name: 'createdAt',
      fieldName: 'createdAt',
      width: 80,
      editor: {
        type: 'date',
      },
    },

    {
      name: 'statusCode',
      fieldName: 'statusCode',
      width: 80,
      lookupDisplay: true,
      values: ['0', '1', '2'],
      labels: ['정상', '휴면', '분리보관'],
    },

    {
      name: 'blocked',
      fieldName: 'blocked',
      editable: false,
      renderer: {
        type: 'html',
        callback: getBlockedButton,
      },
    },
  ]);

  gridView.setColumnFilters('age', [
    //@ts-ignore
    {
      name: 'filter1',
      text: '10대 이하',
      tag: '10',
      callback: ageFilter,
    },
    //@ts-ignore
    {
      name: 'filter2',
      text: '20대 이상',
      tag: '20',
      callback: ageFilter,
    },
  ]);

  state.data = gridData.rows;
  state.fields = [
    { fieldName: 'no' },
    { fieldName: 'id' },
    { fieldName: 'pw' },
    { fieldName: 'name' },
    { fieldName: 'gender' },
    { fieldName: 'age' },
    { fieldName: 'phoneNumber' },

    {
      fieldName: 'createdAt',
      dataType: 'datetime',
      datetimeFormat: 'yyyy-MM-dd',
    },

    { fieldName: 'statusCode' },
    { fieldName: 'blocked', dataType: 'boolean' },
  ];

  provider.fillJsonData(state.data, { fillMode: DataFillMode.SET });
  provider2.fillJsonData(gridData.rows, { fillMode: DataFillMode.SET });
});

function getBlockedButton() {
  return false;
}

function ageFilter() {
  return false;
}
</script>

<style lang="scss" scoped>
.default-theme {
  max-width: 600px;
  height: 400px;
}

.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 1, 1, 0.6);
  font-size: 5em;
}

.contents {
  overflow-x: scroll;
  width: 500px;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
