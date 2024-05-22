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
// console.log("test1(): ", test1(params));

const arr = [
  { id: 4, pid: 3 },
  { id: "aa", pid: "a" },
  { id: 1, pid: null },
  { id: 3, pid: 2 },
  { id: "a", pid: "a0" },
  { id: 2, pid: 1 },
  { id: "a0", pid: null },
];
// console.time();
// arr.reduce((o, i) => {
//   i = Object.assign((o[i.id] ??= {}), i);
//   ((o[i.pid ?? ""] ??= {}).children ??= []).push(i);
//   return o;
// }, {})[""]?.children;
// console.log("arr: ", arr);
// console.timeEnd();

//扁平转树形数组
const tree = (arr, pid) => {
  const first = arr.filter((item) => item.pid === pid);
  first.forEach((item) => {
    const children = tree(arr, item.id);
    if (children.length > 0) {
      item.children = children;
    }
  });
  return first || [];
};
// console.time();
// console.log("tree: ", tree(arr, null));
// console.timeEnd();
</script>

<template>
  <router-view></router-view>
  <el-button @click="handleclick">跳转</el-button>
</template>

<style scoped>
</style>
