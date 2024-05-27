<template>
  <el-form
    ref="formData"
    :rules="rules"
    :inline="true"
    :model="formData"
  >
    <h4>拣货任务拆分：</h4>
    <el-row>
      <el-form-item
        label="任务分组方式:"
        prop="taskGroupType"
      >
        <el-checkbox-group
          v-model="formData.taskGroupType"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-checkbox
            v-for="item in taskGroupType"
            :key="item.value"
            :label="item.value"
            :disabled="item.notChange"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item
        label="单任务库位数上限:"
        prop="taskStorehouseMax"
      >
        <div class="task-storehouse-max">
          <el-input
            v-model.number="formData.taskStorehouseMax"
            class="task-input"
            :disabled="pageType === PAGE_TYPE.VIEW"
          />
          <el-checkbox
            v-model="formData.taskStorehouseMax"
            :true-label="99999999"
            :false-label="0"
            :disabled="pageType === PAGE_TYPE.VIEW"
          >
            不限
          </el-checkbox>
        </div>
      </el-form-item>
    </el-row>
    <h4>拣货任务处理：</h4>
    <el-row>
      <el-form-item
        label="任务分配方式:"
        prop="taskDistributionTypeEnum"
      >
        <el-radio-group
          v-model="formData.taskDistributionTypeEnum"
          :disabled="pageType === PAGE_TYPE.VIEW"
        >
          <el-radio
            v-for="item in taskDistributionTypeEnum"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <h4>操作步骤配置：</h4>
    <el-row>
      <el-col :span="4">
        <div>选择需要执行的步骤:</div>
      </el-col>

      <el-col
        :span="20"
        class="main-table-box"
      >
        <el-form-item
          prop="runSteps"
          class="runSteps"
        >
          <div class="inline-table main-table-header">
            <div class="condition">操作顺序号</div>
            <div class="condition">操作步骤名称</div>
            <div class="condition">是否启用</div>
          </div>
          <div class="inline-table">
            <div class="condition">1</div>
            <div class="condition">扫描拣货库位</div>
            <div class="condition">
              <el-checkbox
                v-model="formData.scanStorehouse"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                启用
              </el-checkbox>
            </div>
          </div>
          <div class="inline-table">
            <div class="condition">2</div>
            <div class="condition">扫描标签码</div>
            <div class="condition">
              <el-checkbox
                v-model="formData.scanFlag"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                启用
              </el-checkbox>
            </div>
          </div>
          <div class="inline-table">
            <div class="condition">3</div>
            <div class="condition">扫描拣货容器</div>
            <div class="condition">
              <el-checkbox
                v-model="formData.scanContainer"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                启用
              </el-checkbox>
            </div>
          </div>
          <div class="inline-table">
            <div class="condition">4</div>
            <div class="condition">录入拣货数量</div>
            <div class="condition">
              <el-checkbox
                v-model="formData.enteringGoodsNumber"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                启用
              </el-checkbox>
            </div>
          </div>
          <div class="inline-table">
            <div class="condition">5</div>
            <div class="condition">扫描暂存库位</div>
            <div class="condition">
              <el-checkbox
                v-model="formData.scanTemporaryStorehouse"
                :disabled="pageType === PAGE_TYPE.VIEW"
              >
                启用
              </el-checkbox>
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <h4>库存处理配置：</h4>
    <el-row>
      <el-form-item
        label="拣货下架固定暂存位:"
        prop="temporaryStorehouse"
      >
        <el-input
          v-model="formData.temporaryStorehouse"
          :disabled="pageType === PAGE_TYPE.VIEW"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import { taskDistributionTypeEnum, taskGroupType } from './constant';
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
  },
  data() {
    const validatorChoose = (rule, value, callback) => {
      if (
        !this.formData.scanStorehouse &&
        !this.formData.scanFlag &&
        !this.formData.scanContainer &&
        !this.formData.enteringGoodsNumber &&
        !this.formData.scanTemporaryStorehouse
      ) {
        callback(new Error('请至少选择一项'));
      } else {
        callback();
      }
    };
    return {
      PAGE_TYPE,
      taskDistributionTypeEnum,
      taskGroupType,
      rules: {
        taskGroupType: [{ required: true, message: '请选择', trigger: 'change' }],
        taskStorehouseMax: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
        taskDistributionTypeEnum: [{ required: true, message: '请选择', trigger: 'change' }],
        temporaryStorehouse: [{ required: true, message: '请输入', trigger: 'blur' }],
        runSteps: [{ validator: validatorChoose, trigger: 'change' }],
      },
    };
  },
  created() {
    if (!this.pageType) {
      this.formData.taskGroupType = [
        this.taskGroupType[0].value,
        this.taskGroupType[1].value,
        this.taskGroupType[2].value,
      ];
    }
  },
  methods: {
    validateForm() {
      return this.$refs.formData.validate();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-row ::v-deep .main-table-box {
  display: initial;
}
.task-storehouse-max {
  display: flex;
  .task-input {
    margin-right: 20px;
  }
}
.inline-table {
  width: 100%;
  display: flex;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  .condition {
    width: 20%;
    text-align: center;
  }
}
.error-message {
  color: #f56c6c;
}
.runSteps {
  width: 100%;
  ::v-deep .el-form-item__content {
    width: 100%;
  }
}
</style>
