<template>
  <el-table
    ref="tableData"
    v-infinite-scroll="() => {}"
    :data="tableData"
    height="300px"
    class="width-100"
    :show-overflow-tooltip="true"
    @selection-change="selectChange"
  >
    <el-table-column
      type="selection"
      width="50"
      :selectable="
        () => {
          return selectable;
        }
      "
    />
    <el-table-column
      v-for="item in TABLECOLUMN"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :min-width="item.width"
    />
  </el-table>
</template>
<script>
import getSerchFields from './fileds';

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
  emits: ['update:selectNum'],
  data() {
    return {
      TABLECOLUMN: getSerchFields(),
      selection: [],
    };
  },
  methods: {
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
