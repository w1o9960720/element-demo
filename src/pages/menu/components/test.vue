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
      <el-button type="primary">新增</el-button>
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
              @blur="handleblur(row)"
              v-model="row.name"
            ></el-input>
            <span @click="handleshow(row, $index)" v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age"> </el-table-column>
        <el-table-column label="级别" prop="level"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { nextTick, reactive } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
const handleclick = () => {};
const refs = reactive([]);
const tableList = reactive([
  {
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
    name: "哈哈",
    age: 12,
    level: "高级",
  },
  {
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
