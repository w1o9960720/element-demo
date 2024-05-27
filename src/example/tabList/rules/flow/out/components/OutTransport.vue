<template>
  <el-form
    ref="formData"
    :rules="rules"
    :inline="true"
    :model="formData"
  >
    <h4>发运配置：</h4>
    <el-row>
      <el-form-item
        v-if="false"
        label="支持强制发运:"
        prop="ruleCode"
      >
        <el-checkbox
          v-model="formData.forceShip.status"
          :true-label="enableShutdownState[0].value"
          :false-label="enableShutdownState[1].value"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          启用
        </el-checkbox>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="是否录入封箱签:"
        prop="ruleCode"
      >
        <el-checkbox
          v-model="formData.needSealLabel.status"
          :true-label="enableShutdownState[0].value"
          :false-label="enableShutdownState[1].value"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          启用
        </el-checkbox>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="回库到指定库位:"
        prop="returnTemporaryStorehouse"
      >
        <div style="display: flex">
          <el-checkbox
            v-model="formData.returnStatus"
            :true-label="enableShutdownState[0].value"
            :false-label="enableShutdownState[1].value"
            :disabled="pageType === PAGE_TYPE.VIEW"
            style="margin-right: 20px"
            @change="getVal"
          >
            启用
          </el-checkbox>
          <el-select
            v-if="formData.returnStatus === 'ENABLED'"
            v-model="formData.returnTemporaryStorehouse"
            filterable
            :remote="true"
            reserve-keyword
            placeholder="请选择当前仓库库位"
            style="width: 100%"
            :remote-method="remoteMethod"
            loading-text="加载中……"
            :disabled="pageType === PAGE_TYPE.VIEW"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import { WarehouseLocation } from '@/api/wms/warehouse';
import { enableShutdownState } from './constant';
import { PAGE_TYPE } from '../../constant';

export default {
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    pageType: {
      type: String,
      default: '',
    },
    warehouseCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      PAGE_TYPE,
      enableShutdownState,
      rules: {
        returnTemporaryStorehouse: [
          { required: false, message: '请选择当前仓库库位', trigger: 'blur' },
        ],
      },
      options: [],
    };
  },
  methods: {
    validateForm() {
      return this.$refs.formData.validate();
    },
    getVal(val) {
      this.rules.returnTemporaryStorehouse[0].required = val === 'ENABLED';
      this.remoteMethod('', 1);
    },
    remoteMethod(query, num) {
      this.options = [];
      if (query !== '' || num) {
        const params = {
          warehouseCode: this.warehouseCode,
          storageLocationCode: query,
          page: 1,
          pageSize: 10,
        };
        WarehouseLocation(params)
          .then((resp) => {
            if (resp.records.length <= 0) {
              this.$message.error('该仓库下暂无库位');
              return;
            }
            resp.records.forEach((item) => {
              this.options.push({
                label: item.storageLocationCode,
                value: item.id,
              });
            });
          })
          .catch(({ resp }) => {
            resp.records.forEach((item) => {
              this.options.push({
                label: item.storageLocationCode,
                value: item.id,
              });
            });
          });
      } else {
        this.options = [];
      }
    },
  },
};
</script>
