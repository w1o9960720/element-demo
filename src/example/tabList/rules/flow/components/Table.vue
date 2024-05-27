<template>
  <div style="margin-top: 1em">
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
        label="序号"
        fixed
        width="60"
      />
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :width="item.width"
        show-overflow-tooltip
      >
        <template v-slot:default="scope">
          <span>{{ showRowDetail(item, scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        style="position: relative"
        label="操作"
        align="center"
        fixed="right"
        width="150"
      >
        <template v-slot:default="scope">
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
            @click="handleEdit(scope.row, 1)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row, 2)"
          >
            复制
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { returnDictionaryCN } from '@/util/Dictionary';
import formatTime from '@/util/formatTime';
import { TabNameEng, RuleDetailPath, PAGE_TYPE } from '../constant';

export default {
  name: 'FlowPaneTable',
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
    warehouseList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      TabNameEng,
      RuleDetailPath,
      PAGE_TYPE,
      tableHeader: [
        {
          label: '流程描述',
          prop: 'description',
          width: 220,
        },
        {
          label: '订单类型',
          prop: 'orderType',
          width: 100,
          formatter: (row) => {
            let desc = '';
            if (row.orderTypeDesc) {
              desc = row.orderTypeDesc;
            } else {
              desc = returnDictionaryCN(
                row.orderType,
                this.$store.state.dictionary.dictionaryCodeEN.DELIVER_ORDER_TYPE_CODE,
              ); 
            }
            return desc;
          },
        },
        {
          label: '货主',
          prop: 'shippers',
          minWidth: 120,
          formatter: (row) => this.formatCustomers(row.shippers),
        },
        {
          label: '仓库',
          prop: 'warehouseName',
          width: 100,
        },
        {
          label: '创建人',
          prop: 'createUserName',
          width: 100,
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 160,
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
          width: 160,
          formatter: (row) => formatTime(row.updateTime),
        },
      ],
    };
  },
  methods: {
    showRowDetail(item, row) {
      const { formatter, prop } = item;
      return formatter ? formatter(row) : row?.[prop];
    },
    // 查看
    handleDetail(row) {
      const url = this.RuleDetailPath[this.tabName];
      this.$router.push({
        path: url,
        query: {
          id: row.id,
          type: PAGE_TYPE.VIEW,
        },
      });
    },
    formatCustomers(shippers) {
      let shippersName = [];
      if (shippers && shippers.infos) {
        shippersName = shippers.infos.map((item) => item.shipperName);
      }
      return shippersName.join('、');
    },
    //  编辑 预留入库流程
    handleEdit(row, num) {
      const url = this.RuleDetailPath[this.tabName];
      this.$router.push({
        path: url,
        query: {
          id: row.id,
          type: PAGE_TYPE.EDIT,
          num,
        },
      });
    },
    create() {
      this.$emit('create');
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-box {
  // text-align: right;
  margin-bottom: 1em;
}
</style>
