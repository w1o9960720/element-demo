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
            <el-form-item label="级别" prop="level">
              <el-input v-model="formData.level"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="送货时间" prop="time">
              <el-date-picker
                v-model="formData.time"
                type="datetime"
                placeholder="选择时间"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="选择图片" prop="file">
              <uploadPicture
                v-model="formData.file"
                :limit="10"
              ></uploadPicture>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="地址" prop="address">
              <el-select v-model="formData.address" filterable>
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
            <el-form-item label="车辆" prop="car">
              <el-input @click="handlefocus" v-model="formData.car"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn" style="margin-bottom: 8px">
      </div>
      <div class="btn" style="margin-bottom: 8px">
        <el-button @click="handleadd" type="primary">新增</el-button>
      </div>
      <div class="table">
        <el-table
          height="450px"
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
      <!-- <el-button size="large" @click="handleclick" type="primary"
        >保存</el-button
      > -->
    </div>
    <Dialog v-model="visible" @confim="handlecomfims"></Dialog>
    <editDialog ref="forme" @confirm="handlecomfimss"></editDialog>
    <Detail v-model="visible1" :data="item"></Detail>
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
