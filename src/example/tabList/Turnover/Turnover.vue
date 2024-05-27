<template>
  <el-radio-group v-model="radioVal">
    <el-radio-button
      v-for="item in pageRadio"
      :key="item.value"
      :label="item.value"
    >
      {{ item.label }}
    </el-radio-button>
  </el-radio-group>
  <component :is="componentName" />
</template>
<script>
import { ref, computed } from 'vue';
import Report from '@/const/pageNames/report';
import { Dict, pageRadio } from './constant';
import components from './config';

export default {
  name: Report.TURNOVER,
};
</script>
<script setup>
const radioVal = ref(Dict.Summarize);
const componentName = computed(() => components[radioVal.value]);
</script>
<style lang="scss" scoped>
.el-radio-group {
  width: fit-content;
  margin: 16px 0 0 26px;
  padding: 2px;
  border-radius: 4px;
  gap: 4px;
  background-color: var(--el-border-color-lighter);

  & > .el-radio-button {
    :deep(.el-radio-button__inner) {
      background-color: transparent;
      border: 0;
      border-radius: 3px;
      box-shadow: none;
    }
    :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
      color: var(--el-radio-button-checked-text-color);
      background-color: var(--el-radio-button-checked-bg-color);
      box-shadow: none;
    }
  }
}
</style>
