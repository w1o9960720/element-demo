<template>
  <div class="form">
    <el-form
      ref="form"
      size="large"
      :model="formData"
      :rules="rules"
      label-position="left"
    >
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="车辆名" prop="car">
            <el-input v-model="formData.car"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="型号" prop="xinghao">
            <el-input v-model="formData.xinghao"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        height="400px"
        size="mini"
        :data="formData.tableList"
        style="width: 100%"
        :span-method="arraySpanMethod"
      >
        <el-table-column label="车名" prop="name"></el-table-column>
        <el-table-column label="数量" prop="num">
          <template #default="{ row, $index }">
            <el-form-item label=" " :prop="`tableList.${$index}.num`">
              <el-input v-model="row.num"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="型号" prop="type">
          <template #default="{ row, $index }">
            <el-form-item label=" " :prop="`tableList.${$index}.type`">
              <el-select v-model="row.type" filterable @change="handlebrand">
                <el-option
                  v-for="(item, index) in addressList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
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
const addressList = reactive([
  {
    label: "A级",
    value: "A",
  },
  {
    label: "B级",
    value: "B",
  },
]);
const form = ref(null);
const store = useStore();
const router = useRouter();

const formData = reactive({
  car: "",
  xinghao: "",
  tableList: [
    {
      name: "bmw",
      num: 1,
      type: "A",
    },
  ],
});
const rules = reactive({
  car: [{ required: true, message: "请填写", trigger: "blur" }],
  xinghao: [{ required: true, message: "请填写地址", trigger: "blur" }],
});
const handleclick = () => {
  form.value.validate(async (value) => {
    console.log("value: ", value);
    console.log(formData);
    if (value) {
    }
  });
};
</script>



<style lang="scss" scoped>
.form {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .footer {
    margin: 0 auto;
  }
}
</style>
