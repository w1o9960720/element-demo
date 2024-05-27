<template>
  <div class="page-container">
    <el-tabs
      v-model="tabIndex"
      @tab-click="ruleTypeChanged"
    >
      <el-tab-pane
        v-for="item in TabNameList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <flow-table
          ref="flowTable"
          :warehouse-list="warehouseList"
          :tab-name="tabIndex"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getWarehouseList } from '@/api/wms/warehouse';
import FlowTable from './flowTable.vue';
import { TabNameList } from './constant';

export default {
  name: 'RulesFlow',
  components: {
    FlowTable,
  },
  data() {
    return {
      TabNameList,
      tabIndex: TabNameList[0].name,
      warehouseList: [],
      page: 1,
      size: 999,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    const currentTabIndex = TabNameList.findIndex((item) => item.name === this.tabIndex);
    this.$refs.flowTable[currentTabIndex].fetchData();
  },
  methods: {
    // 初始化获取数据
    async init() {
      // 获取仓库下拉列表
      const data = {
        page: this.page,
        size: this.size,
      };
      const dataList = await getWarehouseList({}, data);
      this.warehouseList = [
        { warehouseName: '全部', warehouseCode: undefined },
        ...dataList.records,
      ];
    },
    ruleTypeChanged(event) {
      this.$nextTick(() => {
        this.$refs.flowTable[event.index].fetchData();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  padding: 0 24px;
  :deep(.el-pagination) {
    justify-content: flex-end;
  }
}
</style>
