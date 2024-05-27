<template>
  <el-form
    ref="shipperForm"
    class="search-form"
    :inline="true"
    :model="form"
    label-width="100px"
  >
    <el-row
      type="flex"
      justify="space-between"
    >
      <el-col :span="6">
        <el-form-item label="规则编码：">
          <el-input
            v-model="form.ruleCode"
            placeholder="请输入规则编码"
            @keyup.enter="fetchData"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="规则描述：">
          <el-input
            v-model="form.description"
            placeholder="请输入规则描述"
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
              v-for="(item, index) in warehouseList"
              :key="index"
              :label="item.warehouseName"
              :value="item.warehouseCode"
            />
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col
        v-if="tabName === TabNameEng.REPLENISHMENT_RULES"
        :span="6"
      >
        <el-form-item label="货主：">
          <el-select
            v-model="form.shipperId"
            filterable
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
      <el-col
        v-if="tabName !== TabNameEng.REPLENISHMENT_RULES"
        :span="6"
      >
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
    <el-row v-if="tabName === TabNameEng.REPLENISHMENT_RULES">
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
import { TabNameEng } from '../constant';

export default {
  name: 'RulesListFilter',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    warehouseList: {
      type: Array,
      default: () => [],
    },
    tabName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      TabNameEng,
      shipperList: [{ id: undefined, shipperName: '全部' }],
    };
  },
  methods: {
    fetchData() {
      this.$emit('fetchData');
    },
    resetData() {
      this.shipperList = [{ id: undefined, shipperName: '全部' }];
      this.$emit('resetData');
    },
    // 根据仓库获取货主下拉
    async handleWarehouseChange(code) {
      if (code) {
        const data = {
          warehouseCode: code,
        };
        const res = (await searchShipperList(data)) || [];
        this.shipperList = [{ id: undefined, shipperName: '全部' }, ...res];
        this.form.shipperId = undefined;
      } else {
        this.shipperList = [{ id: undefined, shipperName: '全部' }];
        this.form.shipperId = undefined;
      }
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-btns {
  width: 100%;
  display: flex;
  align-items: center;
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
