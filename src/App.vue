<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const handleclick = () => {
  const routeUrl = router.resolve({
    path: "/home/quantites/detail",
    query: { id: "row.id" },
  });
  console.log("routeUrl: ", routeUrl.href);

  window.open(routeUrl.href, "_blank");
};

const test = () => {
  console.log(1);
  Promise.resolve("weq").then((res) => {
    console.log(res);
  });
  let p = new Promise((res, rej) => {
    console.log(2);
    setTimeout(() => {
      console.log(88);
      res();
    }, 0);
  });
  p.then(() => {
    console.log(5);
  });
  setTimeout(() => {
    console.log(6);
  }, 500);
  setTimeout(() => {
    console.log(0);
  }, 0);
  console.log(10);
};
// console.log("test(): ", test());
const test1 = (params) => {
  return Promise.resolve(params).then((res) => {
    console.log(res);
  });
};
let params = true;
console.log("test1(): ", test1(params));
</script>

<template>
  <router-view></router-view>
  <el-button @click="handleclick">跳转</el-button>
</template>

<style scoped>
</style>
