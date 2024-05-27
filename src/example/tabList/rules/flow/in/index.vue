<template>
  <div
    v-loading="loading.warehousingProcessDetail"
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
                v-for="item in IN_ORDER_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
                v-for="item in warehouseList"
                :key="item.id"
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
            已选择<span class="special-color">{{ form.shippers.infos.length || 0 }} </span>个货主
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
        <h4>入库流程配置：</h4>
      </div>
      <el-row>
        <el-steps
          style="width: 100%"
          :space="200"
          :active="stepActive"
          finish-status="success"
        >
          <el-step
            v-for="(item, index) in warehousingStep"
            :key="index"
            :title="item.name"
            @click="chegeFlowPath(item.uri, index)"
          />
        </el-steps>
      </el-row>
      <div class="switch-box">
        <arrival-registration
          v-show="nowFlowPath === warehousingFlowPath.ARRIVAL_REGISTRATION"
          ref="arrivalRegistration"
          :page-type="pageType"
          :form-data="form.configCheckIn"
        />
        <check-and-accept
          v-show="nowFlowPath === warehousingFlowPath.CHECK_AND_ACCEPT"
          ref="checkAndAccept"
          :form-data="form.configAccept"
          :warehouse-code="warehouseCode"
          :goods-quality-list="goodsQualityList"
          :page-type="pageType"
        />
        <grounding
          v-show="nowFlowPath === warehousingFlowPath.GROUNDING"
          ref="grounding"
          :form-data="form.configPutaway"
          :page-type="pageType"
        />
      </div>
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
import { getWarehouseList, temporaryStorehousein } from '@/api/wms/warehouse';
import {
  searchShipperList,
  warehousingProcessUpdate,
  warehousingProcessDetail,
  taskFlowSourceList,
} from '@/api/configure/warehousingProcess';
import loadingMixin from '@/thales/loading';
import ArrivalRegistration from './components/ArrivalRegistration.vue';
import CheckAndAccept from './components/CheckAndAccept.vue';
import Grounding from './components/Grounding.vue';
import SelectDialog from './components/SelectDialog.vue';
import {
  recommendStorehouseOpportunityList,
  temporaryStorehouse as temporaryOpeions,
} from './components/constant';
import { PAGE_TYPE, warehousingFlowPath, IN_ORDER_TYPE, warehousingStep } from '../constant';

export default {
  components: {
    ArrivalRegistration,
    CheckAndAccept,
    Grounding,
    SelectDialog,
  },
  mixins: [loadingMixin],
  data() {
    return {
      PAGE_TYPE,
      warehousingFlowPath,
      warehousingStep,
      recommendStorehouseOpportunityList,
      IN_ORDER_TYPE,
      temporaryOpeions,
      stepActive: 0,
      warehouseList: [],
      warehouseCode: '',
      shipperList: [],
      warehouseItem: {},
      form: {
        orderType: undefined,
        configAudit: {
          isAudit: false,
        },
        configCheckIn: {
          isCheckIn: true,
          isAssignDock: false,
          taskFlows: [],
        },
        configAccept: {
          allowAcceptAndPutaway: true,
          allowCrossDockingAndPutaway: true,
          autoPutawayStorehouseCode: '',
          recommendStorehouseOpportunity: recommendStorehouseOpportunityList[0].value,
          recommendStorehouseRuleId: '',
          goodsQualityList: [],
          defaultGoodsQuality: '',
          allowOvercharge: true,
          overchargePercent: null,
          allowContainerMixBatch: true,
          allowContainerMixGoods: true,
          enableGoodsTagCode: null,
          validateGoodsTagCode: null,
          validateVeneerNum: false,
          taskFlows: [],
        },
        // configMove: {
        //   isMove: false,

        // },
        configPutaway: {
          isConfirmPutawayAmount: false,
          isScanPutawayContainer: false,
          isEntireOrderNotify: true,
          taskFlows: [],
        },
        shippers: {
          infos: [],
        },
      },
      nowFlowPath: warehousingFlowPath.ARRIVAL_REGISTRATION,
      page: 1,
      size: 999,
      loading: {
        warehousingProcessDetail: false,
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
    goodsQualityList() {
      const arr = getDictionary(this.$store.state.dictionary.dictionaryCodeEN.GOODS_QUALITY);
      const {
        configAccept,
        configAccept: { defaultGoodsQuality, goodsQualityList = [] },
      } = this.form;
      if (!goodsQualityList.length) {
        configAccept.goodsQualityList = arr.length ? [arr?.[0]?.code] : [];
      }
      if (!defaultGoodsQuality) {
        configAccept.defaultGoodsQuality = arr?.[0]?.code;
      }
      return arr;
    },
  },
  created() {
    const temporaryStorehouse = {};
    this.temporaryOpeions.forEach((item) => {
      temporaryStorehouse[item.value] = null;
      temporaryStorehouse[item.code] = null;
    });
    this.form.configAccept.temporaryStorehouse = temporaryStorehouse;
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
      this.handleWarehouseChange(warehouseCode);
      if (this.pageType) {
        await this.warehousingProcessDetail();
      } else {
        this.commonData();
      }
    },
    handleOpen() {
      if (this.form.warehouseCode && this.form.orderType) {
        const customersInfo = this.form.shippers?.infos || [];
        this.$refs.dialogSelect.init(customersInfo, this.pageType === PAGE_TYPE.VIEW, 2);
      } else {
        this.$message({
          message: '请选择订单类型及仓库',
          type: 'warning',
        });
      }
    },
    // 根据仓库获取货主下拉
    async handleWarehouseChange(code) {
      const data = {
        warehouseCode: code,
      };
      const chooseItem = this.warehouseList.find((item) => item.warehouseCode === code);
      this.form.warehouseId = chooseItem?.id;
      this.warehouseName = chooseItem?.warehouseName;
      this.warehouseCode = code;
      this.shipperList = await searchShipperList(data);
      const {
        configAccept,
        configAccept: { temporaryStorehouse },
      } = this.form;
      this.temporaryOpeions.forEach((item) => {
        // chooseItem.temperatureLayer.forEach((val) => {
        // if (val.temperatureLayerCode === item.temporary) {
        // 查询当前仓库温层下的入库暂存位
        temporaryStorehousein({
          warehouseCode: code,
          storehouseUsageType: 'RECEIPT_TEMPORARY',
          temperatureLayer: item.temporary,
          isDefault: true,
        }).then((res) => {
          temporaryStorehouse[item.code] = res?.[0]?.storageLocationCode;
          temporaryStorehouse[item.value] = res?.[0]?.id;
        });
        // }
        // });
      });
      // 查询当前仓库温层下的越库暂存位
      temporaryStorehousein({
        warehouseCode: code,
        storehouseUsageType: 'OVER_WAREHOUSE_TEMPORARY',
        isDefault: true,
      }).then((res) => {
        configAccept.autoPutawayStorehouseCode = res?.[0]?.storageLocationCode;
        configAccept.autoPutawayStorehouseId = res?.[0]?.id;
      });
    },
    // 货主改变
    handleCustomerChange(id) {
      const chooseItem = this.shipperList.find((item) => item.id === id);
      this.form.shipperName = chooseItem.shipperName;
    },
    initTaskFlows(source, code, res) {
      if (!source?.taskFlows?.length) {
        source.taskFlows = res
          .filter((i) => i.flowNodeType === code)
          .map((ele) => {
            const { id, ...rest } = ele;
            return {
              ...rest,
              flowId: ele.flowId || id,
            };
          });
      }
    },
    commonData() {
      taskFlowSourceList({ orderType: 'STORE' }).then((res) => {
        res.forEach((i) => {
          const item = i;
          item.taskFields =
            item.taskFields && isString(item.taskFields) ? JSON.parse(item.taskFields) : [];
        });
        const { configCheckIn, configAccept, configPutaway } = this.form;
        this.initTaskFlows(configCheckIn, 'ARRIVAL_REGISTRATION_NODE', res);
        this.initTaskFlows(configAccept, 'ACCEPTANCE_NODE', res);
        this.initTaskFlows(configPutaway, 'UPPER_SHELF_NODE', res);
      });
    },
    setTaskFlows(taskFlows) {
      if (taskFlows) {
        taskFlows.forEach((i) => {
          const item = i;
          item.taskFields =
            item.taskFields && isString(item.taskFields) ? JSON.parse(item.taskFields) : [];
        });
      }
    },
    common(res) {
      const {
        configCheckIn: { taskFlows },
        configAccept: { taskFlows: taskFlows2 },
        configPutaway: { taskFlows: taskFlows3 },
      } = res;
      this.setTaskFlows(taskFlows);
      this.setTaskFlows(taskFlows2);
      this.setTaskFlows(taskFlows3);
    },
    // 根据id获取
    async warehousingProcessDetail() {
      const { id, num } = this.$route.query;
      const res = await warehousingProcessDetail({ id });
      this.common(res);
      const temporaryStorehouse = {};
      this.temporaryOpeions.forEach((item) => {
        temporaryStorehouse[item.value] =
          res.configAccept.temporaryStorehouse?.[item.value] || null;
        temporaryStorehouse[item.code] = res.configAccept.temporaryStorehouse?.[item.code] || null;
      });

      this.form = {
        ...res,
        configAccept: {
          ...res.configAccept,
          temporaryStorehouse,
        },
        configAudit: {
          isAudit: false,
        },
      };
      this.form.shippers = res?.shippers || { infos: [] };
      this.commonData();
      if (+num === 2) {
        this.form.ruleCode = '';
        this.form.description = '';
        this.form.orderType = '';
        // this.form.warehouseCode = '';
        this.form.shippers.infos = [];
        this.form.id = '';
      }
    },
    // 改变出库流程配置
    chegeFlowPath(data, index) {
      this.nowFlowPath = data;
      this.stepActive = index;
    },
    async onSubmit() {
      let flag = true;
      await this.formValidation();
      if (this.form.configCheckIn.isCheckIn) {
        flag = this.form.configCheckIn.taskFlows.some((i) => i.isEnabled && i.isBlockNextTask);
      } else {
        this.form.configCheckIn.taskFlows = [];
      }
      const data = {
        ...this.form,
        warehouseName: this.warehouseName,
      };
      if (flag) {
        await warehousingProcessUpdate(data);
        this.$message.success('保存成功！');
        this.$router.go(-1);
      } else {
        this.$message.warning(
          '启用到货登记节点后，至少要有一个任务启用且设置为阻塞任务生成才能保存该流程配置!',
        );
      }
    },
    // 进行表单验证
    async formValidation() {
      await Promise.all([
        this.$refs.form.validate(),
        this.$refs.arrivalRegistration.validateForm(),
        this.$refs.checkAndAccept.validateForm(),
        this.$refs.grounding.validateForm(),
      ]);
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
  min-height: 500px;
  margin-top: 14px;
  box-shadow: 0 2px 7px 0 rgb(0 25 55 / 10%);
  border-radius: 10px;
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
