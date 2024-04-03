<template>
  <div class="login">
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      style="width: 30%"
      label-position="right"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
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
.login {
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  padding: 5px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form {
    .footer {
      margin: 0 auto;
    }
  }
}
</style>
