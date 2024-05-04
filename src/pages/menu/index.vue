<template>
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
            <el-form-item label="菜单名" prop="level">
              <el-input v-model="formData.menuname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品诺" prop="card">
              <el-autocomplete
                v-model="formData.card"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入"
                @select="handleSelect"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆" prop="car">
              <el-input @click="handlefocus" v-model="formData.car"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn" style="margin: 18px 0px">
        <el-button @click="handleadd" type="primary">新增</el-button>
      </div>
      <div id="printBox" class="table">
        <el-table
          height="400px"
          size="mini"
          :data="tableList"
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
              <el-button @click="handleDetail(row)" type="primary" size="small"
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
      <el-button size="large" @click="handleclick" type="primary"
        >打印</el-button
      >
      <el-button size="large" @click="handlesave" type="primary"
        >保存</el-button
      >
    </div>
    <Dialog v-model="visible" @confim="handlecomfims"></Dialog>
    <editDialog ref="forme" @confirm="handlecomfimss"></editDialog>
    <Detail v-model="visible1" :data="item"></Detail>

    <el-form ref="ruleForm" :model="froms">
      <el-table :data="froms.turnoverRule">
        <el-table-column label="限定规则" width="360px">
          <template v-slot:default="scope">
            <el-form-item
              :prop="'turnoverRule.' + scope.$index + '.limitRule'"
              :rules="[{ validator: validateNumber, trigger: 'blur' }]"
            >
              <el-input
                v-model.trim="scope.row.limitRule"
                placeholder="请填写0-1之间的小数，只支持填写到小数点后3位"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="重量" width="360px">
          <template v-slot:default="scope">
            <el-form-item
              :prop="'turnoverRule.' + scope.$index + '.weight'"
              :rules="[{ validator: validateNumber, trigger: 'blur' }]"
            >
              <el-input
                v-model.trim="scope.row.weight"
                placeholder="请填写重量"
              />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup>
import { columnList, tableList, addressList } from "./constant.js";
import Dialog from "./components/dialog.vue";
import editDialog from "./components/editDialog.vue";
import Detail from "./components/detail.vue";
import { keyBy, groupBy } from "lodash";
import init from "./usehook.js";
import Pagenation from "@/components/Pagination/index.vue";
import initForm from "./useForm.js";
import { reactive, watch, ref } from "vue";
import printJs from "print-js";
const froms = reactive({
  turnoverRule: [{}],
});
const ruleForm = ref(null);
const validateNumber = (rule, value, callback) => {
  if (value === "" || value === null || value === undefined) {
    return callback(new Error("不能为空"));
  }
  if (/^0\.\d{0,2}[1-9]$/.test(value)) {
    return callback();
  }
  return callback(new Error(" "));
};
const handlesave = () => {
  console.log("ruleForm: ", ruleForm.value);
  ruleForm?.value?.validate((value) => {
    console.log("value: ", value);
  });
};
const handleclick = () => {
  setTimeout(function () {
    printJs({
      printable: "printBox",
      type: "html",
      scanStyles: false,
      targetStyles: ["*"],
    });
  }, 500);
};

// var array = [
//   { dir: "left", code: 97 },
//   { dir: "right", code: 100 },
//   { dir: "left", code: 97 },
//   { dir: "right", code: 60 },
//   { dir: "left", code: 97 },
//   { dir: "right", code: 60 },
// ];
// console.log('keyBy(array, "dir"): ', keyBy(array, "code"));
// console.log('keyBy(array, "dir"): ', groupBy(array, "dir"));

// const test = () => {
//   console.log(1);
//   let p = new Promise((res, rej) => {
//     res();
//   }).then(() => {
//     console.log(4);
//   });
//   setTimeout(() => {
//     console.log(5);
//   }, 200);
//   setTimeout(() => {
//     console.log(6);
//   },100);
//   let p2 = new Promise((res, rej) => {
//     console.log(9);
//     setTimeout(() => {
//       res();
//     }, 500);
//   }).then(() => {
//     console.log(6);
//   });
// };

const { form, forme, visible, visible1, total, item, rules, page, formData } =
  initForm();
const {
  handlecomfims,
  handleadd,
  handlefocus,
  handleEidt,
  handlecomfimss,
  handleDetail,
  handleDelete,
  handlesearch,
  handleSelect,
  querySearchAsync,
} = init({
  visible,
  visible1,
  tableList,
  item,
  formData,
  forme,
  page,
});

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
