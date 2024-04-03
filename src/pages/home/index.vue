<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px"><Aside :menu="menuTree"></Aside></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Header from "../../layout/header.vue";
import Aside from "../../layout/aside.vue";
let menuTree = reactive([]);
const treeArray = [
  {
    pid: 0,
    id: 1,
    label: "用户管理",
    path: "1-1",
  },
  {
    pid: 0,
    id: 8,
    label: "成本管理",
    path: "1-6",
  },
  {
    pid: 8,
    id: 9,
    label: "车辆成本管理",
    path: "1-9",
  },
  {
    pid: 0,
    id: 2,
    label: "车辆管理",
    path: "/home/suppler",
  },
  {
    pid: 2,
    id: 3,
    label: "轿车管理",
    path: "/home/echarts",
  },
  {
    pid: 2,
    id: 4,
    label: "汽车配件管理",
    path: "/home/car",
  },
  {
    pid: 1,
    id: 5,
    label: "添加用户",
    path: "1-2",
  },
  {
    pid: 1,
    id: 6,
    label: "修改用户",
    path: "1-3",
  },
  {
    pid: 0,
    id: 7,
    label: "其他",
    path: "1-4",
  },
];

const toTree = (list, id = 0) => {
  let newArr = list.filter((item) => item.pid === id);
  newArr.forEach((item) => {
    item.children = toTree(list, item.id);
  });
  return newArr;
};
menuTree = toTree(treeArray);
</script>



<style lang="scss" scoped>
.el-header {
  background: beige;
}
</style>
