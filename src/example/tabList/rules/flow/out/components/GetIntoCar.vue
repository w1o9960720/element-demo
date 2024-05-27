<template>
  <el-form
    ref="formData"
    :rules="rules"
    :inline="true"
    :model="formData"
  >
    <h4>装车配置：</h4>
    <el-form-item
      label="启用自动装车:"
      prop="ruleCode"
    >
      <el-checkbox
        v-model="formData.autoLoad"
        :true-label="enableShutdownState[0].value"
        :false-label="enableShutdownState[1].value"
        :disabled="pageType === PAGE_TYPE.VIEW"
      >
        启用
      </el-checkbox>
    </el-form-item>
    <h4>任务配置：</h4>
    <TaskAllocation
      :table-data="formData.taskFlows"
      :page-type="pageType"
    />
  </el-form>
</template>

<script>
import { PAGE_TYPE } from '../../constant';
import { enableShutdownState } from './constant';
import TaskAllocation from './TaskAllocation.vue';

export default {
  components: {
    TaskAllocation,
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      PAGE_TYPE,
      rules: {},
      enableShutdownState,
    };
  },
  created() {},
  mounted() {},
};
</script>
