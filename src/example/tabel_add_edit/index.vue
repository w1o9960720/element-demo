<template>
  <div class="pro-table-bg">
    <yun-pro-table
      ref="proTableRef"
      v-model:pagination="page"
      v-model:searchData="searchData"
      :search-fields="searchFields"
      :table-columns="tableColumns"
      :remote-method="remoteMethod"
      :layout="'whole'"
      @reset="initTable"
    >
      <template #t_action="{ row }">
        <el-button
          type="text"
          @click="handleEdit(row)"
        >
          编辑
        </el-button>
        <el-button
          type="text"
          @click="handleLog(row)"
        >
          操作记录
        </el-button>
      </template>
    </yun-pro-table>
    <edit-drawer
      v-model:visible="visible"
      :data="state.info"
      @confirm="confirmHandler"
    />
    <detail
      v-model:visible="visibleDetail"
      :info="state.info"
    />
  </div>
  <operation-log
    v-model:visible="logVisible"
    :data="state.info"
  />
</template>

<script lang="jsx" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { changeCurTitle } from '@/materials/page-tabs/index';
import useInitTable from '@/hooks/useInitTable';
import OperationLog from './components/log.vue';
// import { tablePropsFn } from '../constant';
import EditDrawer from './components/edit.vue';
import Detail from '@/views/bms/settle/bills/components/detailModel.vue';
import useLocalData from './hooks/useLocalData.jsx';
import useHandler from './hooks/useHandler';
import { TitleType, BT } from './constant';

const route = useRoute();

const {
  proTableRef,
  page,
  searchFieldsCreate,
  tableColumns,
  remoteMethod,
  visible,
  state,
  visibleDetail,
} = useLocalData();

const { initTable } = useInitTable({
  page,
  tableRef: proTableRef,
});
const searchFields = ref([]);
searchFields.value = searchFieldsCreate(route.params.accountType);

// 新增计费 next
const searchData = reactive({});
const { handleEdit, confirmHandler } = useHandler({
  visible,
  initTable,
  state,
  visibleDetail,
});

// onMounted(() => {
//   const {
//     params: { accountType, businessType },
//   } = route;
//   console.log('accountType', 'businessType', accountType, businessType);
//   const curTitle = `${TitleType[businessType] || ''}${BT[accountType] || ''}开票`;
//   changeCurTitle(curTitle);
// });

watch(
  () => route.params,
  (to) => {
    const { path } = route;
    const { accountType, businessType } = to;
    if (path !== `/invoice/${accountType}/${businessType}/index`) {
      return;
    }
    // shipper carrier driver
    const curTitle = `${TitleType[businessType] || ''}${BT[accountType] || ''}开票`;
    changeCurTitle(curTitle);
    if (proTableRef.value) {
      searchFields.value = searchFieldsCreate(accountType);
      initTable();
    }
  },
  {
    immediate: true,
  },
);

// const nextFormRef = ref(null);
// const nextForm = reactive({
//   customerNo: null,
//   contractNo: null,
//   contractName: null,
// });
// const contractChangeHandler = (value) => {
//   const item = contractList.find((ele) => ele.value === value);
//   nextForm.contractName = item?.label;
// };
const logVisible = ref(false);

const handleLog = (row) => {
  state.info = row;
  logVisible.value = true;
};
</script>
<style lang="scss" scoped>
.dark {
  .pro-table-bg {
    background: var(--el-color-dark-bg);
    padding: 16px;
  }
}
:deep(.el-table__empty-block) {
  justify-content: flex-start !important;
}
</style>
