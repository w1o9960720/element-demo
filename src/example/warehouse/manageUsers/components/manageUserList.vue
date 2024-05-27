<template>
  <el-table
    v-loading="loading"
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
      v-for="item in TABLECOLUMN"
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
</template>

<script>
import { TABLECOLUMN } from '../constant';

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      TABLECOLUMN,
      disassociateIds: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.disassociateIds = val.map((item) => item.id);
      this.$emit('disassociateId', this.disassociateIds);
    },
  },
};
</script>
