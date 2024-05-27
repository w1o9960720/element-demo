<template>
  <flow-list-filter
    :form="form"
    :tab-name="tabName"
    :warehouse-list="warehouseList"
    @fetchData="onSearch"
    @resetData="resetData"
  />
  <table-comfetchData
    :tab-name="tabName"
    :table-data="tableData"
    :warehouse-list="warehouseList"
    :loading="loading.fetchData"
    @create="create"
  />
  <pagination
    ref="shipperPagination"
    :total="total"
    @search="fetchData"
  />
</template>

<script>
import pagination from '@/components/Pagination/index.vue';
import { ruleDeliverFlowSearch } from '@/api/configure/outboundProcess';
import { warehousingProcessSearch } from '@/api/configure/warehousingProcess';
import loadingMixin from '@/thales/loading';
import FlowListFilter from './components/FlowListFilter.vue';
import TableCom from './components/Table.vue';
import { TabNameEng, UPDATETIME_DESC } from './constant';

export default {
  name: 'FlowTable',
  components: {
    pagination,
    FlowListFilter,
    TableCom,
  },
  mixins: [loadingMixin],
  props: {
    tabName: {
      type: String,
      default: '',
    },
    warehouseList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      TabNameEng,
      UPDATETIME_DESC,
      form: {
        warehouseCode: undefined,
        orderType: undefined,
        shipperId: undefined,
      },
      tableData: [],
      loading: {
        fetchData: false,
      },
      total: 0,
      page: 1,
      size: 10,
    };
  },
  methods: {
    // 搜索
    async fetchData(page, size) {
      const {accountInfo: {ext: { warehouseCode, warehouseId },},} = this.$store.state.user;
      const data = {
        ...this.form,
        warehouseCode,
        warehouseId,
      };
      this.page = page || this.page;
      this.size = size || this.size;

      const params = {
        page: this.page,
        size: this.size,
      };
      if (this.tabName === this.TabNameEng.OUTBOUND_PROCESS) {
        this.ruleDeliverFlowSearch(data, params);
      } else {
        this.ruleIntoDeliverFlowSearch(data, params);
      }
    },
    // 出库流程搜索
    async ruleDeliverFlowSearch(data, params) {
      const searchData = await ruleDeliverFlowSearch(data, params);
      this.tableData = searchData.records || [];
      this.total = searchData.total;
    },
    // 入库流程搜索
    async ruleIntoDeliverFlowSearch(data, params) {
      const newParams = { ...params };
      newParams.sort = UPDATETIME_DESC;
      const searchData = await warehousingProcessSearch(data, params);
      this.tableData = searchData.records || [];
      this.total = searchData.total;
    },
    create() {
      if (this.tabName === this.TabNameEng.OUTBOUND_PROCESS) {
        this.$router.push({
          path: '/wms/rules/flow/out',
        });
      } else {
        this.$router.push({
          path: '/wms/rules/flow/in',
        });
      }
    },
    onSearch() {
      this.page = 1;
      this.$refs.shipperPagination.resetPage();
      this.fetchData();
    },
    resetData() {
      this.form = {
        warehouseCode: undefined,
        orderType: undefined,
        shipperId: undefined,
      };
      this.onSearch();
    },
  },
};
</script>
<style lang="scss" scoped></style>
