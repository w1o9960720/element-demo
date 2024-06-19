<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// const readNodes = (nodes = []) => {
//   const arr = [];
//   nodes.forEach((item, index) => {
//     arr.push({ label: item.name, value: item.name });
//     if (item.children && item.children.length > 0) {
//       arr[index].children = readNodes(item.children);
//     }
//   });
//   return arr;
// };
const readNodes = (nodes = []) => {
  return nodes.map((item) => {
    let has = item.children && item.children.length > 0;
    if (has) {
      return {
        label: item.name,
        value: item.name,
        children: readNodes(item.children),
      };
    } else {
      return {
        label: item.name,
        value: item.name,
      };
    }
  });
};
let arr = [
  {
    name: "sdf",
    label: "sda",
    children: [
      {
        label: "dsaas",
        name: "sdfas",
      },
    ],
  },
];
console.log("readNodes: ", readNodes(arr));
</script>

<template>
  <router-view></router-view>
  <el-button @click="handleclick">跳转</el-button>
</template>

<style scoped>
</style>
