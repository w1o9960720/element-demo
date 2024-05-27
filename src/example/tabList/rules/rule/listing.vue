<template>
  <div v-loading="loading.init">
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
        <div class="header">
          <h4>
            规则明细：<span class="header-msg"
              >（规则执行时，根据前置条件匹配满足的规则明细，按序号逐个规则执行）</span
            >
          </h4>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-button
              v-if="!tableData || tableData.length === 0"
              class="form-btn"
              type="text"
              size="small"
              :disabled="pageType === PAGE_TYPE.VIEW"
              @click="addRows"
            >
              添加
            </el-button>
            <el-table :data="tableData">
              <el-table-column
                type="index"
                label="#"
                width="50"
              />
              <el-table-column
                v-for="item in listingRulesTable(goodsQualityList)"
                :key="item.prop"
                show-overflow-tooltip
                :prop="item.prop"
                :label="item.label"
                v-bind="item.attrs"
              />
              <el-table-column
                label="操作"
                fixed="right"
                width="220"
              >
                <template v-slot:default="scope">
                  <el-button
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="editRule(scope)"
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
                    @click="deleteRule(scope.row)"
                  >
                    删除
                  </el-button>
                  <el-button
                    v-if="scope.$index !== tableData.length - 1"
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="handleMoveDown(scope.$index)"
                  >
                    下移
                  </el-button>
                  <el-button
                    v-if="scope.$index !== 0"
                    type="text"
                    size="small"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @click="handleMoveUpward(scope.$index)"
                  >
                    上移
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
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
    <putaway-configuration
      ref="putawayConfiguration"
      :goods-quality-list="goodsQualityList"
      @addRuleDetails="getRuleDetails"
    />
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';

import { getWarehouseList } from '@/api/wms/warehouse';
import {
  ruleUpperDetail,
  ruleUpperInsert,
  ruleUpperUpdate,
} from '@/api/configure/configureRuleUpper';
import loadingMixin from '@/thales/loading';
import { getDictionary } from '@/util/Dictionary';
import PutawayConfiguration from './components/PutawayConfiguration.vue';
import { PAGE_TYPE, listingRulesTable } from './constant';

export default {
  components: {
    ListBlock,
    PutawayConfiguration,
  },
  mixins: [loadingMixin],
  data() {
    return {
      PAGE_TYPE,
      listingRulesTable,
      pageType: '',
      id: null,
      loading: {
        init: false,
      },
      form: {
        ruleCode: null,
        description: null,
        warehouseCode: null,
      },
      tableData: [],
      rowIndex: null,
      warehouseList: [],
      page: 1,
      size: 999,
      rules: {
        ruleCode: [{ required: true, message: '请输入规则编码', trigger: 'blur' }],
        description: [{ required: true, message: '请输入规则描述', trigger: 'blur' }],
        warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
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
      const { type = null, id = null } = this.$route.query;
      this.pageType = type;
      this.id = id;
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
      // 获取分配规则
      if (this.pageType) {
        await this.replenishmentRulesSearchById();
      }
    },
    // 根据id获取信息
    async replenishmentRulesSearchById() {
      const { ruleUpperDetails = [], ...res } = await ruleUpperDetail({ id: this.id });
      this.form = res;
      this.tableData = ruleUpperDetails;
    },
    // 仓库更改
    warehouseChange(warehouseCode) {
      const chooseWarehouse = this.warehouseList.find(
        (item) => item.warehouseCode === warehouseCode,
      );
      this.form.warehouseId = chooseWarehouse.id;
      this.form.warehouseCode = chooseWarehouse.warehouseCode;
      this.form.warehouseName = chooseWarehouse.warehouseName;
    },
    // 添加行
    addRows(index = 1) {
      this.rowIndex = index;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.putawayConfiguration.onOpen('', this.form.warehouseCode);
        }
      });
    },
    // 编辑
    editRule({ row, $index }) {
      this.$refs.putawayConfiguration.onOpen(row, this.form.warehouseCode);
      this.isEdit = true;
      this.rowIndex = $index;
    },
    // 删除
    deleteRule(row) {
      this.tableData = this.tableData.filter((item) => item !== row);
    },
    // 上移
    handleMoveUpward(index) {
      const upData = this.tableData.splice(index - 1, 1);
      this.tableData.splice(index, 0, ...upData);
    },
    // 下移
    handleMoveDown(index) {
      const downData = this.tableData.splice(index + 1, 1);
      this.tableData.splice(index, 0, ...downData);
    },
    getRuleDetails(data) {
      if (this.isEdit) {
        this.tableData.splice(this.rowIndex, 1, data);
        this.isEdit = false;
      } else {
        this.tableData.splice(this.rowIndex, 0, data);
      }
    },
    async onSubmit() {
      await this.$refs.form.validate;
      if (this.tableData.length < 1) {
        this.$message({
          message: '请添加规则明细',
          type: 'warning',
        });
        return;
      }
      const data = {
        ...this.form,
        details: this.tableData.map((item, index) => ({ ...item, sorts: index + 1 })),
      };
      if (this.pageType) {
        await ruleUpperUpdate(data);
      } else {
        await ruleUpperInsert(data);
      }
      this.$message.success('保存成功！');
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 15px 0;

  .header-msg {
    font-size: 12px;
    font-weight: 400;
  }
}

.form-btn {
  position: absolute;
  z-index: 100;
  top: 50%;
  right: 50px;
}

.btn-boxs {
  margin-top: 30px;
}
</style>
