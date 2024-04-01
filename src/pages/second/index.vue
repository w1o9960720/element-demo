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

const form = ref(null);
const store = useStore();
const router = useRouter();

const formData = reactive({
  car: "",
  xinghao: "",
});
const rules = reactive({
  car: [{ required: true, message: "请填写", trigger: "blur" }],
  xinghao: [{ required: true, message: "请填写地址", trigger: "blur" }],
});
const handleclick = () => {
  form.value.validate(async (value) => {
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
