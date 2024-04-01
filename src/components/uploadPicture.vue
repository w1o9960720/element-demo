<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :limit="limit"
    v-model:file-list="uploadFileList"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script  setup>
import { ref, toRefs, watch } from "vue";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [];
    },
  },
  limit: {
    type: Number,
    default: undefined,
  },
});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const uploadFileList = ref(false);

const disabled = ref(false);
const { modelValue } = toRefs(props);
watch(
  () => modelValue.value,
  () => {
    uploadFileList.value = modelValue.value;
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);
const handleRemove = (file) => {
  console.log(file);
  emit("update:modelValue", file);
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
</script>