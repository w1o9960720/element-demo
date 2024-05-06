<template>
  <div>
    <!-- 导入对话框 -->
    <el-dialog
      v-model="upload.open"
      :title="title"
      width="400px"
      append-to-body
    >
      <div class="el-upload-container">
        <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="headers"
          :action="url"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :on-error="handleFileError"
          :auto-upload="false"
          drag
        >
          <i class="yun-iconfont icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div> 
          <template #tip>
            <div class="el-upload__tip text-center">
              <span>仅允许导入xls、xlsx格式文件。</span>
              <el-link
                v-if="tempUrl"
                type="primary"
                :underline="false"
                style="font-size: 12px; vertical-align: baseline"
                @click="downExcelTemp"
              >
                下载模板
              </el-link>
            </div>
          </template>
        </el-upload>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="primary"
            @click="submitFileForm"
          >
            确 定
          </el-button>
          <el-button @click="upload.open = false"> 取 消 </el-button>
        </div>
      </template>
    </el-dialog>

    <!--校验失败错误数据-->
    <el-dialog
      v-model="errorVisible"
      title="校验失败数据"
    >
      <el-table :data="errorData">
        <el-table-column
          property="lineNum"
          label="行号"
          width="50"
        />
        <el-table-column
          property="errors"
          label="错误描述"
          show-overflow-tooltip
        >
          <template #default="scope">
            <el-tag
              v-for="error in scope.row.errors"
              :key="error"
              type="danger"
            >
              {{ error }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store';
import { downBlobFile } from '@/util';
import { ElMessage } from 'element-plus';

export default {
  name: 'ExcelUpload',
  components: {},
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    tempUrl: {
      type: String,
      default: '',
    },
  },
  emits: ['refreshDataList'],
  data() {
    return {
      upload: {
        open: false,
        isUploading: false,
      },
      errorVisible: false,
      errorData: [],
    };
  },
  computed: {
    headers() {
      const { tenantId } = store.getters.userInfo;
      return {
        Authorization: `Bearer ${store.getters.access_token}`,
        'TENANT-ID': tenantId || '1',
      };
    },
  },
  methods: {
    downExcelTemp() {
      downBlobFile(this.tempUrl, {}, 'temp.xlsx');
    },
    handleFileUploadProgress() {
      this.upload.isUploading = true;
    },
    handleFileError() {
      ElMessage.error('上传失败,数据格式不合法!');
      this.upload.open = false;
    },
    handleFileSuccess(response) {
      this.upload.isUploading = false;
      this.upload.open = false;
      this.$refs.upload.clearFiles();

      // 校验失败
      if (response.code === 1) {
        ElMessage.error('导入失败，以下数据不合法');
        this.errorVisible = true;
        this.errorData = response.data;
        this.$refs.upload.clearFiles();
      } else {
        ElMessage.success(response.msg ? response.msg : '导入成功');
        // 刷新表格
        this.$emit('refreshDataList');
      }
    },
    submitFileForm() {
      this.$refs.upload.submit();
    },
    show() {
      this.upload.isUploading = false;
      this.upload.open = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-upload-container {
  :deep(.el-upload-dragger) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
