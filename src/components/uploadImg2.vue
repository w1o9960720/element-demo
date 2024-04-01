<template>
  <el-upload
    v-model:file-list="uploadFileList"
    class="custom_upload"
    :action="uploadUrl"
    :headers="{
      // ...uploadHeader(),
    }"
    accept="image/jpeg,image/jpg,image/png,"
    :data="uploadData"
    :before-upload="handleBeforeUpload"
    :on-progress="handleUploadProgerss"
    :on-success="handleUploadSuccess"
    :on-remove="handleRemove"
    :on-exceed="handleOnExceed"
    :limit="limit"
    multiple
  >
    <el-button type="primary"> <i class="yun-iconfont icon-upload" />选择文件 </el-button>
    <template #tip>
      <div class="msg">请上传图片，支持格式jpg、jpeg、png，且图片大小不超过10M，限制数量10张</div>
    </template>
    <template #file="{ file }">
      <el-image
        v-if="file.url"
        ref="imageEl"
        :src="file.url"
        :hide-on-click-modal="true"
        :preview-src-list="srcList"
        :initial-index="initialIndex"
        fit="contain"
      />
      <div
        v-else
        class="progress"
      >
        <el-progress
          type="circle"
          :width="96"
          :percentage="file.percentage"
        />
      </div>
      <div class="img-hover">
        <div class="bt">
          <i
            class="el-icon-view"
            @click="handleView(file.url)"
          />
          <i
            class="el-icon-delete"
            @click="handleDelete(file)"
          />
        </div>
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { ref, toRefs, watch, computed } from 'vue';
// import { uploadHeader } from '@/util/auth';
// import { getDownUrl } from '@/util/downloadUrl';
import { ElMessage } from 'element-plus';
// import { YMDHMS } from '@/const/timeFormat';
import moment from 'moment';

const imageEl = ref(null);
const uploadUrl = `${import.meta.env.VITE_PROXY_URL}admin/sys-file/upload`;
const IMAGE_TYPE = ['png', 'jpg', 'jpeg'];
const emit = defineEmits(['update:modelValue']);

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
const { modelValue } = toRefs(props);
const uploadFileList = ref([]);
const initialIndex = ref(null);
watch(
  () => modelValue.value,
  () => {
    uploadFileList.value = modelValue.value;
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  },
);
const uploadData = ref({
  fileExtension: 'png',
});
const srcList = computed(() =>
  uploadFileList.value.filter((item) => item.url).map((item) => item.url),
);
const handleBeforeUpload = (file) => {
  const fileExtension = file.name.split('.').pop();
  const isImg = IMAGE_TYPE.includes(fileExtension);
  const isLt10M = file.size < 10 * 1024 * 1024;
  if (!isImg) {
    ElMessage.error('只支持png、jpg、jpeg格式的文件!');
  } else if (!isLt10M) {
    ElMessage.error('上传图片大小不能超过10M!');
  }
  uploadData.value.fileExtension = fileExtension;
  return isImg && isLt10M;
};
const handleUploadProgerss = (e) => {
  e.percent = Math.floor(e.percent);
};
const handleUploadSuccess = (res, file, files) => {
  const fileList = files
    .filter((item) => {
      if (!('response' in item) || item.response.data) {
        return true;
      }
      ElMessage({
        message: item.response.msg,
        type: 'error',
        duration: 5 * 1000,
      });
      return false;
    })
    .map((item) => {
      let url = getDownUrl(item?.response?.data?.url || item.url);
      const list = {
        ...item,
        name: item.name || item.fileName,
        url,
        time: item.fileTime || moment().format(YMDHMS),
      };
      return list;
    });
  emit('update:modelValue', fileList);
  uploadFileList.value = fileList;
};
const handleView = (url) => {
  initialIndex.value = uploadFileList.value.findIndex((item) => item.url === url);
  if (imageEl.value) {
    imageEl.value.showViewer = true;
  }
};
const handleDelete = (file) => {
  const uploadFiles = uploadFileList.value.filter((item) => item.url !== file.url);
  emit('update:modelValue', uploadFiles);
};
const handleRemove = (uploadFile, uploadFiles) => {
  emit('update:modelValue', uploadFiles);
};

const handleOnExceed = () => {
  ElMessage({
    message: `最多支持${props.limit}个附件。`,
    type: 'warning',
  });
};
</script>
<style lang="scss" scoped>
.custom_upload {
  font-size: 0;
  background: var(--el-border-color-light);
  border: 1px solid #f0f2f5;
  padding: 16px;
  border-radius: 8px;
  :deep(ul.el-upload-list) {
    margin-top: 16px;
    display: grid;
    padding: 12px;
    grid-template-columns: repeat(4, 112px);
    gap: 8px;
    border: 1px dashed #cdd2da;
    background: #ffffff;
    border-radius: 4px;
    &:empty {
      display: none;
    }
    li {
      position: relative;
      font-size: 0;
      margin: 0;
      padding: 8px;
      background: #f0f2f5;
      border-radius: 4px;
      .el-image {
        width: 96px;
        height: 96px;
      }
      .progress {
        width: 100%;
        height: 96px;
        .el-progress {
          position: relative;
          top: 0;
          .el-progress__text {
            position: absolute;
            top: 50%;
          }
        }
      }
      .img-hover {
        display: none;
        position: absolute;
        top: 7px;
        left: 7px;
        width: 96px;
        height: 96px;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.5);
        .bt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          i {
            color: #fff;
            cursor: pointer;
          }
          i:not(:first-of-type) {
            margin-left: 9px;
            padding-left: 9px;
            border-left: 1px solid #d9d9d9;
          }
        }
      }
      &:has(.el-image):hover .img-hover {
        display: block;
      }
    }
  }
  .msg {
    padding-top: 8px;
    font-size: 13px;
    line-height: 22px;
    color: #7e8694;
    vertical-align: bottom;
    i {
      padding-right: 4px;
      vertical-align: bottom;
    }
  }
  .yun-iconfont {
    margin-right: 8px;
  }
}
</style>
