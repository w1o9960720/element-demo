<template>
  <div>
    <nh-dialog
      v-model="visibale"
      :before-close="handleClose"
      destroy-on-close
      :title="title"
      size="1111px"
      :track="{
        name_zh: '在库管理/货权转移/上传单据',
        trackName: $route.path,
      }"
    >
      <el-alert
        v-if="temperatureUpload"
        title="仓库温度提交成功后，将自动推送给银行"
        type="success"
        effect="dark"
        :closable="false"
        style="margin-bottom: 20px; background: #e6f7ff; color: #747d81; border: 1px solid #a3dcff"
      />
      <el-input
        v-if="temperatureUpload"
        v-model="temperature"
        placeholder="请输入温度"
        style="width: 200px"
      />
      <div style="display: flex">
        <div
          v-if="!temperatureUpload"
          class="barBox"
        >
          <div class="iconBar">1</div>
          <div class="lineBar" />
          <div class="iconBar">2</div>
        </div>
        <div style="flex: 1">
          <div v-if="!temperatureUpload">下载原始文件</div>
          <el-button
            v-if="!temperatureUpload"
            size="small"
            type="primary"
            style="margin: 10px 0"
            @click="onLoad"
          >
            下载
          </el-button>
          <div
            v-if="!temperatureUpload"
            style="margin-top: 40px"
          >
            上传盖章文件
          </div>
          <el-upload
            :headers="headers"
            action=""
            :before-remove="beforeRemove"
            :on-remove="onRemove"
            :http-request="handleBeforeUpload"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button
              v-if="!temperatureUpload"
              size="small"
              type="primary"
              style="margin: 10px 0"
              :loading="upLoading"
            >
              上传
            </el-button>
          </el-upload>
        </div>
      </div>

      <template #footer>
        <div class="footer">
          <div style="flex: 1; text-align: left">
            <div v-if="!temperatureUpload">注：点击【提交】后，信息将自动推送给银行</div>
          </div>
          <div style="width: 170px">
            <nh-button @click="visibale = false"> 取消 </nh-button>
            <nh-button
              type="primary"
              :loading="loading"
              :disabled="issubMit && !temperatureUpload"
              @click="handelSure"
            >
              提交
            </nh-button>
          </div>
        </div>
      </template>
    </nh-dialog>
  </div>
</template>

<script>
import { getToken } from '@/util/auth';
import { getDownUrl } from '@/util/downloadUrl';
import { saveFiled, savetemperature } from '../api';

export default {
  data() {
    return {
      visibale: false,
      file: {
        percentage: 0,
      },
      businessLicenseUrl: null,
      dialogVisible: false,
      fileList: [],
      lineId: '',
      fileName: '',
      loading: false,
      upLoading: false,
      temperatureUpload: false,
      title: '温度上传',
      documentType: '',
      innerOrderId: '',
      temperature: '',
      issubMit: true,
    };
  },
  methods: {
    init(id, num, type, innerOrderId) {
      this.visibale = true;
      this.temperatureUpload = !id;
      this.lineId = id || '';
      this.businessLicenseUrl = '';
      this.temperature = '';
      this.documentType = type;
      this.issubMit = true;
      this.innerOrderId = innerOrderId;
      switch (num) {
        case 1:
          this.title = '温度上传';
          break;
        case 2:
          this.title = '上传盖章文件';
          break;
        default:
          break;
      }
    },
    handleClose() {
      this.visibale = false;
    },
    handleUpload() {
      this.file.percentage = 0;
      this.$refs.inputFile.click();
    },
    // 上传
    handleBeforeUpload(e) {
      this.uploadFile(e.file);
      // if (!e.file.type.includes('pdf')) {
      //   this.$message.error('只支持pdf格式的文件!');
      //   this.fileList = [];
      // } else {
      //   this.uploadFile(e.file);
      // }
    },
    async uploadFile(file) {
      this.fileName = file.name;
      this.upLoading = true;
      const resp = await this.uploadHttp(file);
      if (resp.code === '2000000000') {
        let url = getDownUrl(resp?.data?.url);
        this.businessLicenseUrl = url;
        this.$message.success('上传成功!');
        this.issubMit = false;
        this.upLoading = false;
      } else {
        this.$message.error(resp.msg);
        this.upLoading = false;
      }
    },
    // 上传请求
    uploadHttp(file) {
      return new Promise((resolve) => {
        const fromData = new FormData();
        const fileExtension = file.name.split('.').pop();
        fromData.append('file', file);
        fromData.append('fileExtension', fileExtension);
        const http = new XMLHttpRequest();
        http.responseType = 'json';
        http.open('POST', `${import.meta.env.VITE_PROXY_URL}admin/sys-file/upload`);
        http.setRequestHeader('Authorization', getToken());
        http.onreadystatechange = () => {
          if (http.status === 200 && http.readyState === 4) {
            resolve(http.response);
          }
        };
        http.send(fromData);
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`,
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onRemove() {
      this.businessLicenseUrl = '';
      this.issubMit = true;
    },
    async handelSure() {
      if (!this.businessLicenseUrl && !this.temperatureUpload) {
        this.$message.error('请先上传文件');
      } else if (this.temperatureUpload && !this.temperature) {
        this.$message.error('请输入温度');
      } else {
        this.loading = true;
        try {
          if (this.temperatureUpload) {
            await savetemperature({
              warehouseId: this.$store.state.user.accountInfo.warehouseId,
              temperature: Number(this.temperature),
            });
          } else {
            await saveFiled({
              id: this.lineId,
              fileUrl: this.businessLicenseUrl,
              fileName: this.fileName,
            });
          }
          this.loading = false;
          this.$message.success('上传提交成功!');
          this.visibale = false;
          this.$parent.handleQueryFrom();
        } catch {
          this.loading = false;
        }
      }
    },
    onLoad() {
      if (this.documentType === 'HQZY') {
        const routeUrl = this.$router.resolve({
          path: '/wms/print/storage-list',
          query: { ids: this.innerOrderId },
        });
        window.open(routeUrl.href, '_blank');
      } else {
        const routeUrl = this.$router.resolve({
          path: '/wms/printint/solutionPrinting',
          query: { id: this.lineId },
        });
        window.open(routeUrl.href, '_blank');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.barBox {
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.iconBar {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 2px solid #a3dcff;
  text-align: center;
  line-height: 30px;
  border-radius: 100%;
  color: #a3dcff;
  margin: 0 auto;
}

.lineBar {
  height: 50px;
  width: 1px;
  background: #a3dcff;
  margin: 0 auto;
}

.footer {
  display: flex;
  justify-content: space-between;
}
</style>
