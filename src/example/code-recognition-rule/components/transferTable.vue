<template>
  <el-table
    ref="tableData"
    v-infinite-scroll="()=> {}"
    :data="tableData"
    height="300px"
    class="width-100"
    :show-overflow-tooltip="true"
    @selection-change="selectChange"
  >
    <el-table-column
      type="selection"
      width="50"
      :selectable="()=> {return selectable}"
    />
    <el-table-column
      prop="shipperCode"
      label="货主编码"
    />
    <el-table-column
      prop="shipperName"
      label="货主名称"
    />
  </el-table>
</template>
<script>
export default {
  name: 'TransferTable',
  props: {
    load: {
      type: Boolean,
      default: false,
    },
    selectNum: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    selectable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:selectNum', 'onLoadTable'],
  data() {
    return {
      TABLECOLUMN: [],
      selection: [],
    };
  },
  created() {
    if (this.load) {
      this.$nextTick(() => {
        this.$refs.tableData.$refs.bodyWrapper.addEventListener(
          'scroll',
          (res) => {
            const height = res.target;
            const { clientHeight, scrollTop, scrollHeight } = height;
            if (clientHeight + scrollTop + 20 > scrollHeight) {
              this.$emit('onLoadTable');
            }
          },
          true,
        );
      });
    }
  },
  methods: {
    scrollTop(num) {
      this.$refs.tableData.$refs.bodyWrapper.scrollTop = num;
    },
    selectChange(selection) {
      this.selection = selection;
      this.$emit('update:selectNum', selection.length);
    },
    getSelect() {
      return this.selection;
    },
    filterLabel(val, arr) {
      const filterArr = arr.find((item) => item.value === val);
      return filterArr ? filterArr.label : '';
    },
  },
};
</script>
<style scoped>
.width-100 {
  width: 100%;
}
</style>
