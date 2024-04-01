<template>
  <el-dialog
    v-model="visible"
    title="选择"
    :width="500"
    align-center
    append-to-body
    destroy-on-close
  >
    <el-table
      border
      :data="tableList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="item in dialogcolumnList"
        :key="item.prop"
        v-bind="item"
      >
        <template v-if="item.prop === 'color'" #default="{ row }">
          <el-tag type="warn">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleconfim">确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { dialogcolumnList, tableList, addressList } from "../constant.js";
const selectList = ref([]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "confim"]);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const handleSelectionChange = (val) => {
  selectList.value = val;
  console.log("selectList.value: ", selectList.value.length);
};
const handleconfim = () => {
  visible.value = false;
  emit("confim", selectList.value);
};
</script>