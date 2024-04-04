<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="A级" name="A"></el-tab-pane>
      <el-tab-pane label="B级" name="B"></el-tab-pane>
      <el-tab-pane label="C级" name="C"></el-tab-pane>
      <el-tab-pane label="D级" name="D"></el-tab-pane>
      <el-tab-pane label="D+级" name="D+"></el-tab-pane>
    </el-tabs>
    <div class="form">
      <el-form
        ref="form"
        size="mini"
        :model="formData"
        :rules="rules"
        label-position="left"
      >
        <div class="filterForm">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="出厂时间" prop="time">
                <el-date-picker
                  v-model="formData.time"
                  type="datetime"
                  placeholder="选择时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌" prop="brand">
                <el-select v-model="formData.brand" filterable @change="handlebrand">
                  <el-option
                    v-for="(item, index) in addressList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button @click="handleEdit('query')" type="primary"
                >查询</el-button
              >
              <el-button @click="handleEdit('reset')" type="primary"
                >重置</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="btn" style="margin-bottom: 8px"></div>
        <div class="btn" style="margin-bottom: 8px">
          <el-button @click="handleadd" type="primary">新增</el-button>
        </div>
        <div class="table">
          <el-table
            height="450px"
            :data="tableData"
            style="width: 100%"
            :span-method="arraySpanMethod"
          >
            <el-table-column
              v-for="item in columnList"
              :key="item.prop"
              v-bind="item"
            >
              <template v-if="item.prop === 'color'" #default="{ row }">
                <el-tag type="success">{{ row.color }}</el-tag>
              </template>
              <template v-else-if="item.fixed === 'right'" #default="{ row }">
                <el-button @click="handleEidt(row)" type="success" size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="handleDetail(row)"
                  type="primary"
                  size="small"
                  >详情</el-button
                >
                <el-button @click="handleDelete(row)" type="danger" size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <Pagenation @search="handlesearch" :total="total"></Pagenation>
        </div>
      </el-form>
      <div class="footer">
        <!-- <el-button size="large" @click="handleclick" type="primary"
        >保存</el-button
      > -->
      </div>
      <Dialog v-model="visible" @confim="handlecomfims"></Dialog>
      <editDialog
        ref="forme"
        @confirm="handlecomfimss"
        :type="activeName"
      ></editDialog>
      <Detail v-model="visible1" :data="item"></Detail>
    </div>
  </div>
</template>

<script setup>
import { columnList, addressList, tableList } from "./constant.js";
import Dialog from "./components/dialog.vue";
import editDialog from "./components/editDialog.vue";
import Detail from "./components/detail.vue";
import { keyBy, groupBy } from "lodash";
import init from "./usehook.js";
import Pagenation from "@/components/Pagination/index.vue";
import initForm from "./useForm.js";
import { reactive, ref, watch } from "vue";
const activeName = ref("A");
let List = ref([
  {
    id: "1",
    name: "轿车",
    level: "A",
    weight: "1.6吨",
    color: "黑色",
    price: "8.8w",
    time: "2024-09-08",
    brand: "MEISAI",
  },
  {
    id: "1",
    name: "轿车",
    level: "D+",
    weight: "2.6吨",
    color: "黑色",
    price: "198.8w",
    time: "2024-09-08",
    brand: "MEISAI",
  },
  {
    id: "1",
    name: "轿车",
    level: "B",
    weight: "1.8吨",
    color: "黑色",
    price: "18.8w",
    time: "2024-09-08",
    brand: "TOYATO",
  },
  {
    id: "2",
    name: "轿车",
    level: "C",
    weight: "1.8吨",
    color: "白色",
    price: "38.8w",
    time: "2024-09-28",
    brand: "TOYATO",
  },
  {
    id: "3",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
    brand: "BMW",
  },
  {
    id: "4",
    name: "轿车",
    level: "B",
    weight: "1.8吨",
    color: "黑色",
    price: "18.8w",
    time: "2024-09-08",
    brand: "AD",
  },
  {
    id: "5",
    name: "轿车",
    level: "C",
    weight: "1.8吨",
    color: "白色",
    price: "38.8w",
    time: "2024-09-28",
    brand: "AD",
  },
  {
    id: "6",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
    brand: "BMW",
  },
  {
    id: "7",
    name: "轿车",
    level: "B",
    weight: "1.8吨",
    color: "黑色",
    price: "18.8w",
    time: "2024-09-08",
    brand: "BMW",
  },
  {
    id: "8",
    name: "轿车",
    level: "D+",
    weight: "1.8吨",
    color: "白色",
    price: "238.8w",
    time: "2024-09-28",
    brand: "PORSCHE",
  },
  {
    id: "9",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
    brand: "PORSCHE",
  },
]);
const handleClick = () => {};
const {
  form,
  forme,
  visible,
  visible1,
  total,
  item,
  rules,
  page,
  formData,
  tableData,
} = initForm();

const {
  handlecomfims,
  handleadd,
  handlefocus,
  handleEidt,
  handlecomfimss,
  handleDetail,
  handleDelete,
  handlesearch,
  handleEdit,
  queryData,
  handlebrand
} = init({
  tableData,
  activeName,
  visible,
  visible1,
  item,
  formData,
  forme,
  page,
  List,
});
const getData = async () => {
  tableData.value = await queryData(List);
};
watch(
  () => activeName.value,
  () => {
    getData();
  },
  {
    immediate: true,
  }
);
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {};
</script>



<style lang="scss" scoped>
.form {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .table {
    margin-bottom: 8px;
  }
  .footer {
    margin: 0 auto;
  }
}
</style>
