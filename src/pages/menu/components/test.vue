<template>
  <div>
    <el-form v-model="form" :inline="true">
      <el-row gutter="4">
        <el-col span="6">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="级别" prop="level">
            <el-input v-model="form.level"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="级别" prop="level">
            <el-input v-model="form.level"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn" @click="handleclick">
      <el-button type="primary">新增一行</el-button>
    </div>
    <div class="table">
      <el-table
        height="400px"
        size="mini"
        :data="tableList"
        style="width: 100%"
      >
        <el-table-column label="姓名" prop="name">
          <template #default="{ row, $index }">
            <el-input
              v-if="row.isshow"
              :ref="(el) => (refs[$index] = el)"
              v-model="row.name"
              @blur="handleblur(row)"
            >
            </el-input>
            <div v-else>
              <span @click="handleshow(row, $index)">{{
                row.name || "-"
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age"> </el-table-column>
        <el-table-column label="级别" prop="level"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { fa } from "element-plus/es/locales.mjs";
import { nextTick, reactive, ref } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
const handleclick = () => {
  tableList.value.push({
    name: null,
    age: null,
    level: null,
    isshow: true,
  });
  console.log("tableList.value: ", tableList.value);
};
const refs = reactive([]);
const tableList = ref([
  {
    id: "1",
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    id: "2",
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    id: "1",
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    id: "1",
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    id: "1",
    name: "哈哈",
    age: 12,
    level: "高级",
  },
]);
const form = reactive({
  name: "",
  age: "",
  level: "",
});
const getInfo = () => {
  console.log(props.label);
};
const handleshow = async (row, $index) => {
  console.log("row: ", row);
  row.isshow = true;
  await nextTick();
  refs[$index]?.focus();
};
const handleblur = async (row) => {
  row.isshow = false;
};
defineExpose({
  getInfo,
});
</script>
