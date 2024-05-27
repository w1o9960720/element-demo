<template>
  <div
    v-loading="loading.ruleDeliverFlowSearchById"
    class="page-container"
  >
    <el-form
      ref="form"
      :rules="rules"
      :inline="true"
      :model="form"
    >
      <div class="header">
        <h4>基础信息：</h4>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="流程编码:"
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
            label="流程描述:"
            prop="description"
          >
            <el-input
              v-model="form.description"
              :disabled="pageType === PAGE_TYPE.VIEW"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="header">
        <h4>作用范围：</h4>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="订单类型:"
            prop="orderType"
          >
            <el-select
              v-model="form.orderType"
              placeholder="请选择订单类型"
              :disabled="pageType === PAGE_TYPE.VIEW"
            >
              <el-option
                v-for="item in deliverTypeOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
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
                :key="item.warehouseCode"
                :label="item.warehouseName"
                :value="item.warehouseCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="货主:"
            prop="shippers.infos"
          >
            已选择<span class="special-color"
              >{{ form.shippers ? form.shippers.infos.length : 0 }} </span
            >个货主
            <el-button
              type="text"
              @click="handleOpen"
            >
              编辑
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="header">
        <h4>出库流程配置：</h4>
      </div>
      <el-row>
        <el-steps
          style="width: 100%"
          :space="200"
          :active="stepActive"
          finish-status="success"
        >
          <el-step
            v-for="(item, index) in outboundProcessStep"
            :key="item.uri"
            :title="item.name"
            @click="chegeFlowPath(item.uri, index)"
          />
        </el-steps>
      </el-row>
      <div class="switch-box">
        <order-appointment-audit
          v-show="nowFlowPath === flowPath.ORDER_APPROVAL_APPOINTMENT"
          ref="orderAppointmentAudit"
          :page-type="pageType"
          :form-data="form.configOrderAudit"
          :goods-quality-list="goodsQualityList"
        />
        <create-waves
          v-show="nowFlowPath === flowPath.CREATE_WAVES"
          ref="createWaves"
          :page-type="pageType"
          :warehouse-code="form.warehouseCode"
          v-model:form-data="form.configWavePicking"
        />
        <pinking-goods
          v-show="nowFlowPath === flowPath.PICKING"
          ref="pinkingGoods"
          :page-type="pageType"
          :form-data="form.configPickingGoods"
        />
        <sorting-goods
          v-if="nowFlowPath === flowPath.SORTING"
          ref="sortingGoods"
          :page-type="pageType"
          @changeConfigSorting="changeConfigSorting"
        />
        <review-again
          v-if="nowFlowPath === flowPath.REVIEW"
          ref="reviewAgain"
          :page-type="pageType"
          :form-data="form.configRecheck"
          @changeConfigRecheck="changeConfigRecheck"
        />
        <get-into-car
          v-if="nowFlowPath === flowPath.GET_INTO_CAR"
          :page-type="pageType"
          :form-data="form.configLoadUpCar"
        />
        <out-transport
          v-show="nowFlowPath === flowPath.TRANSPORT"
          ref="formDataLocal"
          :page-type="pageType"
          :form-data="form.configDispatching"
          :warehouse-code="form.warehouseCode"
        />
      </div>
      <el-form-item
        v-if="pageType !== PAGE_TYPE.VIEW"
        class="btn-boxs"
      >
        <el-button
          v-loading="loading.submit"
          type="primary"
          @click="onSubmit"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
    <select-dialog
      ref="dialogSelect"
      :warehouse-code="form.warehouseCode"
      :order-type="form.orderType"
      @onSuccess="handleIds"
    />
  </div>
</template>

<script>
import { isString } from 'lodash';
import { getDictionary } from '@/util/Dictionary';

import { getWarehouseList, temporaryStorehouse } from '@/api/wms/warehouse';
import {
  ruleDeliverFlowSearchById,
  ruleDeliverFlowAdd,
  ruleDeliverFlowChange,
  taskFlowSourceListOut,
} from '@/api/configure/outboundProcess';
import loadingMixin from '@/thales/loading';
import OrderAppointmentAudit from './components/OrderAppointmentAudit.vue';
import CreateWaves from './components/CreateWaves.vue';
import PinkingGoods from './components/PinkingGoods.vue';
import SortingGoods from './components/SortingGoods.vue';
import ReviewAgain from './components/ReviewAgain.vue';
import GetIntoCar from './components/GetIntoCar.vue';
import OutTransport from './components/OutTransport.vue';
import SelectDialog from '../in/components/SelectDialog.vue';
import { PAGE_TYPE, flowPath, outboundProcessStep } from '../constant';
import { chooseAll } from './components/constant';

export default {
  components: {
    OrderAppointmentAudit,
    CreateWaves,
    PinkingGoods,
    SortingGoods,
    ReviewAgain,
    GetIntoCar,
    OutTransport,
    SelectDialog,
  },
  mixins: [loadingMixin],
  data() {
    return {
      PAGE_TYPE,
      flowPath,
      outboundProcessStep,
      stepActive: 0,
      warehouseList: [],
      form: {
        shippers: {
          infos: [],
        },
        configOrderAudit: {
          goodsQuality: null,
          useTransportationInventory: false,
          autoFillFixLineCode: true,
        },
        configWavePicking: {
          automationPick: null,
          automationPush: null,
          taskStorehouseMax: null,
          validatorDueOutDay: true,
          stockSplitToOrderNode: 'TOTAL_PICK',
          useGatherGoodsPlace: null,
          intervalTimeGatherGoodsPlace: null,
          waveGroupType: ['SHIPPER'],
        },
        configPickingGoods: {
          taskGroupType: [],
        },
        configPartPick: {
          configSorting: [
            {
              autoSorting: false,
              crossDocking: chooseAll,
              multiOrderType: chooseAll,
              sorting: false,
              temperatureLayer: chooseAll,
            },
          ],
          needScanContainer: true,
        },
        configRecheck: [
          {
            checking: false,
            crossDocking: chooseAll,
            multiOrderType: chooseAll,
            temperatureLayer: chooseAll,
          },
        ],
        configGoodsCollection: {},
        configLoadUpCar: {
          autoLoad: '',
          taskFlows: [],
        },
        configDispatching: {
          forceShip: {},
          needSealLabel: {},
          returnStatus: 'DISABLED',
          returnTemporaryStorehouse: '',
        },
      },
      changeSortingData: [],
      changeRecheckData: [],
      nowFlowPath: flowPath.ORDER_APPROVAL_APPOINTMENT,
      page: 1,
      size: 999,
      loading: {
        ruleDeliverFlowSearchById: false,
        submit: false,
      },
      pageType: '',
      rules: {
        ruleCode: [{ required: true, message: '请输入流程编码', trigger: 'blur' }],
        description: [{ required: true, message: '请输入流程描述', trigger: 'blur' }],
        orderType: [{ required: true, message: '请选择订单类型', trigger: 'change' }],
        warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
        'shippers.infos': [{ required: true, message: '请选择货主', trigger: 'change' }],
      },
    };
  },
  computed: {
    deliverTypeOptions() {
      return getDictionary(this.$store.state.dictionary.dictionaryCodeEN.DELIVER_ORDER_TYPE_CODE);
    },
    goodsQualityList() {
      return getDictionary(this.$store.state.dictionary.dictionaryCodeEN.GOODS_QUALITY);
    },
  },
  mounted() {
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
      this.handleSelect(warehouseCode);
      this.warehouseList = dataList.records.filter((v) => v.warehouseCode === warehouseCode);
      if (this.pageType) {
        await this.ruleDeliverFlowSearchById();
      } else {
        this.commonData();
      }
    },
    commonData() {
      taskFlowSourceListOut({ orderType: 'DELIVER' }).then((res) => { 
        res.forEach((i) => {
          const item = i;
          item.taskFields =
            item.taskFields && isString(item.taskFields) ? JSON.parse(item.taskFields) : [];
        });
        const loadingData = res.filter((i) => i.flowNodeType === 'LOADING_NODE');
        const taskFlows = this.form.configLoadUpCar.taskFlows;
        const taskFlowsFn = loadingData.map((item) => {
          const obj = {
            ...item,
          };
          obj.flowId = obj.id;
          delete obj.id;
          return obj;
        });
        if (!taskFlows.length) {
          this.form.configLoadUpCar.taskFlows = taskFlowsFn;
        } else {
          // 之前初始化过数据的，保留之前的数据
          const newLoadingData = loadingData.map((item) => {
            let useItem = {};
            const findIndex = taskFlows.findIndex((itemIn) => itemIn.taskType === item.taskType);
            if (findIndex > -1) {
              useItem = taskFlows[findIndex];
            } else {
              useItem = item;
            }
            return useItem;
          });
          this.form.configLoadUpCar.taskFlows = newLoadingData;
        }
      });
    },
    setTaskFlow(res) {
      if (res.configLoadUpCar.taskFlows) {
        res.configLoadUpCar.taskFlows.forEach((i) => {
          const item = i;
          item.taskFields =
            item.taskFields && isString(item.taskFields) ? JSON.parse(item.taskFields) : [];
        });
      } else {
        res.configLoadUpCar.taskFlows = [];
      }
    },
    // 根据id获取
    async ruleDeliverFlowSearchById() {
      const res = await ruleDeliverFlowSearchById({ id: this.$route.query.id });
      await this.setTaskFlow(res);
      res.shippers = res.shippers || { infos: [] };
      res.configPartPick = res.configPartPick || {
        configSorting: [
          {
            autoSorting: false,
            crossDocking: chooseAll,
            multiOrderType: chooseAll,
            sorting: false,
            temperatureLayer: chooseAll,
          },
        ],
        needScanContainer: true,
      };
      const configWavePicking = {
        ...res.configWavePicking,
        automationPick: res.configWavePicking.automationPick || null,
        automationPush: res.configWavePicking.automationPush || null,
      };
      const configPickingGoods = {
        ...res.configPickingGoods,
        taskGroupType: res.configPickingGoods.taskGroupType || [],
      };
      this.form = {
        ...res,
        configWavePicking,
        configPickingGoods,
      };
      if (Array.isArray(this.form.configOrderAudit.goodsQuality)) {
        this.form.configOrderAudit.goodsQuality = this.form.configOrderAudit.goodsQuality[0];
      }
      if (Number(this.$route.query.num) === 2) {
        this.form.ruleCode = '';
        this.form.description = '';
        this.form.orderType = '';
        // this.form.warehouseCode = '';
        this.form.shippers.infos = [];
        this.form.id = '';
      }
      this.commonData();
    },
    // 改变出库流程配置
    chegeFlowPath(data, index) {
      this.stepActive = index;
      this.nowFlowPath = data;
      if (data === 'SORTING') {
        this.$nextTick(() => {
          this.$refs?.sortingGoods?.onOpen?.(
            this.form.configPartPick.configSorting,
            this.form.configPartPick.needScanContainer,
          );
        });
      }
      if (data === 'REVIEW') {
        this.$nextTick(() => {
          this.$refs?.reviewAgain?.onOpen?.(this.form.configRecheck);
        });
      }
    },
    async onSubmit() {
      await this.formValidation();
      const data = JSON.parse(JSON.stringify(this.form));
      data.warehouseName = this.warehouseName;
      if (!Array.isArray(data.configOrderAudit.goodsQuality)) {
        data.configOrderAudit.goodsQuality = [data.configOrderAudit.goodsQuality];
      }
      if (this.pageType && Number(this.$route.query.num) === 1) {
        this.ruleDeliverFlowChange(data);
      } else {
        this.ruleDeliverFlowAdd(data);
      }
    },
    // 进行表单验证
    async formValidation() {
      await Promise.all([
        this.$refs.form.validate(),
        this.$refs.orderAppointmentAudit.validateForm(),
        this.$refs.createWaves.validateForm(),
        this.$refs.pinkingGoods.validateForm(),
        this.$refs.formDataLocal.validateForm(),
      ]);
    },
    async ruleDeliverFlowChange(data) {
      await ruleDeliverFlowChange(data);
      this.$message.success('保存成功！');
      this.$router.go(-1);
    },
    async ruleDeliverFlowAdd(data) {
      await ruleDeliverFlowAdd(data);
      this.$message.success('保存成功！');
      this.$router.go(-1);
    },
    changeConfigSorting(data) {
      // this.form.configPartPick.configSorting = JSON.parse(JSON.stringify(data.data));
      this.form.configPartPick = JSON.parse(JSON.stringify(data));
    },
    changeConfigRecheck(data) {
      this.form.configRecheck = JSON.parse(JSON.stringify(data));
    },
    handleSelect(val) {
      this.form.configDispatching.returnTemporaryStorehouse = '';
      const chooseItem = this.warehouseList.find((i) => i.warehouseCode === val);
      this.form.warehouseId = chooseItem?.id;
      this.warehouseName = chooseItem?.warehouseName;
      temporaryStorehouse({
        warehouseCode: val,
        storehouseUsageType: 'DELIVER_TEMPORARY',
        isDefault: true,
      }).then((res) => {
        this.form.configPickingGoods.temporaryStorehouse =
          res.length > 0 ? res[0].storageLocationCode : '';
      });
    },

    handleOpen() {
      if (this.form.warehouseCode && this.form.orderType) {
        const customersInfo = this.form.shippers?.infos || [];
        this.$refs.dialogSelect.init(customersInfo, this.pageType === PAGE_TYPE.VIEW, 1);
      } else {
        this.$message({
          message: '请选择订单类型及仓库',
          type: 'warning',
        });
      }
    },
    handleIds(customerInfos) {
      this.form.shippers.infos = customerInfos;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  padding: 0 24px;
}
.header {
  padding: 15px 0;
}
::v-deep .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.time-interval {
  width: 50px;
}
.wash-box .wash-box-in {
  margin-bottom: 5px;
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
.switch-box {
  width: 100%;
  padding: 16px 24px;
  min-height: 500px;
  margin-top: 14px;
  box-shadow: 0 2px 7px 0 rgb(0 25 55 / 10%);
  border-radius: 10px;
  box-sizing: border-box;
}
.el-steps ::v-deep .el-step.is-horizontal:hover {
  cursor: pointer;
  .el-step__head {
    color: #37b19d;
    border-color: #37b19d;
  }
  .el-step__main {
    .el-step__title {
      color: #37b19d;
    }
  }
}
.el-steps ::v-deep {
  .el-step__head {
    width: 96%;
  }
  .el-step__icon.is-text {
    width: 32px;
    height: 32px;
  }
  .el-step.is-horizontal .el-step__line {
    top: 16px;
  }
  .el-step__head.is-process {
    border-color: #059e84;
  }
  .el-step__head.is-process .el-step__icon.is-text {
    color: #fff;
    background-color: #059e84;
  }
  .el-step__title.is-success {
    color: #606266;
  }
  .el-step {
    .el-step__main {
      position: absolute;
      left: 24px;
      top: 2px;
      height: 26px;
      line-height: 26px;
      background-color: #fff;
      padding: 0 10px 0 16px;
    }
    .el-step__title {
      line-height: 26px;
    }
  }
}
</style>
