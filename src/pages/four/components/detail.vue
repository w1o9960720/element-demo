<template>
  <el-dialog
    v-model="visible"
    :title="'详情'"
    :width="700"
    align-center
    append-to-body
    destroy-on-close
  >
    <el-form
      ref="form"
      size="mini"
      :model="formData"
      :rules="rules"
      label-position="left"
    >
      <div class="filterForm">
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="车辆名：" prop="name">{{
              formData.name
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出厂时间：" prop="time">
              {{ formData.time }}</el-form-item
            >
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="级别：" prop="level">
              {{ formData.level }}</el-form-item
            >
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量：" prop="weight"
              >{{ formData.weight }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="颜色：" prop="color">
              {{ formData.color }}</el-form-item
            >
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格：" prop="price"
              >{{ formData.price }}
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="4">
          <el-col :span="24">
            <el-form-item label="选择图片" prop="file">
              <uploadPicture
                v-model="formData.file"
                :limit="10"
              ></uploadPicture>
            </el-form-item>
          </el-col>
        </el-row> -->
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <!-- <el-button @click="visible = false">取消</el-button> -->
        <el-button type="primary" @click="handleconfim">关闭 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { Dayjs } from "dayjs";
import { reactive, computed, toRefs, watch } from "vue";
import dayjs from "dayjs";
const forma = {
  id: "",
  name: "",
  level: "",
  weight: "",
  price: "",
  color: "",
  time: "",
  // file: [],
};
const formData = reactive({
  ...forma,
});
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
});
const { data } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const initData = () => {
  if (data) {
    Object.assign(formData, data.value);
  }
};
const handleconfim = () => {
  visible.value = false;
};
watch(visible, (val) => {
  if (val) {
    initData();
  }
});
</script>