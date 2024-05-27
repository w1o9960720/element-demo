<template>
  <div class="type">
    <el-dropdown
      trigger="click"
      :class="{ active: dropdownActive }"
      @visible-change="
        (val) => {
          dropdownActive = val;
        }
      "
    >
      <span class="label">明细表类型</span>
      <span>
        <span>{{ selectType.label }}</span>
        <el-icon><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="no-icon">
          <el-dropdown-item
            v-for="item in detailType"
            :key="item.value"
            @click="handleChangeType(item)"
          >
            <p :class="['drops-list', { action: selectType.value === item.value }]">
              {{ item.label }}
            </p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <yun-filter
    v-model="searchQuery"
    :fields="serchFields[selectType.value]"
    clearable
    filter-cache-name="detail"
    @submit="handleSrarch"
    @reset="handleSrarch"
  >
    <template #shipperId>
      <nh-shipper-selector v-model:shipperId="searchQuery.shipperId" />
    </template>
  </yun-filter>
  <div style="padding: 0 24px">
    <yun-table
      v-if="!updateHeader"
      v-model:pagination="pagination"
      :loading="loading.getTableData"
      :data="tableData"
      :columns="TABLECOLUMN[selectType.value]"
      size="default"
      show-table-setting
      :table-header-key="`${$route.path}-summarize-${selectType.value}`"
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
import { CaretBottom } from '@element-plus/icons-vue';
import useTableHeight from '@/hooks/useTableHeightResize';
import moment from 'moment';
import { TABLECOLUMN, serchFields } from './fileds-detail';
import { detailType } from './config';
import { pageDetail } from './api/detail';
</script>
<script setup>
const { tableHeight } = useTableHeight();
const loading = reactive({
  getTableData: false,
});
const dropdownActive = ref(false);
const selectType = ref(detailType[0]);
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
const updateHeader = ref(false);
const formatterData = () => {
  const { value: reportType } = unref(selectType);
  const { time, ...other } = unref(searchQuery);
  const [startTime, endTime] = time || [];
  return {
    ...other,
    reportType,
    startTime,
    endTime,
  };
};

const getTableData = async () => {
  const data = formatterData();
  try {
    loading.getTableData = true;
    const { records, total } = await pageDetail(
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
const handleChangeType = (select) => {
  updateHeader.value = true;
  pagination.value.page = 1;
  searchQuery.value = {
    time: [moment().startOf('day').valueOf(), moment().endOf('day').valueOf()],
  };
  selectType.value = select;
  getTableData();
  setTimeout(() => {
    updateHeader.value = false;
  }, 0);
};
const handleExport = () => {};
</script>
<style scoped lang="scss">
.type {
  padding: 26px 0 0 26px;
  font-size: 14px;
  .el-dropdown {
    color: var(--el-text-color-primary);
    .label {
      margin-right: 4px;
      color: var(--el-text-color-secondary);
    }
    .el-icon {
      font-size: 22px;
      vertical-align: middle;
    }
  }
}
.el-dropdown {
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  &:hover,
  &.active {
    background-color: var(--el-border-color-lighter);
  }
  :deep(.el-popper__arrow) {
    display: none;
  }
}
.drops-list {
  width: 104px;
  &.action {
    color: var(--el-color-primary);
  }
}
</style>
<style lang="scss">
.el-dropdown__popper:has(.no-icon) {
  .el-popper__arrow {
    display: none;
  }
}
</style>
