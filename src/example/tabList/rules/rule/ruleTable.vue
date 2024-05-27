<template>
  <rules-list-filter
    :form="form"
    :tab-name="tabName"
    :warehouse-list="warehouseList"
    @fetchData="onSearch"
    @resetData="resetData"
    @create="create"
  />
  <table-com
    :tab-name="tabName"
    :table-data="tableData"
    :loading="loading.fetchData"
    @fetchData="fetchData"
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
import { replenishmentRulesSearch } from '@/api/configure/configureReplenishmentRule';
import { distributionRulesSearch } from '@/api/configure/configureDistributionRule';
import { ruleUpperPage } from '@/api/configure/configureRuleUpper';
import loadingMixin from '@/thales/loading';
import RulesListFilter from './components/RulesListFilter.vue';
import TableCom from './components/Table.vue';
import { RuleDetailPath, TabNameEng } from './constant';

export default {
  name: 'RuleTable',
  components: {
    pagination,
    RulesListFilter,
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
      RuleDetailPath,
      form: {
        warehouseCode: '',
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
    // 预留搜索
    async fetchData(page, size) {
      const {
        accountInfo: {
          ext: { warehouseCode },
        },
      } = this.$store.state.user;
      const data = {
        ...this.form,
        warehouseCode,
      };
      this.page = page || this.page;
      this.size = size || this.size;

      const params = {
        page: this.page,
        size: this.size,
      };
      if (this.tabName === this.TabNameEng.DISTRIBUTION_RULES) {
        await this.distributionRulesSearch(data, params);
      } else if (this.tabName === this.TabNameEng.REPLENISHMENT_RULES) {
        await this.replenishmentRulesSearch(data, params);
      } else {
        await this.listingSearch(data, params);
      }
    },
    // 补货规则搜索
    async replenishmentRulesSearch(data, params) {
      const res = await replenishmentRulesSearch(data, params);
      this.tableData = res.records || [];
      this.total = res.total;
    },
    // 分配规则搜索
    async distributionRulesSearch(data, params) {
      const res = await distributionRulesSearch(data, params);
      this.tableData = res.records || [];
      this.total = res.total;
    },
    // 上架规则搜索
    async listingSearch(data, params) {
      const res = await ruleUpperPage(data, params);
      this.tableData = res.records || [];
      this.total = res.total;
    },
    // 新增规则 预留分配规则和上架规则
    create() {
      const url = this.RuleDetailPath[this.tabName];
      this.$router.push({
        path: url,
      });
    },
    onSearch() {
      this.page = 1;
      this.$refs.shipperPagination.resetPage();
      this.fetchData();
    },
    resetData() {
      this.form = {
        warehouseCode: '',
        shipperId: undefined,
      };
      this.onSearch();
    },
  },
};
</script>
