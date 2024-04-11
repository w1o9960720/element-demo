<template>
  <div>
    <div class="filter">
      <el-input
        v-model="keywords"
        @focus="handlefocus"
        @blur="handlleblur"
      ></el-input>
      <History
        v-show="focus"
        :keywords="keywords"
        @sendData="handleData"
      ></History>
    </div>

    <div v-show="!focus" class="list">
      <ul>
        <li v-for="i in 6" :key="i">2</li>
      </ul>
    </div>
    <div>
      <el-button @click="handletest">测试</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import History from "./components/history.vue";
import { fn as data } from "@/hook/hook.js";
console.log("fn: ", data);
const handletest = () => {
  data.name = "asdasd";
  console.log("data: ", data);
};
let keywords = ref("");
let focus = ref(false);
const list = ref([]);
const handlleblur = () => {
  focus.value = false;
};
const handleData = () => {};
const handlefocus = () => {
  focus.value = true;
};
</script>

<style lang="scss">
.filter {
  position: relative;
}
</style>