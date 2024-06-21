<template>
  <yun-filter
    v-model="searchQuery"
    :fields="serchFields"
    clearable
    @submit="handleQuery"
    @reset="handleQuery"
  />
  <yun-table
    v-model:pagination="pagination"
    :loading="loading.getTableData"
    :data="tableData"
    :columns="TABLECOLUMN"
    size="default"
    show-table-setting
    :table-header-key="`${$route.path}_index`"
    :height="tableHeight"
    @update:pagination="handlePaginationChange"
  >
    <template #tableHeaderLeft>
      <nh-button
        :track="{
          trackName: '配置管理/码识别规则/[新增]',
        }"
        type="primary"
        @click="$refs.addPageEl.init()"
      >
        <i
          class="yun-iconfont icon-add"
          style="margin-right: 4px"
        />
        新增
      </nh-button>
    </template>
    <template #action="{ row }">
      <nh-button
        type="text"
        @click="$refs.addPageEl.init(row.id)"
      >
        编辑
      </nh-button>
    </template>
  </yun-table>
  <addPage ref="addPageEl" />
</template>
<script>
import loadingMixin from '@/thales/loading';
import ConfigManagement from '@/const/pageNames/configManage';
import { SearchType } from '@/const/form';
import useTableHeight from '@/hooks/useTableHeightResize';
import addPage from './add.vue';
import { ruleBarcode } from './api';
import { TABLECOLUMN, serchFields } from './fileds';

const isExamine = true;
export default {
  name: ConfigManagement.CODE_RULE,
  components: {
    addPage,
  },
  mixins: [loadingMixin],
  data() {
    return {
      serchFields,
      TABLECOLUMN,
      SearchType,
      isExamine,
      tableData: [],
      searchQuery: {},
      loading: {
        getTableData: false,
      },
    };
  },
  mounted() {
    this.getTableData();
  },

  methods: {
    handleQuery() {
      this.pagination.page = 1;
      this.getTableData();
    },
    async getTableData() {
      const pagination = {
        page: this.pagination.page,
        size: this.pagination.size,
      };
      const resp = await ruleBarcode(pagination, this.searchQuery);
      this.tableData = resp.records;
      this.pagination.total = resp.total;
    },
    handlePaginationChange() {
      this.getTableData();
    },
  },
};
</script>
<script setup>
const { tableHeight } = useTableHeight();
</script>
<style lang="scss" scoped>
.batch-field {
  text-indent: 12px;
  padding: 4px 0;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}
</style>
