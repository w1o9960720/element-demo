<template>
  <div>
    <list-block>
      <el-form
        ref="formData"
        :rules="rules"
        :inline="true"
        :model="formData"
      >
        <h4>验收配置：</h4>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="越库是否自动上架:"
              prop="allowCrossDockingAndPutaway"
            >
              <el-radio-group
                v-model="formData.allowCrossDockingAndPutaway"
                :disabled="pageType === PAGE_TYPE.VIEW"
                @change="allowCrossDockingAndPutawayChange"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col
            v-if="formData.allowCrossDockingAndPutaway"
            :span="10"
          >
            <el-form-item
              label="越库自动上架库位:"
              prop="autoPutawayStorehouseCode"
            >
              <el-select
                v-model="formData.autoPutawayStorehouseCode"
                filterable
                remote
                :remote-method="remoteMethod"
                placeholder="请选择"
                :loading="loading.remoteMethod"
                @change="handleStorehouseCodeChange"
              >
                <el-option
                  v-for="item in warehouseFoundationList"
                  :key="item.storageLocationCode"
                  :label="item.storageLocationCode"
                  :value="item.storageLocationCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item
              label="库位推荐节点:"
              prop="recommendStorehouseOpportunity"
            >
              <el-radio-group
                v-model="formData.recommendStorehouseOpportunity"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in recommendStorehouseOpportunityList"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item
              label="可选货品质量:"
              prop="goodsQualityList"
            >
              <el-checkbox-group
                v-model="formData.goodsQualityList"
                :disabled="pageType === PAGE_TYPE.VIEW"
                @change="goodsQualityChange"
              >
                <el-checkbox
                  v-for="item in goodsQualityList"
                  :key="item.code"
                  :label="item.code"
                >
                  {{ item.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              v-if="formData.goodsQualityList.length > 0"
              label="默认货品质量:"
              prop="defaultGoodsQuality"
            >
              <el-radio-group
                v-model="formData.defaultGoodsQuality"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in goodsQualityList"
                  :key="item.code"
                  :label="item.code"
                >
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item
              label="是否允许超收:"
              prop="allowOvercharge"
            >
              <el-radio-group
                v-model="formData.allowOvercharge"
                :disabled="pageType === PAGE_TYPE.VIEW"
                @change="allowOverchargeChange"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col
            v-if="formData.allowOvercharge"
            :span="10"
          >
            <el-form-item
              label="允许超收比例(%):"
              prop="overchargePercent"
            >
              <div class="task-storehouse-max">
                <el-input
                  v-model="formData.overchargePercent"
                  class="task-input"
                  :disabled="pageType === PAGE_TYPE.VIEW || formData.overchargePercent === null"
                />
                <el-checkbox
                  v-model="unlimited"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                  @change="unlimitedChange"
                >
                  不限
                </el-checkbox>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item
              label="容器是否允许混批次:"
              prop="allowContainerMixBatch"
            >
              <el-radio-group
                v-model="formData.allowContainerMixBatch"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="容器是否允许混货品:"
              prop="allowContainerMixGoods"
            >
              <el-radio-group
                v-model="formData.allowContainerMixGoods"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item
              label="是否支持货品码:"
              prop="enableGoodsTagCode"
              :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
            >
              <el-radio-group
                v-model="formData.enableGoodsTagCode"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="是否强制验证货品码:"
              prop="validateGoodsTagCode"
              :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
            >
              <el-radio-group
                v-model="formData.validateGoodsTagCode"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item
              label="是否验证单板数量:"
              prop="validateVeneerNum"
              :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
            >
              <el-radio-group
                v-model="formData.validateVeneerNum"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                <el-radio
                  v-for="item in useBooleanState"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item>
              <template #label>
                <el-tooltip
                  content="说明：限定可选的库位与温层匹配"
                  placement="top-start"
                >
                  <el-icon>
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
                <span>入库暂存位:</span>
              </template>
              <el-row
                v-for="list in temporaryStorehouse"
                :key="list.value"
              >
                <el-form-item
                  :label="list.label"
                  :prop="`temporaryStorehouse.${list.code}`"
                  :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
                >
                  <el-select
                    v-model="formData.temporaryStorehouse[list.code]"
                    filterable
                    remote
                    :remote-method="(query) => remoteMethod(query, list.temporary)"
                    placeholder="请选择"
                    :loading="loading.remoteMethod"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @change="(code) => handleAcceptStorehouseChange(code, list)"
                  >
                    <el-option
                      v-for="item in warehouseFoundationObj[list.temporary]"
                      :key="item.id"
                      :label="item.storageLocationCode"
                      :value="item.storageLocationCode"
                    />
                  </el-select>
                </el-form-item>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <h4>任务配置：</h4>
          <TaskAllocation :table-data="formData.taskFlows" />
        </div>
      </el-form>
    </list-block>
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { warehouseStorehouseSearch } from '@/api/addLimit';
import loadingMixin from '@/thales/loading';
import TaskAllocation from './TaskAllocation.vue';
import {
  useBooleanState,
  recommendStorehouseOpportunityList,
  warehouseZoneCode,
  temporaryStorehouse,
} from './constant';
import { PAGE_TYPE } from '../../constant';

export default {
  components: {
    ListBlock,
    InfoFilled,
    TaskAllocation,
  },
  mixins: [loadingMixin],
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    warehouseCode: {
      type: String,
      default: '',
    },
    pageType: {
      type: String,
      default: '',
    },
    goodsQualityList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const validateOverchargeRatio = (rule, value, callback) => {
      const reg = /^(?:0\.\d{1,2}|[1-9]\d{0,2}(?:\.\d{1,2})?|1000)$/;
      if (!reg.test(value) && value !== null) {
        callback(new Error('请输入大于0，小于1000的数字。支持2位小数。'));
      } else {
        callback();
      }
    };
    return {
      PAGE_TYPE,
      useBooleanState,
      recommendStorehouseOpportunityList,
      warehouseZoneCode,
      temporaryStorehouse,
      warehouseFoundationList: [],
      warehouseFoundationObj: {},
      // defaultGoodsQuality: [...this.goodsQualityList],
      loading: {
        remoteMethod: false,
      },
      options: [
        {
          value: '1',
          label: '默认规则',
        },
      ],
      rules: {
        allowAcceptAndPutaway: [{ required: true, message: '请选择', trigger: 'change' }],
        allowCrossDockingAndPutaway: [{ required: true, message: '请选择', trigger: 'change' }],
        autoPutawayStorehouseCode: [{ required: true, message: '请选择', trigger: 'change' }],
        recommendStorehouseOpportunity: [{ required: true, message: '请选择', trigger: 'change' }],
        recommendStorehouseRuleId: [{ required: true, message: '请选择', trigger: 'change' }],
        goodsQualityList: [{ required: true, message: '请选择', trigger: 'change' }],
        defaultGoodsQuality: [{ required: true, message: '请选择', trigger: 'change' }],
        allowOvercharge: [{ required: true, message: '请选择', trigger: 'change' }],
        overchargePercent: [
          {
            required: true,
            validator: validateOverchargeRatio,
            trigger: ['blur', 'change'],
          },
        ],
        allowContainerMixBatch: [{ required: true, message: '请选择', trigger: 'change' }],
        allowContainerMixGoods: [{ required: true, message: '请选择', trigger: 'change' }],
        temporaryStorehouseSlelct: [{ required: true, message: '请选择', trigger: 'change' }],
      },
    };
  },
  computed: {
    unlimited: {
      get() {
        if (this.formData.overchargePercent === null) {
          return true;
        }
        return false;
      },
      set() {
        if (this.formData.overchargePercent === null) {
          return true;
        }
        return false;
      },
    },
  },
  created() {
    this.temporaryStorehouse.forEach((item) => {
      this.warehouseFoundationObj[item.temporary] = [];
    });
  },
  methods: {
    validateForm() {
      return this.$refs.formData.validate();
    },
    allowCrossDockingAndPutawayChange(data) {
      if (!data) {
        this.formData.autoPutawayStorehouseCode = '';
      }
    },
    allowOverchargeChange(data) {
      if (!data) {
        this.formData.overchargePercent = '';
      }
    },
    // 根据可选货品质量选择结果筛选默认货品质量可选项
    goodsQualityChange(val) {
      // const list = this.goodsQualityList.filter((item) => val.includes(item.code));
      // this.defaultGoodsQuality = [...list];
      if (val.indexOf(this.formData.defaultGoodsQuality) < 0) {
        this.formData.defaultGoodsQuality = '';
      }
    },
    handleStorehouseCodeChange(code) {
      const chooseItem = this.warehouseFoundationList.find(
        (item) => item.storageLocationCode === code,
      );
      this.formData.autoPutawayStorehouseId = chooseItem.id;
    },
    handleAcceptStorehouseChange(code, temporaryItem) {
      const chooseItem = this.warehouseFoundationObj[temporaryItem.temporary].find(
        (item) => item.storageLocationCode === code,
      );
      this.formData.temporaryStorehouse[temporaryItem.value] = chooseItem.id;
    },
    handleRecommendStorehouseChange(id) {
      const chooseItem = this.options.find((item) => item.value === id);
      this.formData.recommendStorehouseRuleName = chooseItem.label;
    },
    // 查询库位
    async remoteMethod(query, temperatureLayer) {
      if (!this.warehouseCode) {
        this.$message({
          message: '请先选择仓库',
          type: 'warning',
        });
        return;
      }
      if (query !== '') {
        const params = {
          page: 1,
          size: 100,
        };
        const data = {
          storageLocationCode: query,
          warehouseCode: this.warehouseCode,
          statusCode: warehouseZoneCode.ENABLED,
          temperatureLayer,
        };

        const res = await warehouseStorehouseSearch(data, params);
        if (temperatureLayer) {
          this.warehouseFoundationObj[temperatureLayer] = res.records || [];
        } else {
          this.warehouseFoundationList = res.records || [];
        }
      } else if (temperatureLayer) {
        this.warehouseFoundationObj[temperatureLayer] = [];
      } else {
        this.warehouseFoundationList = [];
      }
    },
    unlimitedChange(data) {
      if (data) {
        this.formData.overchargePercent = null;
      } else {
        this.formData.overchargePercent = 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form ::v-deep .el-col {
  justify-content: left;
}
.task-storehouse-max {
  display: flex;
  .task-input {
    margin-right: 20px;
  }
}
</style>
