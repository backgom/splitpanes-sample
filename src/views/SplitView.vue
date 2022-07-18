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
import { onMounted } from 'vue';
import gridData from '../constant/gridData';
import RealGrid from 'realgrid';
import TabComponent from '../components/tab/TabComponent.vue';

onMounted(() => {
  const provider = new RealGrid.LocalDataProvider();
  const provider2 = new RealGrid.LocalDataProvider();
  const gridViewInstance = RealGrid.getGridInstance('realgrid');
  const gridView = gridViewInstance
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
  ]);

  provider2.setFields([
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
    {
      name: 'filter1',
      text: '10대 이하',
      tag: 10,
      callback: ageFilter,
    },
    {
      name: 'filter2',
      text: '20대 이상',
      tag: 20,
      callback: ageFilter,
    },
  ]);

  provider.fillJsonData(gridData.rows, { fillMode: 'set' });
  provider2.fillJsonData(gridData.rows, { fillMode: 'set' });
});

function getBlockedButton() {}

function ageFilter() {}
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
