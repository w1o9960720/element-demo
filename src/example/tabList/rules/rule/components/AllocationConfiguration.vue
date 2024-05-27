<template>
  <div class="content-container">
    <el-dialog
      v-model="visible"
      title="库存分配规则配置"
      :close-on-click-modal="false"
      @close="onClose"
    >
      <el-form
        ref="ruleForm"
        :model="from"
        :rules="rules"
      >
        <el-row>
          <el-col :span="3">
            <div class="required">前置条件:</div>
          </el-col>
          <el-col
            :span="21"
            class="main-table-box"
          >
            <div class="inline-table main-table-header">
              <div class="condition">条件</div>
              <div>限定范围</div>
            </div>
            <div class="inline-table">
              <div class="condition"><span class="required">*</span>质量状态</div>
              <div style="flex: 1">
                <el-form-item prop="preCondition.quality">
                  <el-checkbox-group v-model="from.preCondition.quality">
                    <el-checkbox
                      v-for="item in goodsQualityList"
                      :key="item.code"
                      :label="item.code"
                    >
                      {{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
            <div class="inline-table">
              <div class="condition"><span class="required">*</span>温层</div>
              <div style="flex: 1">
                <el-form-item prop="preCondition.temperatureLayer">
                  <el-checkbox-group v-model="from.preCondition.temperatureLayer">
                    <el-checkbox
                      v-for="item in Thermosphere"
                      :key="item.label"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
            <div class="inline-table">
              <div class="condition"><span class="required">*</span>单据类型</div>
              <div style="flex: 1">
                <el-form-item prop="preCondition.bizType">
                  <el-checkbox-group v-model="from.preCondition.bizType">
                    <el-checkbox
                      v-for="item in DELIVER_TYPE"
                      :key="item.label"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="required">库位范围:</div>
          </el-col>
          <el-col :span="10">
            <el-select
              v-model="from.recommendRuleType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in locationRange"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="checkmoudel">
          <el-col :span="21">
            <div>
              <el-checkbox
                v-model="from.forcingGoodsScope"
                label="货品有指定拣选位时，以指定拣选位为准"
                @change="chooseForcingGoodsScope"
              />
            </div>
            <div
              v-if="from.recommendRuleType === locationRange[3].value"
              style="margin: 16px 0"
            >
              <el-button @click="AddLimitStorage"> 增加限定库区 </el-button>
              <el-button @click="AddLimitReservoir"> 增加限定库位 </el-button>
              <el-button @click="AddLimitLogical"> 增加限定逻辑区 </el-button>
            </div>

            <el-form-item
              v-if="from.recommendRuleType === locationRange[3].value"
              prop="stockScope"
            >
              <el-table :data="from.stockScope">
                <el-table-column
                  type="index"
                  label="#"
                  fixed
                  width="50"
                />
                <el-table-column label="限定方式">
                  <template v-slot:default="scope">
                    <span>{{ changeStockScopeType(scope.row.stockScopeTypeEnum) }}</span>
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
            <div>
              <el-checkbox
                v-model="from.excludeReplenishment"
                label="过滤补货池库存"
              />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div>库存周转规则:</div>
          </el-col>
          <el-col :span="21">
            <el-button
              v-if="from.turnoverRule.length === 0"
              type="text"
              size="small"
              class="have-not-turnover-rule"
              @click="addTurnoverRule()"
            >
              添加行
            </el-button>
            <el-table :data="from.turnoverRule">
              <el-table-column
                type="index"
                label="#"
                fixed
                width="50"
              />
              <el-table-column
                label="批属性字段"
                min-width="160px"
              >
                <template v-slot:default="scope">
                  <el-select
                    v-model="scope.row.fieldCode"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in ruleBatch"
                      :key="item.id"
                      :label="item.fieldName"
                      :value="item.fieldCode"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="排序规则"
                min-width="160px"
              >
                <template v-slot:default="scope">
                  <el-select
                    v-model="scope.row.rule"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in sortRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-table-column> 
              <el-table-column
                v-if="includeProductDate"
                label="限定规则（非必填）"
                width="360px"
              >
                <template v-slot:default="scope">
                  <el-form-item
                    v-if="scope.row.fieldCode === 'productDate'"
                    :prop="'turnoverRule.' + scope.$index + '.limitRule'"
                    :rules="[{ validator: validateNumber, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model.trim="scope.row.limitRule"
                      placeholder="请填写0-1之间的小数，只支持填写到小数点后3位"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="200px"
                fixed="right"
              >
                <template v-slot:default="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteTurnoverRule(scope.row)"
                  >
                    删除
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="addTurnoverRule(scope.$index + 1)"
                  >
                    添加行
                  </el-button>
                  <el-button
                    v-if="scope.$index !== 0"
                    type="text"
                    size="small"
                    @click="moveUpward(scope.$index)"
                  >
                    上移
                  </el-button>
                  <el-button
                    v-if="scope.$index + 1 !== from.turnoverRule.length"
                    type="text"
                    size="small"
                    @click="moveDown(scope.$index)"
                  >
                    下移
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div><span class="required">*</span>自定义优先规则:</div>
          </el-col>
          <el-col :span="21">
            <el-form-item prop="customizeRule">
              <el-select
                v-model="from.customizeRule"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in customizeRuleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onClose"> 取 消 </el-button>
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
import { cloneDeep } from 'lodash';
import StorageLocation from '@/components/AddLimit/StorageLocation.vue';
import ReservoirArea from '@/components/AddLimit/ReservoirArea.vue';
import LogicalArea from '@/components/AddLimit/LogicalArea.vue';
import { getDictionary } from '@/util/Dictionary';
import {
  Thermosphere,
  stockScopeTypeEnumEN,
  stockScopeTypeEnumCN,
  customizeRuleOptions,
  sortRules,
  DELIVER_TYPE,
  locationRange,
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
  },
  data() {
    return {
      Thermosphere,
      sortRules,
      customizeRuleOptions,
      DELIVER_TYPE,
      visible: false,
      warehouseCode: '',
      locationRange,
      ids: [],
      from: {
        preCondition: {
          quality: [],
          temperatureLayer: [],
          bizType: [],
        },
        forcingGoodsScope: false,
        excludeReplenishment: false,
        stockScope: [],
        turnoverRule: [],
        customizeRule: '',
        recommendRuleType: 'CUSTOM_LOCATION',
      },
      rules: {
        'preCondition.quality': [{ required: true, message: '请选择质量状态', trigger: 'change' }],
        'preCondition.temperatureLayer': [
          { required: true, message: '请选择温层', trigger: 'change' },
        ],
        'preCondition.bizType': [{ required: true, message: '请选择单据类型', trigger: 'change' }],
        stockScope: [
          { required: true, message: '请至少添加一种库位范围', trigger: ['change', 'blur'] },
        ],
        customizeRule: [{ required: true, message: '请确认自定义优先规则', trigger: 'change' }],
      },
      page: 1,
      size: 999,
    };
  },
  computed: {
    includeProductDate() {
      return this.from.turnoverRule.some((item) => item.fieldCode === 'productDate');
    },
    goodsQualityList() {
      return getDictionary(this.$store.state.dictionary.dictionaryCodeEN.GOODS_QUALITY);
    },
  },
  methods: {
    chooseForcingGoodsScope(isSelect) {
      if (isSelect) {
        this.from.excludeReplenishment = true;
      }
    },
    validateNumber(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        return callback();
      }
      if (/^0\.\d{0,2}[1-9]$/.test(value)) {
        return callback();
      }
      return callback(new Error(' '));
    },
    // 添加限定库位
    AddLimitReservoir() {
      const ids = [];
      this.from.stockScope.forEach((item) => {
        if (item.stockScopeTypeEnum === stockScopeTypeEnumEN.STOREHOUSE) {
          ids.push(item.id);
        }
      });
      this.$refs.reservoirArea.onOpen(this.warehouseCode, ids);
    },
    // 添加限定库区
    AddLimitStorage() {
      const ids = [];
      this.from.stockScope.forEach((item) => {
        if (item.stockScopeTypeEnum === stockScopeTypeEnumEN.ZONE) {
          ids.push(item.id);
        }
      });
      this.$refs.storageLocation.onOpen(
        this.warehouseCode,
        ids,
        this.from.preCondition.temperatureLayer,
      );
    },
    // 添加限定逻辑区
    AddLimitLogical() {
      const ids = [];
      this.from.stockScope.forEach((item) => {
        if (item.stockScopeTypeEnum === stockScopeTypeEnumEN.ABSTRACT_ZONE) {
          ids.push(item.id);
        }
      });
      this.$refs.logicalArea.onOpen(this.warehouseCode, ids);
    },
    changeStockScopeType(code) {
      return stockScopeTypeEnumCN[code];
    },
    changeStockScopeCode(row) {
      if (row.stockScopeTypeEnum === stockScopeTypeEnumEN.ZONE) {
        return `库区编号:${row.code}`;
      }
      if (row.stockScopeTypeEnum === stockScopeTypeEnumEN.STOREHOUSE) {
        return `库位编号:${row.code}`;
      }
      return `逻辑区编号:${row.code}`;
    },
    // 删除限定范围数据
    deleteStockScope(row) {
      this.from.stockScope = this.from.stockScope.filter((item) => item !== row);
    },
    // 删除库存周转规则
    deleteTurnoverRule(row) {
      this.from.turnoverRule = this.from.turnoverRule.filter((item) => item !== row);
    },
    // 获取限定库区选择数据
    getLimitZoon(data) {
      data.forEach((res) => {
        const addLimitData = {
          id: res.id,
          code: res.zoneCode,
          stockScopeTypeEnum: stockScopeTypeEnumEN.ZONE,
        };
        this.from.stockScope.push(addLimitData);
      });
      this.$refs.ruleForm.validateField('stockScope');
    },
    // 获取限定库位选择数据
    getLimitReservoir(data) {
      data.forEach((res) => {
        const addLimitData = {
          id: res.id,
          code: res.storageLocationCode,
          stockScopeTypeEnum: stockScopeTypeEnumEN.STOREHOUSE,
        };
        this.from.stockScope.push(addLimitData);
      });
      this.$refs.ruleForm.validateField('stockScope');
    },
    // 获取限定逻辑区选择数据
    getLimitLogical(data) {
      data.forEach((res) => {
        const addLimitData = {
          id: res.id,
          code: res.abstractZoneCode,
          stockScopeTypeEnum: stockScopeTypeEnumEN.ABSTRACT_ZONE,
        };
        this.from.stockScope.push(addLimitData);
      });
      this.$refs.ruleForm.validateField('stockScope');
    },
    // 添加一行周转规则
    addTurnoverRule(index = 1) {
      const newRow = {
        rule: sortRules[0].value,
        fieldCode: this.ruleBatch[0].fieldCode,
      };
      this.from.turnoverRule.splice(index, 0, newRow);
    },
    // 上移周转规则
    moveUpward(index) {
      const upData = this.from.turnoverRule[index - 1];
      this.from.turnoverRule.splice(index - 1, 1);
      this.from.turnoverRule.splice(index, 0, upData);
    },
    // 下移周转规则
    moveDown(index) {
      const downData = this.from.turnoverRule[index + 1];
      this.from.turnoverRule.splice(index + 1, 1);
      this.from.turnoverRule.splice(index, 0, downData);
    },
    // 确认
    async onSubmit() {
      await this.$refs.ruleForm.validate();
      const fromData = { ...this.from };
      fromData.turnoverRule = fromData.turnoverRule.map((item, index) => {
        const newItem = item;
        newItem.sort = index + 1;
        return newItem;
      });
      this.$emit('addRuleDetails', { ...fromData });
      this.onClose();
    },
    onOpen(data, warehouseCode) {
      if (data) {
        this.from = cloneDeep(data);
      }
      this.visible = true;
      this.warehouseCode = warehouseCode;
    },
    onClose() {
      this.visible = false;
      this.from = {
        preCondition: {
          quality: [],
          temperatureLayer: [],
          bizType: [],
        },
        forcingGoodsScope: false,
        excludeReplenishment: false,
        stockScope: [],
        turnoverRule: [],
        customizeRule: '',
        recommendRuleType: 'CUSTOM_LOCATION',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.content-container {
  :deep(.el-dialog__body) {
    height: 420px;
    overflow: auto;
  }
}
.el-row {
  margin-bottom: 20px;
}
.inline-table {
  width: 100%;
  display: flex;
  line-height: 40px;
  border: 1px solid #ccc;
  .condition {
    width: 140px;
    text-align: center;
  }
}
.main-table-header {
  background: #f2f2f2;
}
.have-not-turnover-rule {
  position: absolute;
  z-index: 100;
  right: 150px;
  top: 50px;
}
.required {
  color: #ff0000;
}

.checkmoudel {
  margin-left: 100px;
}

.max-width_tooltip {
  width: 50vw;
}

.max-row3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.el-icon-question {
  color: #ff0000;
}

.el-table {
  .el-input-number {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
