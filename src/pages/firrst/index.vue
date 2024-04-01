<template>
  <div class="form">
    <el-form
      ref="form"
      size="large"
      :model="formData"
      :rules="rules"
      label-position="left"
    >
      <div class="filterForm">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="货主" prop="name">
              <el-input v-model="formData.name"></el-input>
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
          <el-col :span="6">
            <el-form-item label="选择图片" prop="file">
              <uploadPicture
                v-model="formData.file"
                :limit="10"
              ></uploadPicture>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址" prop="address">
              <el-select
                v-model="formData.address"
                filterable
                @change="handleaddress"
              >
                <el-option
                  v-for="(item, index) in addressList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table border :data="tableList" style="width: 100%">
          <el-table-column
            v-for="item in columnList"
            :key="item.prop"
            v-bind="item"
          >
            <template v-if="item.prop === 'color'" #default="{ row }">
              <el-tag type="warn">删除</el-tag>
            </template>
            <template v-if="item.prop === 'price'" #default="{ row }">
              <el-tag type="success">添加</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div class="footer">
      <el-button size="large" @click="handleclick" type="primary"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { columnList, tableList, addressList } from "./constant.js";
import uploadPicture from "../../components/uploadPicture.vue";
const form = ref(null);
const store = useStore();
const router = useRouter();

const formData = reactive({
  name: "",
  address: "",
  time: "",
  file: [],
});

const rules = reactive({
  name: [{ required: true, message: "请填写货主名", trigger: "blur" }],
  address: [{ required: true, message: "请填写地址", trigger: "blur" }],
  time: [{ required: true, message: "请填写时间", trigger: "blur" }],
});
const handleclick = () => {};
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
