<template>
  <el-form
    ref="formData"
    :rules="rules"
    :inline="true"
    :model="formData"
  >
    <h4>波次设置：</h4>
    <el-row>
      <el-form-item
        label="波次分组方式:"
        prop="waveGroupType"
      >
        <el-checkbox-group
          v-model="formData.waveGroupType"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-checkbox
            v-for="item in waveGroupType"
            :key="item.label + item.value"
            :label="item.value"
            :disabled="item.value === 'SHIPPER'"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="是否验证允出期:"
        prop="validatorDueOutDay"
      >
        <el-radio-group
          v-model="formData.validatorDueOutDay"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in useTransportationInventory"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="分配批次到订单:"
        prop="stockSplitToOrderNode"
      >
        <el-radio-group
          v-model="formData.stockSplitToOrderNode"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in BatchOrders"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="是否分配集货位:"
        prop="useGatherGoodsPlace"
      >
        <el-radio-group
          v-model="formData.useGatherGoodsPlace"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in useGatherGoodsPlace"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row v-if="formData.useGatherGoodsPlace === useGatherGoodsPlace[0].value">
      <el-form-item
        label="同一集货位分配间隔时间（h）:"
        prop="intervalTimeGatherGoodsPlace"
      >
        <div class="task-storehouse-max">
          <el-input
            v-model.number="formData.intervalTimeGatherGoodsPlace"
            class="task-input"
            :disabled="pageType === PAGE_TYPE.VIEW"
            placeholder="请输入正整数"
            @input="handleFloorsNumberInput($event, 'intervalTimeGatherGoodsPlace')"
          />
        </div>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import { limitInput } from '@/util/number';
import {
  enableShutdownState,
  waveGroupType,
  BatchOrders,
  useTransportationInventory,
  useGatherGoodsPlace,
} from './constant';
import { PAGE_TYPE } from '../../constant';

export default {
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    pageType: {
      type: String,
      default: '',
    },
    warehouseCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      PAGE_TYPE,
      enableShutdownState,
      useGatherGoodsPlace,
      waveGroupType,
      BatchOrders,
      useTransportationInventory,
      rules: {
        status: [{ required: true, message: '请选择', trigger: 'change' }],
        useGatherGoodsPlace: [{ required: true, message: '请选择', trigger: 'change' }],
        intervalTimeGatherGoodsPlace: [{ required: true, message: '请输入', trigger: 'blur' }],
        validatorDueOutDay: [{ required: true, message: '请选择', trigger: 'change' }],
        stockSplitToOrderNode: [{ required: true, message: '请选择', trigger: 'change' }],
        waveGroupType: [{ required: true, message: '请选择', trigger: 'change' }],
      },
    };
  },
  watch: {
    'formData.useGatherGoodsPlace': {
      handler(value) {
        if (!value) {
          this.formData.intervalTimeGatherGoodsPlace = '';
        }
      },
      deep: true,
    },
  },
  methods: {
    // 只能输入正整数
    handleFloorsNumberInput(value, key) {
      this.formData[key] = limitInput(value, 0, true);
    },
    validateForm() {
      return this.$refs.formData.validate();
    },
  },
};
</script>
<style scoped lang="scss">
.task-storehouse-max {
  display: flex;
  .task-input {
    margin-right: 20px;
  }
}
.color-red {
  color: #f56c6c;
}
</style>
