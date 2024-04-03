<template>
  <el-dialog
    v-model="visible"
    :title="'新增'"
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
            <el-form-item label="车辆名" prop="name">
              <el-input :disabled="isEdit" v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出厂时间" prop="time">
              <el-date-picker
                v-model="formData.time"
                type="datetime"
                placeholder="选择时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="级别" prop="level">
              <el-select
                v-model="formData.level"
                filterable
                disabled
                @change="handleaddress"
              >
                <el-option
                  v-for="(item, index) in levelList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量" prop="weight">
              <el-input
                @click="handlefocus"
                v-model="formData.weight"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="颜色" prop="color">
              <el-input v-model="formData.color"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="price">
              <el-input
                @click="handlefocus"
                v-model="formData.price"
              ></el-input>
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
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleconfim">确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, computed, toRefs, nextTick } from "vue";
import uploadPicture from "../../../components/uploadPicture.vue";
import { levelList } from "../constant";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
const form = ref(null);
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
const rules = reactive({
  name: [{ required: true, message: "请填写货主名", trigger: "blur" }],
  address: [{ required: true, message: "请填写地址", trigger: "blur" }],
  time: [{ required: true, message: "请填写时间", trigger: "blur" }],
  price: [{ required: true, message: "请填", trigger: "blur" }],
  level: [{ required: true, message: "请填", trigger: "blur" }],
  color: [{ required: true, message: "请填写", trigger: "blur" }],
  weight: [{ required: true, message: "请填写", trigger: "blur" }],
  file: [{ required: true, message: "请填写", trigger: "change" }],
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "confirm"]);
const visible = ref(false);
const isEdit = ref(false);

const show = (row) => {
  visible.value = true;
  if (row.id) {
    isEdit.value = true;
    Object.assign(formData, row);
    console.log("formData: ", formData);
  } else {
    isEdit.value = false;
    nextTick(() => {
      form.value?.resetFields?.();
      Object.assign(formData, forma);
      formData.level = row.level;
    });
  }
};

const handleconfim = () => {
  form.value.validate((value) => {
    if (value) {
      const { id, time, ...rest } = formData;
      if (id) {
        ElMessage({
          message: "编辑成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "新增成功",
          type: "success",
        });
      }
      const data = {
        id,
        time: dayjs(time).format("YYYY:MM:HH"),
        ...rest,
      };
      console.log("data: ", data);

      emit("confirm", data);
      visible.value = false;
    } else {
      console.log("value: ", value);
    }
  });
};
defineExpose({
  show,
});
</script>