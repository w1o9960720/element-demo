<template>
  <div class="pagination_inner">
    <el-pagination
      background
      :page-sizes="pageSizes"
      v-model:page-size="size"
      v-model:current-page="page"
      :pager-count="pagerCount"
      :small="small"
      :layout="layout"
      :total="total"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    small: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      size: '',
      page: 1,
    };
  },
  watch: {
    size(newV, oldV) {
      if (newV !== oldV) {
        this.$emit('search', this.page, newV);
      }
    },
    page(newV, oldV) {
      if (newV !== oldV) {
        this.$emit('search', newV, this.size);
      }
    },
    currentPage(val) {
      this.page = val;
    },
  },
  created() {
    this.size = this.pageSize;
  },
  methods: {
    resetPage() {
      this.page = 1;
    },
  },
};
</script>

<style lang="scss">
.el-pagination .btn-prev .el-icon,
.el-pagination .btn-next .el-icon {
  font-size: 18px;
}
.el-pagination .el-select .el-input .el-input__inner {
  width: 100px;
}
.el-pagination__editor.el-input .el-input__inner {
  width: 48px;
}
.pagination_inner {
  width: 100%;
  // padding: 20px 0;
  margin-top: 24px;
  text-align: right;
  border-radius: 0 0 4px 4px;
  background: #ffffff;
}
</style>
