<template>
  <el-dialog
    v-model="dialogVisible"
    title="选择货主"
    width="80%"
    @close="closeDialog"
  >
    <div class="title">
      <el-form
        ref="ruleForm"
        :model="searchForm"
        :inline="true"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="货主编码：">
              <el-input v-model="searchForm.shipperCode" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="货主名称：">
              <el-input v-model="searchForm.shipperName" />
            </el-form-item>
          </el-col>
          <el-button @click="handleQueryFrom"> 查 询 </el-button>
        </el-row>
      </el-form>
    </div>
    <div class="body">
      <div class="left-table">
        <div class="table-header">未选货主</div>
        <transfer-table
          ref="leftTable"
          :table-data="leftTable"
          :load="true"
          :selectable="!disabled"
          @onLoadTable="onLoadTable"
        />
      </div>
      <div class="btn">
        <div class="add-btn">
          <el-button
            :disabled="disabled"
            @click="handleAddLocation"
          >
            添加
          </el-button>
        </div>
        <div class="remove-btn">
          <el-button
            :disabled="disabled"
            @click="handleRemoveLocation"
          >
            移除
          </el-button>
        </div>
      </div>
      <div class="right-table">
        <div class="table-header">已选货主</div>
        <transfer-table
          ref="rightTable"
          :table-data="rightTable"
          :selectable="!disabled"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          :loading="loading.headleSubmitForm"
          @click="headleSubmitForm"
        >
          保存
        </el-button>
        <el-button
          :loading="loading.headleSubmitForm"
          @click="handleClose"
        >
          取消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import loadingMixin from '@/thales/loading';
import { shipperList } from '@/api/shipper';
import { bindShipperList, bindShipperListOut } from '@/api/configure/warehousingProcess';
import TransferTable from './transferTable.vue';

export default {
  name: 'SetLoactionDialog',
  components: { TransferTable },
  mixins: [loadingMixin],
  emits: ['onSuccess'],
  props: {
    warehouseCode: {
      type: String,
      default: '',
    },
    orderType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      loading: {
        headleSubmitForm: false,
      },
      searchForm: {},
      leftTable: [],
      pagination: {
        page: 1,
        size: 10,
      },
      rightTable: [],
      bindShipperList: {},
    };
  },
  methods: {
    async init(data, disabled, num) {
      this.dialogVisible = true;
      this.disabled = !!disabled;
      const customerIds = data.map((res) => res.id || res.shipperId);
      this.rightTable = [];
      this.getBindShipperList(num);
      if (data.length > 0) {
        const resp = await shipperList(
          { shipperIds: customerIds, warehouseCode: this.warehouseCode },
          { page: 1, size: 1000 },
        );rightTable
        this.rightTable = resp.records.map((item) => {
          const newItem = item;
          newItem.descriptionCode = this.bindShipperList[newItem.id];
          return newItem;
        });
      }
      this.$nextTick(() => {
        this.handleQueryFrom();
      });
    },
    async getBindShipperList(num) {
      const data = {
        warehouseCode: this.warehouseCode,
        orderType: this.orderType,
      };
      if (num === 2) this.bindShipperList = await bindShipperList(data);
      if (num === 1) this.bindShipperList = await bindShipperListOut(data);
    },
    handleQueryFrom() {
      this.pagination.page = 1;
      this.getLeftTable();
    },
    onLoadTable() {
      const { page, size, total } = this.pagination;
      if (total && page * size < Number(total)) {
        this.pagination.page += 1;
        this.getLeftTable();
      }
    },
    async getLeftTable() {
      const resp = await shipperList(
        {
          ...this.searchForm,
          warehouseCode: this.warehouseCode,
        },
        this.pagination,
      );
      const tableData = resp.records;
      if (this.pagination.page === 1) {
        this.leftTable = [];
      }
      const ids = this.rightTable.map(({ id }) => id);
      tableData.forEach((item) => {
        if (!ids.includes(item.id)) {    
          this.leftTable.push(item);
        }
      });
      this.pagination = {
        page: resp.page,
        size: resp.size,
        total: resp.total,
      };
      if (this.leftTable.length < 10) {
        this.onLoadTable();
      }
    },
    async headleSubmitForm() {
      const customerInfos = this.rightTable.map((item) => ({
        shipperCode: item.shipperCode,
        shipperName: item.shipperName,
        shipperId: item.id,
      }));
      this.$emit('onSuccess', customerInfos);
      this.$message({
        message: '保存成功！',
        type: 'success',
      });
      this.handleClose();
    },
    // 选中
    handleAddLocation() {
      const selectList = this.$refs.leftTable.getSelect();
      this.rightTable.push(...selectList);
      this.leftTable = this.leftTable.filter(
        ({ id }) => !selectList.some((list) => id === list.id),
      );
      if (selectList.length > 5) {
        this.onLoadTable();
      }
    },
    // 移除选中
    handleRemoveLocation() {
      const selectList = this.$refs.rightTable.getSelect();
      this.leftTable.push(...selectList);
      this.rightTable = this.rightTable.filter(
        ({ id }) => !selectList.some((list) => id === list.id),
      );
    },
    handleClose() {
      this.dialogVisible = false;
    },
    closeDialog() {
      this.searchForm = {};
      this.leftTable = [];
      this.rightTable = [];
      this.pagination = {
        page: 1,
        size: 10,
      };
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.title,
.header {
  border-bottom: 1px solid #ccc;
}

.header {
  padding-bottom: 22px;
}

.body {
  display: flex;

  .left-table,
  .right-table {
    flex: 1 1 700px;
    overflow-x: hidden;

    .table-header {
      padding: 10px;
    }
  }

  .btn {
    flex: 0 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
      padding: 10px 0;
    }
  }
}
</style>
