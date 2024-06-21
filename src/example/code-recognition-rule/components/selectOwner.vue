<template>
  <div class="header-component">
    <el-dialog
      v-model="dialogVisible"
      title="选择货主"
      width="1000px"
      @close="closeDialog"
    >
      <div class="title">
        <el-form
          ref="ruleForm"
          :model="searchForm"
          :inline="true"
          label-width="80px"
        >
          <el-form-item label="货主编码：">
            <el-input
              v-model="searchForm.shipperCode"
              style="width: 150px"
            />
          </el-form-item>

          <el-form-item label="货主名称：">
            <el-input
              v-model="searchForm.shipperName"
              style="width: 150px"
            />
          </el-form-item>

          <nh-button
            style="margin-left: 40px"
            @click="handleQueryFrom"
          >
            查 询
          </nh-button>
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
          <nh-button
            type="primary"
            :loading="loading.headleSubmitForm"
            @click="headleSubmitForm"
          >
            确定
          </nh-button>
          <nh-button
            :loading="loading.headleSubmitForm"
            @click="handleClose"
          >
            取消
          </nh-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import loadingMixin from '@/thales/loading';
import { shipperList } from '../api';
import TransferTable from './transferTable.vue';

export default {
  name: 'SetLoactionDialog',
  components: { TransferTable },
  mixins: [loadingMixin],
  emits: ['onSuccess'],
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
    async init(data, disabled) {
      this.dialogVisible = true;
      this.disabled = !!disabled;
      const customerIds = data;
      this.rightTable = [];
      if (data.length > 0) {
        this.rightTable = await shipperList({
          shipperIds: customerIds,
          warehouseId: this.$store.state.user.accountInfo.warehouseId,
        });
      }
      this.$nextTick(() => {
        this.handleQueryFrom();
      });
    },
    handleQueryFrom() {
      this.$refs.leftTable.scrollTop(0);
      this.leftTable = [];
      this.getLeftTable();
    },
    async getLeftTable() {
      const resp = await shipperList({
        ...this.searchForm,
        warehouseId: this.$store.state.user.accountInfo.warehouseId,
      });
      const tableData = resp;
      const ids = this.rightTable.map(({ id }) => id);
      tableData.forEach((item) => {
        if (!ids.includes(item.id)) {
          this.leftTable.push(item);
        }
      });
    },
    async headleSubmitForm() {
      const customerInfos = this.rightTable.map((item) => item.id);
      this.$emit('onSuccess', customerInfos);
      this.handleClose();
    },
    // 选中
    handleAddLocation() {
      const selectList = this.$refs.leftTable.getSelect();
      this.rightTable.push(...selectList);
      this.leftTable = this.leftTable.filter(
        ({ id }) => !selectList.some((list) => id === list.id),
      );
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
