<template>
  <el-form
    ref="shipperForm"
    class="search-form"
    :inline="true"
    :model="form"
    label-width="100px"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="流程描述：">
          <el-input
            v-model="form.description"
            placeholder="请输入流程描述"
            @keyup.enter="fetchData"
          />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="6">
        <el-form-item label="仓库：">
          <el-select
            v-model="form.warehouseCode"
            filterable
            @change="handleWarehouseChange"
          >
            <el-option
              v-for="(item, index) in f"
              :key="index"
              filterable
              :label="item.warehouseName"
              :value="item.warehouseCode"
            />
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="6">
        <el-form-item label="订单类型：">
          <el-select
            v-model="form.orderType"
            @change="fetchData"
          >
            <el-option
              v-for="item in getOrderType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="货主：">
          <el-select
            v-model="form.shipperId"
            filterable
            remote
            :remote-method="handleWarehouseChange"
            @change="fetchData"
          >
            <el-option
              v-for="item in shipperList"
              :key="item.id"
              :label="item.shipperName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div class="search-btns">
          <div class="form-btns">
            <el-button
              class="form-btn"
              type="primary"
              @click.prevent="fetchData"
            >
              查询
            </el-button>
            <el-button
              class="form-btn"
              @click.prevent="resetData"
            >
              重置
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { searchShipperList } from '@/api/configure/warehousingProcess';
import { IN_ORDER_TYPE, TabNameEng, CARGO_OWNER, OUT_DELIVER_TYPE } from '../constant';

export default {
  name: 'FlowListFilter',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
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
      CARGO_OWNER,
      shipperList: [],
    };
  },
  computed: {
    getOrderType() {
      const orderTypeOptions =
        this.tabName === this.TabNameEng.OUTBOUND_PROCESS ? OUT_DELIVER_TYPE : IN_ORDER_TYPE;
      return orderTypeOptions;
    },
  },
  mounted() {
    this.handleWarehouseChange();
  },
  methods: {
    fetchData() {
      this.$emit('fetchData');
    },
    resetData() {
      this.form.shipperId = undefined;
      this.$emit('resetData');
    },
    // 根据仓库获取货主下拉
    async handleWarehouseChange(query) {
      const res = (await searchShipperList({ shipperName: query })) || [];
      this.shipperList = [{ id: undefined, shipperName: '全部' }, ...res];
      this.form.shipperId = undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: flex-end;
  .moreData {
    font-size: 12px;
    color: #059e84;
    &:hover {
      cursor: pointer;
    }
  }
}
.search-form ::v-deep {
  .el-col {
    .el-form-item {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 100px);
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
