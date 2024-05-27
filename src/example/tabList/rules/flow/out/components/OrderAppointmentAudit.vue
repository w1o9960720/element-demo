<template>
  <el-form
    ref="formData"
    :rules="rules"
    :inline="true"
    :model="formData"
  >
    <!-- <h4>作用范围：</h4>
    <el-row>
      <el-form-item
        label="接收订单审核:"
        prop="status"
      >
        <el-radio-group
          v-model="formData.status"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in enableShutdownState"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row> -->
    <!-- <h4>货品库存预占：</h4>
    <el-row>
      <el-form-item
        label="是否可预占在途库存:"
        prop="useTransportationInventory"
      >
        <el-radio-group
          v-model="formData.useTransportationInventory"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in useTransportationInventory"
            :key="item.value"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row> -->
    <el-row>
      <el-form-item
        label="默认货品质量:"
        prop="goodsQuality"
      >
        <el-radio-group
          v-model="formData.goodsQuality"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in goodsQualityList"
            :key="item.code"
            :label="item.code"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <!-- <h4>订单信息初始化:</h4>
    <el-row>
      <el-form-item
        label="是否自动填充固定路线:"
        prop="autoFillFixLineCode"
      >
        <el-radio-group
          v-model="formData.autoFillFixLineCode"
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
    </el-row> -->
  </el-form>
</template>

<script>
import { enableShutdownState, useTransportationInventory } from './constant';
import { PAGE_TYPE } from '../../constant';

export default {
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    pageType: {
      type: String,
      default: '',
    },
    goodsQualityList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      PAGE_TYPE,
      useTransportationInventory,
      enableShutdownState,
      rules: {
        status: [{ required: true, message: '请选择', trigger: 'change' }],
        useTransportationInventory: [{ required: true, message: '请选择', trigger: 'change' }],
        goodsQuality: [{ required: true, message: '请选择', trigger: 'change' }],
        autoFillFixLineCode: [{ required: true, message: '请选择', trigger: 'change' }],
      },
    };
  },
  methods: {
    validateForm() {
      return this.$refs.formData.validate();
    },
  },
};
</script>
