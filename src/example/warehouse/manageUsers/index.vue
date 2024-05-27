<template>
  <div>
    <list-block>
      <div class="action">
        <h3>用户管理</h3>
      </div>
      <list-filter
        :form="form"
        @fetchData="fetchData"
        @resetData="resetData"
        @disassociate="disassociate"
        @associatedUsers="associatedUsers"
      />
    </list-block>
    <list-block class="container">
      <manage-user-list
        :loading="loading.fetchData"
        :list="shipperList"
        @disassociateId="disassociateId"
        @fetchData="fetchData"
      />
    </list-block>
    <list-block class="container">
      <pagination
        v-if="updateEl"
        ref="shipperPagination"
        :total="total"
        @search="fetchData"
      />
    </list-block>
    <associated-users ref="associatedUsers" @fetchData="fetchData" />
  </div>
</template>

<script>
import pagination from "@/components/Pagination/index.vue";
import ListBlock from "@/components/ListBlock/index.vue";
import { warehouseUserSearch, unbindWarehouseUser } from "@/api/wms/warehouse";
import loadingMixin from "@/thales/loading";
import ListFilter from "./components/ListFilter.vue";
import ManageUserList from "./components/manageUserList.vue";
import AssociatedUsers from "./components/AssociatedUsers.vue";

export default {
  name: "ManageUsers",
  components: {
    ListFilter,
    ListBlock,
    ManageUserList,
    AssociatedUsers,
    pagination,
  },
  mixins: [loadingMixin],
  data() {
    return {
      shipperList: [],
      form: {
        realName: "",
        mobile: "",
      },
      warehouseCode: "",
      total: 0,
      page: 1,
      size: 10,
      disassociateIds: [],
      loading: {
        fetchData: false,
      },
      updateEl: true,
    };
  },
  methods: {
    init({ id, warehouseCode }) {
      this.form.warehouseId = id;
      this.warehouseCode = warehouseCode;
      this.warehouseData = {
        warehouseId: id,
        warehouseCode,
      };
      this.fetchData();
    },
    clearTableData() {
      this.updateEl = false;
      setTimeout(() => {
        this.updateEl = true;
      }, 1);
      this.form.realName = "";
      this.form.mobile = "";
      this.page = 1;
      this.size = 10;
      this.shipperList = [];
    },
    // 重置
    resetData() {
      this.form.realName = "";
      this.form.mobile = "";
      this.fetchData();
    },
    // 搜索
    async fetchData(page, size) {
      if (!page && !size) {
        this.$refs.shipperPagination.page = 1;
        this.page = 1;
      }
      if (!this.form.warehouseId) {
        return;
      }
      const params = { ...this.form, ...this.warehouseData };
      this.page = page || this.page;
      this.size = size || this.size;
      const res = await warehouseUserSearch(params, {
        page: this.page,
        size: this.size,
        ...this.warehouseData,
      });
      this.shipperList = res.records || [];
      this.total = res.total;
    },
    // 取消关联
    async disassociate() {
      if (this.disassociateIds.length === 0) {
        await this.$confirm("请先选择需要取消关联的用户！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        return;
      }
      await this.$confirm("是否确认取消关联勾选的用户?", "取消关联", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const data = {
        ids: [...this.disassociateIds],
      };
      await unbindWarehouseUser(data, { ...this.warehouseData });
      this.disassociateIds = [];
      this.fetchData();
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    disassociateId(disassociateIds) {
      this.disassociateIds = disassociateIds;
    },
    // 关联用户
    associatedUsers() {
      this.$refs.associatedUsers.onOpen(
        this.form.warehouseId,
        this.warehouseCode
      );
    },
  },
};
</script>
<style scoped>
.action {
  text-align: right;
  /* padding: 15px 0; */
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
