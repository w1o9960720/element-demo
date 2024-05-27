<template>
  <div>
    <div class="btn-box">
      <el-button
        class="form-btn"
        type="primary"
        @click.prevent="create"
      >
        新增
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
    >
      <el-table-column
        type="index"
        label="#"
        fixed
        width="50"
      />

      <el-table-column
        v-for="(item, index) in tableHeads"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :width="item.width"
        show-overflow-tooltip
      >
        <template v-slot:default="scope">
          <span v-text="item.formatter ? item.formatter(scope.row) : scope.row[item.prop]" />
        </template>
      </el-table-column>
      <el-table-column
        style="position: relative"
        label="操作"
        align="center"
        fixed="right"
        width="200"
      >
        <template v-slot:default="scope">
          <el-button
            v-if="tabName === TabNameEng.REPLENISHMENT_RULES"
            type="text"
            size="small"
            @click="handleExecute(scope.row)"
          >
            执行
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDetail(scope.row)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteRule(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  replenishmentRulesDelete,
  replenishmentExecute,
} from '@/api/configure/configureReplenishmentRule';
import { distributionRulesDelete } from '@/api/configure/configureDistributionRule';
import { ruleUpperDelete } from '@/api/configure/configureRuleUpper';
import formatTime from '@/util/formatTime';
import { RuleDetailPath, Automatic, PAGE_TYPE, TabNameEng } from '../constant';

export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tabName: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      TabNameEng,
      RuleDetailPath,
      Automatic,
      PAGE_TYPE,
      RulesHeader: [
        {
          label: '规则编码',
          prop: 'ruleCode',
          minWidth: 120,
        },
        {
          label: '规则描述',
          prop: 'description',
          minWidth: 180,
        },
      ],
      otherFileds: [
        {
          label: '仓库',
          prop: 'warehouseName',
          minWidth: 140,
        },
        {
          label: '货主',
          prop: 'shippers',
          minWidth: 160,
          formatter: (row) => this.formatCustomers(row.shippers),
        },
      ],
      InitiUserTimeHeader: [
        {
          label: '创建人',
          prop: 'createUserName',
          width: 100,
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 180,
          formatter: (row) => formatTime(row.createTime),
        },
        {
          label: '编辑人',
          prop: 'updateUserName',
          width: 100,
        },
        {
          label: '编辑时间',
          prop: 'updateTime',
          width: 180,
          formatter: (row) => formatTime(row.updateTime),
        },
      ],
      DistributionRulesHeader: [
        {
          label: '仓库',
          prop: 'warehouseName',
          minWidth: 140,
        },
      ],
    };
  },
  computed: {
    tableHeads() {
      if (this.tabName === this.TabNameEng.DISTRIBUTION_RULES) {
        return [...this.RulesHeader, ...this.DistributionRulesHeader, ...this.InitiUserTimeHeader];
      }
      if (this.tabName === this.TabNameEng.REPLENISHMENT_RULES) {
        return [...this.RulesHeader, ...this.otherFileds, ...this.InitiUserTimeHeader];
      }
      if (this.tabName === this.TabNameEng.LISTING_RULES) {
        return [...this.RulesHeader, ...this.DistributionRulesHeader, ...this.InitiUserTimeHeader];
      }
      return [];
    },
  },
  methods: {
    formatCustomers(shippers) {
      let shippersName = [];
      if (shippers && shippers.infos) {
        shippersName = shippers.infos.map((item) => item.shipperName);
      }
      return shippersName.join('、');
    },
    // 删除规则
    async deleteRule(row) {
      await this.$confirm(`是否确认删除规则:${row.description}`, '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      if (this.tabName === this.TabNameEng.DISTRIBUTION_RULES) {
        this.distributionRulesDelete(row);
      } else if (this.tabName === this.TabNameEng.REPLENISHMENT_RULES) {
        this.replenishmentRulesDelete(row);
      } else {
        this.listingDelete(row);
      }
    },
    // 分配规则删除
    async distributionRulesDelete(row) {
      await distributionRulesDelete({ id: row.id });
      this.$emit('fetchData');
      this.$message.success(`规则:${row.description}删除成功！`);
    },
    // 补货规则删除
    async replenishmentRulesDelete(row) {
      await replenishmentRulesDelete({ id: row.id });
      this.$emit('fetchData');
      this.$message.success(`规则:${row.description}删除成功！`);
    },
    // 执行日常补货任务
    async handleExecute(row) {
      const data = {
        ruleReplenishmentId: row.id,
        warehouseCode: row.warehouseCode,
      };
      await replenishmentExecute(data);
      this.$emit('fetchData');
      this.$message({ type: 'success', message: `规则:${row.description}执行成功` });
    },
    // TODO:上架规则删除
    async listingDelete(row) {
      await ruleUpperDelete({ id: row.id });
      this.$emit('fetchData');
      this.$message.success(`规则:${row.description}删除成功！`);
    },
    // 查看规则
    handleDetail(row) {
      const url = this.RuleDetailPath[this.tabName];
      const routeUrl = this.$router.push({
        path: url,
        query: {
          id: row.id,
          type: PAGE_TYPE.VIEW,
        },
      });
    },
    create() {
      this.$emit('create');
    },
    //  编辑规则 预留分配规则和上架规则
    handleEdit(row) {
      const url = this.RuleDetailPath[this.tabName];
      const routeUrl = this.$router.push({
        path: url,
        query: {
          id: row.id,
          type: PAGE_TYPE.EDIT,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-box {
  text-align: left;
  margin: 1em 0;
}
</style>
