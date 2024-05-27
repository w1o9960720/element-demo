<template>
  <div class="content-container">
    <el-dialog
      v-model="visible"
      title="上架规则配置"
      @close="onClose"
    >
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="left"
      >
        <el-row>
          <el-col :span="24">
            <div class="required">前置条件:</div>
          </el-col>
          <el-col
            :offset="3"
            :span="21"
            class="main-table-box"
          >
            <el-form-item
              label="货品质量"
              prop="preCondition.quality"
            >
              <el-checkbox-group v-model="form.preCondition.quality">
                <el-checkbox
                  v-for="item in goodsQualityList"
                  :key="item.code"
                  :label="item.code"
                >
                  {{ item.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="存放单位"
              prop="preCondition.storeUnit"
            >
              <el-checkbox-group v-model="form.preCondition.storeUnit">
                <el-checkbox
                  v-for="item in storeUnit"
                  :key="item.label"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="单据类型"
              prop="preCondition.orderType"
            >
              <el-checkbox-group v-model="form.preCondition.orderType">
                <el-checkbox
                  v-for="item in RECEIPT_TYPE"
                  :key="item.label"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="温层"
              prop="preCondition.temperatureLayer"
            >
              <el-checkbox-group v-model="form.preCondition.temperatureLayer">
                <el-checkbox
                  v-for="item in Thermosphere"
                  :key="item.label"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="预定义推荐规则"
              class="required-label"
              prop="recommendRuleType"
            >
              <el-select
                v-model="form.recommendRuleType"
                placeholder="请选择"
                @change="handleRecommendRulesChange"
              >
                <el-option
                  v-for="item in RECOMMEND_RULES"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="form.recommendRuleType === RECOMMEND_RULES[0].value"
            :offset="1"
            :span="23"
          >
            <el-row>
              <el-col :span="3"> <span class="required">* </span>库位范围: </el-col>
              <el-col :span="21">
                <el-row>
                  <el-col :span="24">
                    <el-button @click="AddLimitStorage"> 增加限定库区 </el-button>
                    <el-button @click="AddLimitReservoir"> 增加限定库位 </el-button>
                    <el-button @click="AddLimitLogical"> 增加限定逻辑区 </el-button>
                  </el-col>
                </el-row>
                <el-form-item
                  prop="storehouseScopes"
                  label-width="0"
                >
                  <el-table :data="form.storehouseScopes">
                    <el-table-column
                      type="index"
                      label="#"
                      fixed
                      width="50"
                    />
                    <el-table-column label="限定方式">
                      <template v-slot:default="scope">
                        <span>{{ changeStockScopeType(scope.row.storehouseScopeType) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="范围">
                      <template v-slot:default="scope">
                        <span>{{ changeStockScopeCode(scope.row) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template v-slot:default="scope">
                        <el-button
                          type="text"
                          size="small"
                          @click="deleteStockScope(scope.row)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="required">
              推荐库位优先限制:
              <span
                v-for="(item, index) in form.priorityRules"
                :key="item"
              >
                <el-tag type="info">
                  {{ PRIORITY_ENUM[item] }}
                </el-tag>
                <i
                  v-if="index !== form.priorityRules.length - 1"
                  class="required-icon el-icon-d-arrow-right"
                />
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="21"
            :offset="3"
          >
            <el-form-item
              label="库位限制优先级"
              prop="priorityRules"
            >
              <el-checkbox-group v-model="form.priorityRules">
                <el-checkbox
                  v-for="item in PRIORITY"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="库位排序规则"
              prop="storehouseSortRule"
            >
              <el-radio-group v-model="form.storehouseSortRule">
                <el-radio
                  v-for="item in EMPTY_RULES"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false"> 取 消 </el-button>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <storage-location
      ref="storageLocation"
      @addLimitZoon="getLimitZoon"
    />
    <reservoir-area
      ref="reservoirArea"
      @addLimitReservoir="getLimitReservoir"
    />
    <logical-area
      ref="logicalArea"
      @addLimitLogical="getLimitLogical"
    />
  </div>
</template>

<script>
import StorageLocation from '@/components/AddLimit/StorageLocation.vue';
import ReservoirArea from '@/components/AddLimit/ReservoirArea.vue';
import LogicalArea from '@/components/AddLimit/LogicalArea.vue';
import cloneDeep from 'lodash/cloneDeep';

import { PRIORITY_ENUM } from '../constant';
import {
  storeUnit,
  RECEIPT_TYPE,
  Thermosphere,
  RECOMMEND_RULES,
  PRIORITY,
  EMPTY_RULES,
  stockScopeTypeEnumEN,
  stockScopeTypeEnumCN,
} from './constant';

export default {
  components: {
    StorageLocation,
    ReservoirArea,
    LogicalArea,
  },
  props: {
    ruleBatch: {
      type: Array,
      default: () => [],
    },
    goodsQualityList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      storeUnit,
      RECEIPT_TYPE,
      Thermosphere,
      RECOMMEND_RULES,
      PRIORITY,
      PRIORITY_ENUM,
      EMPTY_RULES,
      visible: false,
      warehouseCode: '',
      form: {
        preCondition: {
          quality: [],
          storeUnit: [],
          orderType: [],
          temperatureLayer: [],
        },
        recommendRuleType: null,
        storehouseScopes: [],
        priorityRules: [],
        storehouseSortRule: null,
      },
      rules: {
        'preCondition.quality': [{ required: true, message: '请选择质量状态', trigger: 'change' }],
        'preCondition.storeUnit': [
          { required: true, message: '请选择存放单位', trigger: 'change' },
        ],
        'preCondition.orderType': [
          { required: true, message: '请选择单据类型', trigger: 'change' },
        ],
        'preCondition.temperatureLayer': [
          { required: true, message: '请选择温层', trigger: 'change' },
        ],
        recommendRuleType: [{ required: true, message: '请选择预定义推荐规则', trigger: 'change' }],
        storehouseScopes: [
          {
            type: 'array',
            required: true,
            message: '请至少添加一种库位范围',
            trigger: 'change',
          },
        ],
        storehouseSortRule: [
          { required: true, message: '请确认自定义优先规则', trigger: 'change' },
        ],
      },
      page: 1,
      size: 999,
    };
  },
  methods: {
    // 更改预定义推荐规则
    handleRecommendRulesChange(val) {
      if (val !== RECOMMEND_RULES[0].value) {
        this.form.storehouseScopes = [];
      }
    },
    // 添加限定库位
    AddLimitReservoir() {
      const ids = [];
      this.form.storehouseScopes.forEach((item) => {
        if (item.storehouseScopeType === stockScopeTypeEnumEN.STOREHOUSE) {
          ids.push(item.id);
        }
      });
      this.$refs.reservoirArea.onOpen(this.warehouseCode, ids);
    },
    // 添加限定库区
    AddLimitStorage() {
      const ids = [];
      this.form.storehouseScopes.forEach((item) => {
        if (item.storehouseScopeType === stockScopeTypeEnumEN.ZONE) {
          ids.push(item.id);
        }
      });
      this.$refs.storageLocation.onOpen(
        this.warehouseCode,
        ids,
        this.form.preCondition.temperatureLayer,
      );
    },
    // 添加限定逻辑区
    AddLimitLogical() {
      const ids = [];
      this.form.storehouseScopes.forEach((item) => {
        if (item.storehouseScopeType === stockScopeTypeEnumEN.ABSTRACT_ZONE) {
          ids.push(item.id);
        }
      });
      this.$refs.logicalArea.onOpen(this.warehouseCode, ids);
    },
    changeStockScopeType(code) {
      return stockScopeTypeEnumCN[code];
    },
    changeStockScopeCode(row) {
      if (row.storehouseScopeType === stockScopeTypeEnumEN.ZONE) {
        return `库区编号:${row.code}`;
      }
      if (row.storehouseScopeType === stockScopeTypeEnumEN.STOREHOUSE) {
        return `库位编号:${row.code}`;
      }
      return `逻辑区编号:${row.code}`;
    },
    // 删除限定范围数据
    deleteStockScope(row) {
      this.form.storehouseScopes = this.form.storehouseScopes.filter((item) => item !== row);
    },
    // 获取限定库区选择数据
    getLimitZoon(data) {
      data.forEach((res) => {
        const addLimitData = {
          id: res.id,
          code: res.zoneCode,
          storehouseScopeType: stockScopeTypeEnumEN.ZONE,
        };
        this.form.storehouseScopes.push(addLimitData);
      });
      this.$refs.ruleForm.validateField('stockScope');
    },
    // 获取限定库位选择数据
    getLimitReservoir(data) {
      data.forEach((res) => {
        const addLimitData = {
          id: res.id,
          code: res.storageLocationCode,
          storehouseScopeType: stockScopeTypeEnumEN.STOREHOUSE,
        };
        this.form.storehouseScopes.push(addLimitData);
      });
      this.$refs.ruleForm.validateField('stockScope');
    },
    // 获取限定逻辑区选择数据
    getLimitLogical(data) {
      data.forEach((res) => {
        const addLimitData = {
          id: res.id,
          code: res.abstractZoneCode,
          storehouseScopeType: stockScopeTypeEnumEN.ABSTRACT_ZONE,
        };
        this.form.storehouseScopes.push(addLimitData);
      });
      this.$refs.ruleForm.validateField('stockScope');
    },
    // 确认
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('addRuleDetails', cloneDeep(this.form));
          this.visible = false;
        }
      });
    },
    onOpen(data, warehouseCode) {
      this.visible = true;
      this.$nextTick(() => {
        if (data) {
          const form = cloneDeep(data);
          this.form = {
            ...this.form,
            ...form,
          };
        }
        this.warehouseCode = warehouseCode;
      });
    },
    onClose() {
      this.form = {
        preCondition: {
          quality: [],
          storeUnit: [],
          orderType: [],
          temperatureLayer: [],
        },
        recommendRuleType: null,
        storehouseScopes: [],
        priorityRules: [],
        storehouseSortRule: null,
      };
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-form .el-form-item {
  margin-bottom: 16px;
}
.required {
  color: #ff0000;
}

.required-icon {
  color: #1890ff;
  vertical-align: middle;
}
</style>
<style lang="scss">
.content-container {
  .required-label {
    .el-form-item__label {
      color: #ff0000;
    }
  }
  :deep(.el-dialog__body) {
    height: 420px;
    overflow: auto;
  }
}
</style>
