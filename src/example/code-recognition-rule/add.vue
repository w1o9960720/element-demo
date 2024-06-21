<template>
  <nh-drawer
    v-model="drawerVisible"
    v-loading="loading.init"
    :before-close="handleClose"
    :track="{
      name_zh: `配置管理/码识别规则/抽屉-${isEdit ? '编辑' : '新增'}`,
      trackName: $route.path,
    }"
    destroy-on-close
    title="基础信息"
    size="1111px"
    :rules="rules"
  >
    <el-form
      ref="enterpriseForm"
      class="owner-shipper-create"
      :model="formData"
      label-suffix="："
      :rules="rules"
      label-position="left"
    >
      <nh-drawer-container title="基础数据">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="码规则编码"
              prop="ruleCode"
            >
              <el-input
                v-model="formData.ruleCode"
                :disabled="!isEdit"
                maxlength="30"
                placeholder="请输入码识别规则编码"
                style="width: 220px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="码规则名称"
              prop="ruleName"
            >
              <el-input
                v-model="formData.ruleName"
                :disabled="!isEdit"
                maxlength="30"
                placeholder="请输入码规则名称"
                style="width: 220px"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="码类型"
              prop="barcodeType"
            >
              <el-select
                v-model="formData.barcodeType"
                placeholder="请选择"
                style="width: 220px; margin-right: 20px"
              >
                <el-option
                  v-for="item in codeType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-checkbox
                v-if="formData.barcodeType === 'PALLET'"
                v-model="formData.asContainer"
              >
                作为容器码
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="码位数"
              prop="barcodeLength"
            >
              <el-input
                v-model="formData.barcodeLength"
                maxlength="30"
                placeholder="请填写码位数"
                style="width: 220px"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="码识别符"
          prop="barcodeSign"
        >
          <el-input
            v-model="formData.barcode"
            style="width: 220px; margin-right: 20px"
          />
          <el-button
            type="text"
            style="margin-right: 20px"
            @click="addTag"
          >
            + 添加
          </el-button>
          <el-tag
            v-for="tag in formData.barcodeSign"
            :key="tag"
            closable
            style="margin-right: 10px"
            @close="handleCloseTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item
          label="关联货主"
          prop="shippers"
        >
          <span>已选择{{ formData.shippers.length }}个货主</span>&emsp;&emsp;
          <span
            style="color: #07cc6d; cursor: pointer"
            @click="$refs.selectOwner.init(formData.shippers, false)"
            >编辑</span
          >
        </el-form-item>
        <el-form-item
          label="码图片"
          prop="pictures"
        >
          <div class="files">
            <div
              :class="[
                'midea-box',
                !formData.pictures.join(',') && !loading.uploadFile
                  ? 'el-upload el-upload--picture-card'
                  : 'el-upload-list--picture-card',
              ]"
              @click="
                () => {
                  if (!formData.pictures.join(',')) {
                    handleUpload();
                  }
                }
              "
            >
              <div
                v-if="loading.uploadFile"
                class="el-upload-list__item is-ready"
              >
                <el-progress
                  type="circle"
                  :percentage="file.percentage"
                  :width="60"
                />
              </div>

              <template v-else-if="!formData.pictures.join(',')">
                <i class="el-icon-plus" />
              </template>
              <template v-else>
                <div class="el-upload-list__item is-ready">
                  <img
                    :src="formData.pictures.join(',')"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview"
                    >
                      <i class="el-icon-zoom-in" />
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleUpload"
                    >
                      <i class="el-icon-upload" />
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click.stop="handleRemove"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
              </template>
            </div>
          </div>
          <input
            ref="inputFile"
            class="file-input"
            type="file"
            name="file"
            accept=".png, .jpg"
            @change="beforeAvatarUpload"
          />
          <span class="describe">支持jpg、png，最大不超过500kb</span>
        </el-form-item>
      </nh-drawer-container>
      <el-dialog v-model="dialogVisible">
        <img
          class="dialog-img"
          :src="formData.pictures.join(',')"
          alt=""
        />
      </el-dialog>
      <nh-drawer-container title="码读取规则">
        <el-button
          type="primary"
          size="mini"
          style="margin: 10px 0"
          @click="addRow"
        >
          新增字段
        </el-button>
        <el-table
          :data="formData.details"
          border
          class="tableBox"
        >
          <el-table-column
            type="index"
            width="70"
            label="序号"
          />
          <el-table-column
            prop="fromIndex"
            label="读取位置"
            cell-class-name="tableCell"
          >
            <template #default="scope">
              <template v-if="isEdit">
                <div>
                  从&nbsp;
                  <el-form-item
                    :prop="`details[${scope.$index}].fromIndex`"
                    :rules="[{ required: true, message: '请填写正整数', trigger: 'blur' }]"
                    style="display: inline-block"
                  >
                    <el-input
                      v-model="scope.row.fromIndex"
                      style="width: 120px"
                      placeholder="请填写正整数"
                      oninput="value=value.replace(/\D/g,'')"
                      @blur="changeIpt(1, scope.row)"
                    />
                  </el-form-item>
                  位&emsp;-&emsp;
                  <el-form-item
                    :prop="`details[${scope.$index}].toIndex`"
                    :rules="[{ required: true, message: '请填写正整数', trigger: 'blur' }]"
                    style="display: inline-block"
                  >
                    <el-input
                      v-if="isEdit"
                      v-model="scope.row.toIndex"
                      style="width: 120px"
                      placeholder="请填写正整数"
                      oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
                      @blur="changeIpt(2, scope.row)"
                    />
                  </el-form-item>

                  位&emsp;共&emsp;{{
                    scope.row.fromIndex && scope.row.toIndex
                      ? Number(scope.row.toIndex) - Number(scope.row.fromIndex)
                      : ''
                  }}&emsp;位
                </div>
              </template>
              <span v-else
                >从&emsp;{{ scope.row.fromIndex }}位&emsp;-{{ scope.row.toIndex }}位&emsp;
                共&emsp;5&emsp;位</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="correlationField"
            label="关联字段"
            width="350"
          >
            <template #default="scope">
              <el-form-item
                :prop="`details[${scope.$index}].correlationField`"
                :rules="[{ required: true, message: '请输入字段名称', trigger: 'change' }]"
              >
                <el-select
                  v-if="isEdit"
                  v-model="scope.row.correlationField"
                  placeholder="请选择"
                  clearable
                  style="width: 120px; margin-right: 20px"
                  @change="changeSelect(1, $event, scope.row)"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  v-if="isEdit"
                  v-model="scope.row.fieldCode"
                  placeholder="请选择"
                  clearable
                  style="width: 150px"
                  @change="changeSelect(2, $event, scope.row)"
                >
                  <el-option
                    v-for="item in scope.row.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <span v-else>{{ scope.row.fieldName }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
          >
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="handleCencel(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </nh-drawer-container>
    </el-form>
    <selectOwner
      ref="selectOwner"
      @onSuccess="getSelectData"
    />
    <template #footer>
      <div
        v-if="!disabled"
        class="footer"
      >
        <nh-button @click="handleClose"> 取消 </nh-button>
        <nh-button
          v-loading="loading.handleSaveSubmit"
          type="primary"
          @click="handleSaveSubmit"
        >
          确定
        </nh-button>
      </div>
    </template>
  </nh-drawer>
</template>
<script>
import loadingMixin from '@/thales/loading';
import { getToken, getTenantId, uploadHeader } from '@/util/auth';
import selectOwner from './components/selectOwner.vue';
import { rules, options, codeType } from './fileds';
import {
  fixedField,
  ruleBarcodeInsert,
  ruleBarcodeGet,
  ruleBarbatchField,
  ruleBarcodeUpdate,
} from './api';

export default {
  name: 'OwnerShipperCreate',
  components: {
    selectOwner,
  },
  mixins: [loadingMixin],
  emits: ['onSuccess'],

  data() {
    return {
      fixOptions: [],
      changeOptions: [],
      rules,
      options,
      codeType,
      drawerVisible: false,
      dialogVisible: false,
      disabled: false,
      isEdit: true,
      uploadHeader: {
        ...uploadHeader(),
      },
      file: {
        percentage: 0,
      },
      formData: {
        details: [
          {
            fromIndex: '',
            toIndex: '',
            fieldName: '',
            fieldCode: '',
          },
        ],
        shippers: [],
        barcodeSign: [],
        id: '',
        pictures: [],
      },
      loading: {
        init: false,
        uploadFile: false,
        handleSaveSubmit: false,
      },
    };
  },
  methods: {
    async init(id) {
      this.drawerVisible = true;
      this.formData.id = '';
      this.formData.details = [
        {
          fromIndex: '',
          toIndex: '',
          fieldName: '',
          fieldCode: '',
        },
      ];
      fixedField().then((res) => {
        this.fixOptions = res.map((i) => ({
          label: i.fieldName,
          value: i.fieldCode,
        }));
      });
      ruleBarbatchField().then((res) => {
        this.changeOptions = res.map((i) => ({
          label: i.fieldName,
          value: i.fieldCode,
        }));
      });
      if (id) {
        ruleBarcodeGet(id).then((res) => {
          const info = res;
          info.details.forEach((item) => {
            const i = item;
            if (i.correlationField === 'FIX_FIELD') i.options = this.fixOptions;
            if (i.correlationField === 'BATCH_ATTR') i.options = this.changeOptions;
          });
          this.formData = info;
        });
      }
    },
    handleUpload() {
      this.file.percentage = 0;
      this.$refs.inputFile.click();
    },
    // 上传
    beforeAvatarUpload(e) {
      const IMAGE_TYPE = ['png', 'jpg', 'jpeg'];
      const file = e.target.files[0];
      const isLt5M = file.size < 512000;
      const fileType = file.type;
      const isImg = IMAGE_TYPE.some((item) => fileType.endsWith(item));
      if (!isImg) {
        this.$message.error('只支持png和jpg格式的文件!');
      } else if (!isLt5M) {
        this.$message.error('上传图片大小不能超过500kb!');
      } else {
        this.uploadFile(file);
      }
    },
    async uploadFile(file) {
      const resp = await this.uploadHttp(file);
      if (resp.code === '2000000000') {
        this.formData.pictures = [resp.data[0].url];
      } else {
        this.$message.error(resp.msg);
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
        http.setRequestHeader('Tenant-Id', getTenantId());
        http.onreadystatechange = () => {
          if (http.status === 200 && http.readyState === 4) {
            resolve(http.response);
          }
        };
        // 获取上传进度
        http.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            this.file.percentage = Math.floor((event.loaded / event.total) * 100);
          }
        };
        http.send(fromData);
      });
    },
    // 上传图片预览
    handlePictureCardPreview() {
      this.dialogVisible = true;
    },
    // 删除图片
    handleRemove() {
      this.formData.pictures = [];
      this.$refs.inputFile.value = '';
    },
    handleClose() {
      this.$refs.enterpriseForm.resetFields();
      this.drawerVisible = false;
    },
    async handleSaveSubmit() {
      await this.$refs.enterpriseForm.validate();
      const data = JSON.parse(JSON.stringify(this.formData));
      delete data.barcode;
      this.loading.handleSaveSubmit = true;
      if (data.id) {
        await ruleBarcodeUpdate(data);
      } else {
        await ruleBarcodeInsert(data);
      }
      this.loading.handleSaveSubmit = false;
      this.drawerVisible = false;
      this.$refs.enterpriseForm.resetFields();
      this.$message.success('操作成功!');
      this.$parent.handleQuery();
    },
    handleCencel(index) {
      this.formData.details.splice(index, 1);
    },
    addRow() {
      this.formData.details.push({
        fromIndex: '',
        toIndex: '',
        fieldName: '',
        fieldCode: '',
      });
    },
    showSelect() {
      this.$refs.selectOwner.init();
    },
    getSelectData(data) {
      this.formData.shippers = data;
    },
    addTag() {
      if (this.formData.barcode) this.formData.barcodeSign.push(this.formData.barcode);
      this.formData.barcode = '';
    },
    handleCloseTag(tag) {
      this.formData.barcodeSign.splice(this.formData.barcodeSign.indexOf(tag), 1);
    },
    changeSelect(num, val, row) {
      const rows = row;
      if (num === 1) {
        rows.fieldCode = '';
        rows.options = val === 'FIX_FIELD' ? this.fixOptions : this.changeOptions;
      } else {
        const data = rows.options.filter((i) => i.value === val);
        rows.fieldName = data[0].label;
      }
    },
    changeIpt(num, row) {
      const line = row;
      if (row.toIndex && row.fromIndex) {
        if (Number(row.toIndex) - Number(row.fromIndex) <= 0) {
          line[num === 1 ? 'fromIndex' : 'toIndex'] = '';
          this.$message.error('结束值必须大于开始值，请重新输入!');
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.owner-shipper-create {
  .dialog-img {
    width: 100%;
  }

  .input-line {
    display: flex;

    .el-form-item {
      margin-bottom: 0;
    }

    & > :last-of-type {
      margin-right: 0;
    }
  }
}

.files {
  display: flex;
  flex-wrap: wrap;

  .midea-box {
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
    width: 80px;
    height: 80px;
    display: inline-block;
    border-radius: 6px;
    line-height: 80px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .midea-box:active {
    z-index: 1;
    transform: scale(1);
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }

  .el-upload-list--picture-card .el-progress {
    width: auto;
  }

  .el-upload--picture-card i {
    font-size: 18px;
    margin-top: 0;
  }

  .el-upload-list--picture-card .el-upload-list__item-actions {
    font-size: 18px;

    span + span {
      margin-left: 8px;
    }
  }
}

.files + .file-input {
  display: none;
}

.describe {
  font-size: 12px;
  color: #969799;
  line-height: 20px;
}

.footer {
  border-top: 1px solid var(--el-border-color-light);
  padding: 8px 24px 8px 0;
  // background-color: var(--el-color-dark-bg);
  text-align: right;
}

:deep(.tableBox .el-form-item) {
  padding-top: 10px;
  height: 40px !important;
  line-height: 40px !important;
}
</style>
<style lang="scss">
.owner-shipper-create {
  .el-select {
    width: 100%;
  }

  .el-input {
    line-height: 32px;
  }

  .el-autocomplete {
    width: 100%;
  }
}

.el-table__row .el-table__cell {
  padding: 0;
  height: 20px !important;
}

.owner-shipper-create .el-form-item__label {
  width: 100px !important;
}
</style>
