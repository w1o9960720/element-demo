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
            <el-form-item label="菜单名" prop="label">
              <el-input v-model="formData.label"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路径" prop="path">
              <el-input v-model="formData.path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="12">
            <el-form-item label="上级菜单" prop="topMenu">
              <el-select
                v-model="formData.topMenu"
                filterable
                @change="handleaddress"
                placeholder="请选择"
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
            <el-form-item label="icon图标" prop="icon">
              <el-input v-model="formData.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="role">
              <el-input v-model="formData.role"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
import { reactive, ref, computed, toRefs, watch, nextTick } from "vue";
import uploadPicture from "../../../components/uploadPicture.vue";
import { levelList } from "../constant";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
const form = ref(null);
const forma = {
  id: "",
  label: "",
  topMenu: "",
  path: "",
  icon: "",
  role: "",
};
const formData = reactive({
  ...forma,
});
const rules = reactive({
  label: [{ required: true, message: "请填写菜单名", trigger: "blur" }],
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
  if (row) {
    isEdit.value = true;
    Object.assign(formData, row);
  } else {
    isEdit.value = false;
    nextTick(() => {
      form.value?.resetFields?.();
      Object.assign(formData, forma);
    });
  }
};

const handleconfim = () => {
  form.value.validate((value) => {
    if (value) {
      const { id, ...rest } = formData;
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