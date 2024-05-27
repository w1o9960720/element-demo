<template>
  <yun-filter
    v-model="searchQuery"
    :fields="serchFields"
    clearable
    filter-cache-name="summarize"
    @submit="handleSrarch"
    @reset="handleSrarch"
  >
    <template #shipperId>
      <nh-shipper-selector v-model:shipperId="searchQuery.shipperId" />
    </template>
  </yun-filter>
  <div style="padding: 0 24px">
    <yun-table
      v-model:pagination="pagination"
      :loading="loading.getTableData"
      :data="tableData"
      :columns="TABLECOLUMN"
      size="default"
      show-table-setting
      :table-header-key="`${$route.path}-summarize`"
      :height="tableHeight"
      @update:pagination="getTableData"
    >
      <template #tableHeaderLeft>
        <nh-button
          v-if="false"
          @click="handleExport"
        >
          导出
        </nh-button>
      </template>
    </yun-table>
  </div>
</template>
<script>
import { ref, reactive, unref, onMounted } from 'vue';
import useTableHeight from '@/hooks/useTableHeightResize';
import moment from 'moment';
import { TABLECOLUMN, serchFields } from './fileds-summarize';
import { reportPage, pageExport } from './api/summarize';
</script>
<script setup>
const { tableHeight } = useTableHeight();
const loading = reactive({
  getTableData: false,
});
const searchQuery = ref({
  time: [moment().startOf('day').valueOf(), moment().endOf('day').valueOf()],
});
const pagination = ref({
  page: 1,
  size: 10,
  total: null,
  pageSizes: [10, 50, 100, 400],
});
const tableData = ref([]);
const formatterData = () => {
  const { time, ...other } = unref(searchQuery);
  const [startTime, endTime] = time || [];
  return {
    ...other,
    startTime,
    endTime,
  };
};
const getTableData = async () => {
  loading.getTableData = true;
  const data = formatterData();
  try {
    const { total, records } = await reportPage(
      {
        page: pagination.value.page,
        size: pagination.value.size,
      },
      data,
    );
    tableData.value = records;
    pagination.value.total = total;
  } finally {
    loading.getTableData = false;
  }
};
onMounted(() => {
  getTableData(); 
});

const handleSrarch = () => {
  pagination.value.page = 1;
  getTableData();
};
const handleExport = () => {
  pageExport();
};
</script>
