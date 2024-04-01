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
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button size="large" @click="handleclick" type="primary"
        >登录</el-button
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
  name: "",
  password: "",
});
const rules = reactive({
  name: [{ required: true, message: "请填写用户名", trigger: "blur" }],
  password: [{ required: true, message: "请填写密码", trigger: "blur" }],
});
const handleclick = () => {
  form.value.validate(async (value) => {
    if (value) {
      await store.dispatch("GetUserInfo", formData);
      console.log("store: ", store);
      router.push({
        path: "/",
      });
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
