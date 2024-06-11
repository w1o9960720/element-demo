<template>
  <el-form
    ref="form"
    size="mini"
    :model="formData"
    :rules="rules"
    label-position="left"
  >
    <div class="filterForm">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="菜单名" prop="level">
            <el-input v-model="formData.menuname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车辆" prop="car">
            <el-input @click="handlefocus" v-model="formData.car"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>
<script setup>
import { reactive, ref, computed, watch } from "vue";

const props = defineProps({
  formData: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.formData,
  (v) => {
    emit("update:modelValue", v);
  },
  {
    deep: true,
  }
);
const emit = defineEmits(["update:modelValue"]);
</script>