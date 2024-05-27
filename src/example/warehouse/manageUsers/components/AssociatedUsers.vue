<template>
  <el-dialog
    title="仓库关联用户"
    v-model="dialogVisible"
    append-to-body
    custom-class="manage-user-dialog"
    width="70%"
    :before-close="handleClose"
  >
    <list-block style="padding-bottom: 0">
      <el-form
        ref="shipperForm"
        class="search-form"
        :inline="true"
        :model="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户姓名：">
              <el-input
                v-model="form.realName"
                placeholder="请输入用户姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码：">
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="search-btns">
              <div class="form-btns">
                <el-button
                  class="form-btn"
                  @click.prevent="resetData()"
                >
                  重置
                </el-button>
                <el-button
                  class="form-btn"
                  type="primary"
                  @click.prevent="fetchData()"
                >
                  查询
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </list-block>
    <list-block style="padding-top: 0">
      <el-table
        v-loading="loading.fetchData"
        height="300"
        :data="list"
        border
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in userTableColumn"
          :key="item.props"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :min-width="item.minWidth"
        >
          <template v-slot:default="scope">
            <span v-text="item.formatter ? item.formatter(scope.row) : scope.row[item.prop]" />
          </template>
        </el-table-column>
      </el-table>
    </list-block>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(() => (dialogVisible = false))">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          >保 存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';
import loadingMixin from '@/thales/loading';
import { warehouseUserUnbindSearch, bindWarehouseUser } from '@/api/wms/warehouse';
import { userTableColumn } from '../constant';

export default {
  components: {
    ListBlock,
  },
  mixins: [loadingMixin],
  data() {
    return {
      userTableColumn,
      dialogVisible: false,
      form: {
        realName: '',
        mobile: '',
      },
      warehouseCode: '',
      list: [],
      loading: {
        fetchData: false,
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClose(done) {
      this.form.realName = '';
      this.form.mobile = '';
      done();
    },
    async fetchData() {
      const params = { ...this.form, ...this.warehouseData };
      this.list = await warehouseUserUnbindSearch(params, this.warehouseData);
    },
    async onSubmit() {
      const data = {
        ...this.warehouseData,
        users: [...this.users],
      };
      await bindWarehouseUser(data, {
        ...this.warehouseData,
      });
      this.onClose();
    },
    resetData() {
      this.form.realName = '';
      this.form.mobile = '';
      this.fetchData();
    },
    handleSelectionChange(val) {
      this.users = val;
    },
    onOpen(warehouseId, warehouseCode) {
      this.dialogVisible = true;
      this.warehouseData = {
        warehouseId,
        warehouseCode,
      };
      this.fetchData();
    },
    onClose() {
      this.resetData();
      this.dialogVisible = false;
      this.$emit('fetchData');
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
  },
};
</script>
