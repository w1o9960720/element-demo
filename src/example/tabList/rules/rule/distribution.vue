<template>
  <div v-loading="loading.distributionRulesSearchById">
    <list-block>
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
      >
        <el-row style="margin-bottom: 1em">
          <el-col :span="8">
            <h4>基础信息</h4>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="规则编码:"
              prop="ruleCode"
            >
              <el-input
                v-model="form.ruleCode"
                :disabled="pageType === PAGE_TYPE.VIEW"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="规则描述:"
              prop="description"
            >
              <el-input
                v-model="form.description"
                :disabled="pageType === PAGE_TYPE.VIEW"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="仓库:"
              prop="warehouseCode"
            >
              <el-select
                v-model="form.warehouseCode"
                placeholder="请选择仓库"
                disabled
              >
                <el-option
                  v-for="(item, index) in warehouseList"
                  :key="index"
                  :label="item.warehouseName"
                  :value="item.warehouseCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <h4>规则明细</h4>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-button
              v-if="!form.details || form.details.length === 0"
              class="form-btn"
              type="text"
              size="small"
              :disabled="pageType === PAGE_TYPE.VIEW"
              @click="addRows"
            >
              添加
            </el-button>

            <el-table
              :key="itemKey"
              :data="form.details"
            >
              <el-table-column
                type="index"
                label="#"
                fixed
                width="50"
              />
              <el-table-column
                label="前置条件"
                show-overflow-tooltip
              >
                <template v-slot:default="scope">
                  <span>{{ changePreCondition(scope.row.preCondition) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="限定库位范围"
                show-overflow-tooltip
                width="200"
              >
                <template v-slot:default="scope">
                  <span>{{ changeStockScope[scope.row.recommendRuleType] }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="库存周转规则"
                show-overflow-tooltip
                width="250"
              >
                <template v-slot:default="scope">
                  <span>{{ changeTurnoverRule(scope.row.turnoverRule) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="自定义优先级"
                width="130"
              >
                <template v-slot:default="scope">
                  <span>{{ changeCustomizeRule(scope.row.customizeRule) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                style="position: relative"
                label="操作"
                align="center"
                fixed="right"
                width="300"
              >
                <template v-slot:default="scope">
                  <el-button
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="editCollocation(scope.$index, scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="addRows(scope.$index + 1)"
                  >
                    添加
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="deleteRuleStockAllocationDetails(scope.row)"
                  >
                    删除
                  </el-button>
                  <el-button
                    v-if="scope.$index + 1 !== form.details.length"
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="moveDown(scope.$index)"
                  >
                    下移
                  </el-button>
                  <el-button
                    v-if="scope.$index !== 0"
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="moveUpward(scope.$index)"
                  >
                    上移
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col
            :span="24"
            class="save-btn"
          >
            <el-form-item
              v-if="pageType !== PAGE_TYPE.VIEW"
              class="btn-boxs"
            >
              <el-button
                type="primary"
                @click="onSubmit"
              >
                保存
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </list-block>
    <allocation-configuration
      ref="allocationConfiguration"
      :rule-batch="ruleBatch"
      @addRuleDetails="getRuleDetails"
    />
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';
import { getWarehouseList } from '@/api/wms/warehouse';
import {
  distributionRulesSearchById,
  distributionRulesAdd,
  distributionRulesChange,
} from '@/api/configure/configureDistributionRule';
import { ruleBatchSearch } from '@/api/addLimit';
import loadingMixin from '@/thales/loading';
import { getDictionary } from '@/util/Dictionary';
import AllocationConfiguration from './components/AllocationConfiguration.vue';
import { PAGE_TYPE, ThermosphereCN, DELIVER_TYPE_ENUM } from './constant';
import { sortRulesCN, customizeRuleCN } from './components/constant';

export default {
  components: {
    ListBlock,
    AllocationConfiguration,
  },
  mixins: [loadingMixin],
  data() {
    return {
      loading: {
        distributionRulesSearchById: false,
      },
      PAGE_TYPE,
      DELIVER_TYPE_ENUM,
      form: {
        details: [],
      },
      warehouseList: [],
      ruleBatch: [],
      itemKey: '',
      rowIndex: 0,
      page: 1,
      size: 999,
      isEdit: false,
      rules: {
        ruleCode: [{ required: true, message: '请输入规则编码', trigger: 'blur' }],
        description: [{ required: true, message: '请输入规则描述', trigger: 'blur' }],
        warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
      },
      changeStockScope: {
        PICKING_LOCATION: '所有拣货区',
        STORAGE_LOCATION: '所有备货区',
        PICKING_STORAGE_LOCATION: '所有拣选区和备货区',
        CUSTOM_LOCATION: '自定义库位范围',
      },
    };
  },
  computed: {
    goodsQualityList() {
      return getDictionary(this.$store.state.dictionary.dictionaryCodeEN.GOODS_QUALITY);
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化获取数据
    async init() {
      this.pageType = this.$route.query.type;

      // 获取仓库下拉列表
      const data = {
        page: this.page,
        size: this.size,
      };
      const {
        accountInfo: {
          ext: { warehouseCode },
        },
      } = this.$store.state.user;
      this.form.warehouseCode = warehouseCode;
      const dataList = await getWarehouseList({}, data);
      this.warehouseList = dataList.records.filter((v) => v.warehouseCode === warehouseCode);
      this.warehouseChange(warehouseCode);
      if (this.pageType) {
        await this.distributionRulesSearchById();
      }
    },
    // 根据id查询分配规则
    async distributionRulesSearchById() {
      const res = await distributionRulesSearchById({ id: this.$route.query.id });
      this.form = res;
      this.form.details = res.ruleStockAllocationDetails;
      this.getRuleBatch();
      delete this.form.ruleStockAllocationDetails;
      this.itemKey = Math.random();
    },
    // 编辑配置
    editCollocation(index = 1, row) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.allocationConfiguration.onOpen(row, this.form.warehouseCode);
          this.isEdit = true;
          this.rowIndex = index;
        } else {
          return false;
        }
        return true;
      });
    },
    // 前置条件显示转换
    changePreCondition(preCondition) {
      if (
        preCondition &&
        preCondition.temperatureLayer &&
        preCondition.quality &&
        preCondition.bizType
      ) {
        const temperatureLayerNameList = [];
        const qualityNameList = [];
        const deliverTypeList = [];
        preCondition.temperatureLayer.forEach((item) => {
          temperatureLayerNameList.push(ThermosphereCN[item]);
        });
        preCondition.quality.forEach((item) => {
          qualityNameList.push(this.goodsQualityList.find((it) => it.code === item).name);
        });
        preCondition.bizType.forEach((item) => {
          deliverTypeList.push(DELIVER_TYPE_ENUM[item]);
        });
        return `温层:${temperatureLayerNameList.join('/')}；货品质量：${qualityNameList.join(
          '/',
        )}；单据类型：${deliverTypeList.join('/')}`;
      }
      return '';
    },

    // 库存周转规则转换
    changeTurnoverRule(turnoverRule) {
      const turnoverRuleNameList = [];
      turnoverRule.forEach((item) => {
        const turnoverName = `${this.getRuleBatchName(item.fieldCode)}:${sortRulesCN[item.rule]}`;
        turnoverRuleNameList.push(turnoverName);
      });
      return turnoverRuleNameList.join(';');
    },
    // 根据批属性code返回对应批属性名
    getRuleBatchName(fieldCode) {
      if (this.ruleBatch.length > 0) {
        const releBatchRow = this.ruleBatch.find((item) => item.fieldCode === fieldCode);
        return releBatchRow.fieldName;
      }
      return '';
    },
    async getRuleBatch() {
      // 获取批属性规则
      const ruleBatchList = await ruleBatchSearch({ warehouseCode: this.form.warehouseCode });
      this.ruleBatch = ruleBatchList || [];
    },
    // 更改仓库
    warehouseChange(code) {
      const chooseWarehouse = this.warehouseList.find((item) => item.warehouseCode === code);
      this.form.warehouseId = chooseWarehouse.id;
      this.form.warehouseName = chooseWarehouse.warehouseName;
      this.form.tenantId = chooseWarehouse.tenantId;
      this.form.tenantName = chooseWarehouse.tenantName;
      this.getRuleBatch();
    },
    // 转换自定义优先级
    changeCustomizeRule(customizeRule) {
      return customizeRuleCN[customizeRule];
    },
    // 删除明细
    deleteRuleStockAllocationDetails(row) {
      this.form.details = this.form.details.filter((item) => item !== row);
      this.itemKey = Math.random();
    },
    // 上移规则明细
    moveUpward(index) {
      const upData = this.form.details[index - 1];
      this.form.details.splice(index - 1, 1);
      this.form.details.splice(index, 0, upData);
    },
    // 下移规则
    moveDown(index) {
      const downData = this.form.details[index + 1];
      this.form.details.splice(index + 1, 1);
      this.form.details.splice(index, 0, downData);
    },
    getRuleDetails(data) {
      if (this.isEdit) {
        this.form.details.splice(this.rowIndex, 1, data);
        this.isEdit = false;
      } else {
        this.form.details.splice(this.rowIndex, 0, data);
      }
    },
    // 添加行
    addRows(index = 1) {
      this.rowIndex = index;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.allocationConfiguration.onOpen('', this.form.warehouseCode);
        } else {
          return false;
        }
        return true;
      });
    },
    onSubmit() {
      this.form.details.map((item, index) => {
        const newItem = item;
        newItem.sorts = index + 1;
        return newItem;
      });
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            ...this.form,
          };
          if (this.pageType) {
            this.distributionRulesChange(data);
            return true;
          }
          this.distributionRulesAdd(data);
        } else {
          return false;
        }
        return true;
      });
    },
    async distributionRulesChange(data) {
      await distributionRulesChange(data);
      this.$message.success('保存成功！');
      this.$router.go(-1);
    },
    async distributionRulesAdd(data) {
      await distributionRulesAdd(data);
      this.$message.success('保存成功！');
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 15px 0;
}
.form-btn {
  position: absolute;
  z-index: 100;
  top: 30%;
  right: 50px;
}
.save-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
