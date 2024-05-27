<template>
  <div v-loading="loading.replenishmentRulesSearchById">
    <list-block>
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-position="right"
        label-width="150px"
      >
        <el-row style="margin-bottom: 1em">
          <el-col :span="8">
            <h4>基础信息</h4>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item
              label="规则编码:"
              prop="ruleCode"
              label-width="82px"
            >
              <el-input
                v-model="form.ruleCode"
                :disabled="pageType === PAGE_TYPE.VIEW"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="规则描述:"
              prop="description"
              label-width="82px"
            >
              <el-input
                v-model="form.description"
                :disabled="pageType === PAGE_TYPE.VIEW"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="仓库:"
              prop="warehouseCode"
              label-width="60px"
            >
              <el-select
                v-model="form.warehouseCode"
                placeholder="请选择"
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
          <el-col :span="6">
            <el-form-item
              label="货主:"
              prop="shipperIds"
              label-width="82px"
            >
              已选择<span class="special-color">{{ form.shipperIds.length || 0 }} </span>个货主
              <el-button
                type="text"
                @click="handleOpen"
              >
                编辑
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="日常补货"
            :name="DAILY_CPRF"
          >
            <list-block>
              <div class="header">
                <h4>调用规则：</h4>
              </div>
              <div>
                <el-form-item
                  label="分配规则:"
                  prop="dailyReplenishment.ruleStockAllocationId"
                >
                  <el-select
                    v-model="form.dailyReplenishment.ruleStockAllocationId"
                    placeholder="请选择"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                  >
                    <el-option
                      v-for="item in distributionRulesList"
                      :key="item.id"
                      :label="item.description"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="上架规则:"
                  prop="dailyReplenishment.ruleUpperId"
                >
                  <el-select
                    v-model="form.dailyReplenishment.ruleUpperId"
                    placeholder="请选择"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                  >
                    <el-option
                      v-for="item in ruleUpperList"
                      :key="item.id"
                      :label="item.description"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-checkbox
                  v-model="form.dailyReplenishment.autoUpperToRecommendLocation"
                  label="自动上架到推荐的库位"
                />
              </div>
              <div>
                <el-form-item
                  label="补货移库暂存位:"
                  prop="dailyReplenishment.stagingLocation.locationCode"
                >
                  <el-select
                    v-model="form.dailyReplenishment.stagingLocation.locationCode"
                    filterable
                    remote
                    :remote-method="remoteMethod"
                    placeholder="录入库位号，需要验证是否存在"
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
              </div>
              <div>
                <el-form-item
                  label="触发补货条件:"
                  prop="dailyReplenishment.triggerReplenishmentConditions"
                >
                  <el-select
                    v-model="form.dailyReplenishment.triggerReplenishmentConditions"
                    placeholder="请选择"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                  >
                    <el-option
                      v-for="(item, index) in REPLENISHMENT_CONDITION_ENUM"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="补货量基准:"
                  prop="dailyReplenishment.replenishmentBaseline"
                >
                  <el-select
                    v-model="form.dailyReplenishment.replenishmentBaseline"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in REPLENISHMENT_DATUM"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="header">
                <h4>任务拆分条件：</h4>
              </div>
              <div>
                <el-form-item
                  label="任务分组方式:"
                  prop="dailyReplenishment.groupType"
                >
                  <el-checkbox-group
                    v-model="form.dailyReplenishment.groupType"
                    placeholder="请选择"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                  >
                    <el-checkbox
                      v-for="item in taskGroupType"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item
                  label="单任务库位数上限:"
                  prop="dailyReplenishment.maxGroupSize"
                >
                  <div class="task-storehouse-max">
                    <el-input
                      v-model.number="form.dailyReplenishment.maxGroupSize"
                      class="task-input"
                      :disabled="pageType === PAGE_TYPE.VIEW"
                    />
                    <el-checkbox
                      v-model="form.dailyReplenishment.maxGroupSize"
                      :true-label="99999999"
                      :false-label="0"
                      :disabled="pageType === PAGE_TYPE.VIEW"
                    >
                      不限
                    </el-checkbox>
                  </div>
                </el-form-item>
              </div>
            </list-block>
          </el-tab-pane>
          <el-tab-pane
            label="紧急补货"
            :name="EMERGENCY_CPRF"
          >
            <div>
              <el-form-item
                label="分配规则:"
                prop="emergencyReplenishment.stockAllocationId"
              >
                <el-select
                  v-model="form.emergencyReplenishment.stockAllocationId"
                  placeholder="请选择"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                >
                  <el-option
                    v-for="item in distributionRulesList"
                    :key="item.id"
                    :label="item.description"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label="上架规则:"
                prop="emergencyReplenishment.ruleUpperId"
              >
                <el-select
                  v-model="form.emergencyReplenishment.ruleUpperId"
                  placeholder="请选择"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                >
                  <el-option
                    v-for="item in ruleUpperList"
                    :key="item.id"
                    :label="item.description"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-checkbox
                v-model="form.emergencyReplenishment.autoUpperToRecommendLocation"
                label="自动上架到推荐的库位"
              />
            </div>
            <div>
              <el-form-item
                label="补货移库暂存位:"
                prop="emergencyReplenishment.stagingLocation.locationCode"
              >
                <el-select
                  v-model="form.emergencyReplenishment.stagingLocation.locationCode"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                  placeholder="录入库位号，需要验证是否存在"
                  :loading="loading.remoteMethod"
                  @change="handleUrgentStorehouseCodeChange"
                >
                  <el-option
                    v-for="item in warehouseFoundationList"
                    :key="item.storageLocationCode"
                    :label="item.storageLocationCode"
                    :value="item.storageLocationCode"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="header">
              <h4>任务拆分条件：</h4>
            </div>
            <div>
              <el-form-item
                label="任务分组方式:"
                prop="emergencyReplenishment.groupType"
              >
                <el-checkbox-group
                  v-model="form.emergencyReplenishment.groupType"
                  placeholder="请选择"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                >
                  <el-checkbox
                    v-for="item in taskGroupType"
                    :key="item.value"
                    :label="item.value"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                label="单任务库位数上限:"
                prop="emergencyReplenishment.maxGroupSize"
              >
                <div class="task-storehouse-max">
                  <el-input
                    v-model.number="form.emergencyReplenishment.maxGroupSize"
                    class="task-input"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                  />
                  <el-checkbox
                    v-model="form.emergencyReplenishment.maxGroupSize"
                    :true-label="99999999"
                    :false-label="0"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                  >
                    不限
                  </el-checkbox>
                </div>
              </el-form-item>
            </div>
          </el-tab-pane>
        </el-tabs>

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
      </el-form>
    </list-block>
    <select-dialog
      ref="dialogSelect"
      :warehouse-code="form.warehouseCode"
      @onSuccess="handleIds"
    />
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';

import { getWarehouseList } from '@/api/wms/warehouse';
import {
  replenishmentRulesAdd,
  replenishmentRulesSearchById,
  replenishmentRulesChange,
} from '@/api/configure/configureReplenishmentRule';
import { ruleUpperPage } from '@/api/configure/configureRuleUpper';
import loadingMixin from '@/thales/loading';
import { distributionRulesSearch } from '@/api/configure/configureDistributionRule';
import { warehouseStorehouseSearch } from '@/api/addLimit';
import {
  REPLENISHMENT_CONDITION_ENUM,
  REPLENISHMENT_DATUM,
  IMPLEMENTATION_MODE,
  AutomaticEng,
  PAGE_TYPE,
  warehouseZoneCode,
  taskGroupType,
} from './constant';
import SelectDialog from './components/SelectDialog.vue';

const DAILY_CPRF = 'DAILY_CPRF'; // 日常补货
const EMERGENCY_CPRF = 'EMERGENCY_CPRF'; // 紧急补货
export default {
  components: {
    ListBlock,
    SelectDialog,
  },
  mixins: [loadingMixin],
  data() {
    return {
      REPLENISHMENT_CONDITION_ENUM,
      REPLENISHMENT_DATUM,
      IMPLEMENTATION_MODE,
      AutomaticEng,
      taskGroupType,
      PAGE_TYPE,
      DAILY_CPRF,
      EMERGENCY_CPRF,
      loading: {
        replenishmentRulesSearchById: false,
        remoteMethod: false,
      },
      form: {
        shipperIds: [],
        dailyReplenishment: {
          ruleStockAllocationId: '',
          ruleUpperId: '',
          autoUpperToRecommendLocation: false,
          stagingLocation: {},
          triggerReplenishmentConditions: '',
          replenishmentBaseline: '',
          groupType: [],
          maxGroupSize: null,
        },
        emergencyReplenishment: {
          stockAllocationId: '',
          ruleUpperId: '',
          autoUpperToRecommendLocation: false,
          stagingLocation: {},
          groupType: [],
          maxGroupSize: null,
        },
      },
      timeFrame: ['08:00', '12:00'],
      warehouseFoundationList: [],
      timeInterval: '',
      pageType: '',
      timing: '08:00',
      mode: true,
      tableData: [],
      warehouseList: [],
      distributionRulesList: [],
      ruleUpperList: [],
      page: 1,
      size: 999,
      activeName: DAILY_CPRF,
      rules: {
        ruleCode: [{ required: true, message: '请输入规则编码', trigger: 'blur' }],
        description: [{ required: true, message: '请输入规则描述', trigger: 'blur' }],
        'dailyReplenishment.ruleStockAllocationId': [
          { required: true, message: '请选择分配规则', trigger: 'change' },
        ],
        'dailyReplenishment.ruleUpperId': [
          { required: true, message: '请选择上架规则', trigger: 'change' },
        ],
        'dailyReplenishment.stagingLocation.locationCode': [
          { required: true, message: '请选择补货移库暂存位', trigger: 'change' },
        ],
        'dailyReplenishment.triggerReplenishmentConditions': [
          { required: true, message: '请选择触发补货条件', trigger: 'change' },
        ],
        'dailyReplenishment.replenishmentBaseline': [
          { required: true, message: '请选择补货量基准', trigger: 'change' },
        ],
        'dailyReplenishment.groupType': [
          { required: true, message: '请选择分组方式', trigger: 'change' },
        ],
        'dailyReplenishment.maxGroupSize': [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
        ],
        shipperIds: [{ required: true, message: '请选择货主', trigger: 'change' }],
        'emergencyReplenishment.stockAllocationId': [
          { required: true, message: '请选择分配规则', trigger: 'change' },
        ],
        'emergencyReplenishment.ruleUpperId': [
          { required: true, message: '请选择上架规则', trigger: 'change' },
        ],
        'emergencyReplenishment.stagingLocation.locationCode': [
          { required: true, message: '请选择补货移库暂存位', trigger: 'change' },
        ],
        'emergencyReplenishment.groupType': [
          { required: true, message: '请选择分组方式', trigger: 'change' },
        ],
        'emergencyReplenishment.maxGroupSize': [
          { required: true, message: '请输入', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化获取数据
    async init() {
      this.pageType = this.$route.query.type;

      // 获取分配规则
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
        await this.replenishmentRulesSearchById();
      }
    },
    // 获取分配规则及补货规则
    async getRuleList(warehouseCode) {
      const data = {
        page: this.page,
        size: this.size,
      };
      const list = await distributionRulesSearch({ warehouseCode }, data);
      const result = await ruleUpperPage({ warehouseCode }, data);
      this.ruleUpperList = result.records || [];
      this.distributionRulesList = list.records;
    },
    // 根据id获取信息
    async replenishmentRulesSearchById() {
      const res = await replenishmentRulesSearchById({ id: this.$route.query.id });
      this.form = res;
      this.getRuleList(res.warehouseCode);
    },
    // 仓库更改
    warehouseChange(warehouseCode) {
      const chooseWarehouse = this.warehouseList.find(
        (item) => item.warehouseCode === warehouseCode,
      );
      this.form.warehouseId = chooseWarehouse.id;
      this.form.warehouseName = chooseWarehouse.warehouseName;
      this.getRuleList(warehouseCode);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = {
            ...this.form,
          };
          if (this.pageType) {
            this.replenishmentRulesChange(data);
            return true;
          }
          this.replenishmentRulesAdd(data);
        } else {
          this.$message({ type: 'warning', message: '请完整填写日常及紧急补货内容!' });
          return false;
        }
        return true;
      });
    },
    async replenishmentRulesChange(data) {
      await replenishmentRulesChange(data);
      this.$message({
        message: '保存成功！',
        type: 'success',
      });
      this.$router.go(-1);
    },
    async replenishmentRulesAdd(data) {
      await replenishmentRulesAdd(data);
      this.$message({
        message: '操作成功！',
        type: 'success',
      });
      this.$router.go(-1);
    },
    // 执行方式判断
    changeType(row) {
      if (row.intervalMinutes) {
        return IMPLEMENTATION_MODE.INTERVAL_EXECUTION;
      }
      return IMPLEMENTATION_MODE.REGULAR_EXECUTION;
    },
    // 执行时间
    changeTime(row) {
      if (row.intervalMinutes) {
        return `每天${row.startTime}~${row.endTime},间隔${row.intervalMinutes}分钟执行一次`;
      }
      return `每天${row.time},定时执行一次`;
    },
    // 删除执行任务计划
    deleteRule(row) {
      if (row.intervalMinutes) {
        this.tableData = this.tableData.filter((item) => item !== row);
        this.form.replenishmentInvokePlan.intervalPerform =
          this.form.replenishmentInvokePlan.intervalPerform.filter((item) => item !== row);
      } else {
        this.tableData = this.tableData.filter((item) => item !== row);
        this.form.replenishmentInvokePlan.regularPerform =
          this.form.replenishmentInvokePlan.regularPerform.filter((item) => item !== row);
      }
    },
    // 增加补货执行计划
    addTableData() {
      if (this.mode) {
        if (!this.timeFrame || !this.timeInterval) {
          this.$message({
            message: '请完整填写时间及间隔',
            type: 'warning',
          });
          return;
        }
        const data = {
          startTime: this.timeFrame[0],
          endTime: this.timeFrame[1],
          intervalMinutes: this.timeInterval,
        };
        this.form.replenishmentInvokePlan.intervalPerform.push(data);
        this.tableData.push(data);
      } else {
        if (!this.timing) {
          this.$message({
            message: '请完整填写执行时间',
            type: 'warning',
          });
          return;
        }
        const data = {
          time: this.timing,
        };
        this.form.replenishmentInvokePlan.regularPerform.push(data);
        this.tableData.push(data);
      }
    },
    handleOpen() {
      if (this.form.warehouseCode) {
        const shipperIdsInfo = this.form.shipperIds || [];
        this.$refs.dialogSelect.init(shipperIdsInfo, this.pageType === PAGE_TYPE.VIEW);
      } else {
        this.$message({
          message: '请选择仓库',
          type: 'warning',
        });
      }
    },
    handleIds(shipperIdsInfos) {
      this.form.shipperIds = shipperIdsInfos;
    },
    handleStorehouseCodeChange(code) {
      const chooseItem = this.warehouseFoundationList.find(
        (item) => item.storageLocationCode === code,
      );
      this.form.dailyReplenishment.stagingLocation.locationId = chooseItem.id;
    },
    handleUrgentStorehouseCodeChange(code) {
      const chooseItem = this.warehouseFoundationList.find(
        (item) => item.storageLocationCode === code,
      );
      this.form.emergencyReplenishment.stagingLocation.locationId = chooseItem.id;
    },
    // 查询库位
    async remoteMethod(query) {
      if (!this.form.warehouseCode) {
        this.$message({
          message: '请先选择仓库',
          type: 'warning',
        });
        return;
      }
      if (query !== '') {
        const params = {
          page: 1,
          size: 30,
        };
        const data = {
          storageLocationCode: query,
          warehouseCode: this.form.warehouseCode,
          statusCode: warehouseZoneCode.ENABLED,
        };

        const res = await warehouseStorehouseSearch(data, params);
        this.warehouseFoundationList = res.records || [];
      } else {
        this.warehouseFoundationList = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 15px 0;
}
.time-interval {
  width: 50px;
}
.wash-box .wash-box-in {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  ::v-deep .el-input {
    width: 120px;
  }
}
.btn-boxs {
  margin-top: 30px;
}
.explain {
  color: #f59a23;
}
.special-color {
  color: #ff0000;
  ::v-deep .el-checkbox__label {
    color: #ff0000;
  }
}
.task-storehouse-max {
  display: flex;
  .task-input {
    margin-right: 20px;
  }
}
</style>
