<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px"><Aside :menu="menuTree"></Aside></el-aside>
        <el-main>
          <!-- <div style="margin-bottom: 8px">
            <el-breadcrumb>
              <el-breadcrumb-item
                :key="item"
                v-for="item in route.matched"
                :to="{ path: item.path }"
                >{{ item.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div> -->
          <transition name="hide">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Header from "../../layout/header.vue";
import Aside from "../../layout/aside.vue";
import { useRoute } from "vue-router";

const route = useRoute();

let menuTree = reactive([]);
const treeArray = [
  {
    pid: 0,
    id: 1,
    label: "用户管理",
    path: "1-1",
    url: "",
  },
  {
    pid: 0,
    id: 8,
    label: "成本管理",
    path: "/o",
  },
  {
    pid: 0,
    id: 2,
    label: "车辆管理",
    path: "/l",
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
    pid: 8,
    id: 18,
    label: "能源管理",
    path: "/home/third",
  },
  {
    pid: 2,
    id: 38,
    label: "车辆分类管理",
    path: "/home/category",
  },
  {
    pid: 1,
    id: 18,
    label: "人员管理",
    path: "/home/four",
  },
  {
    pid: 0,
    id: 7,
    label: "其他",
    path: "/home/suppler",
  },
  {
    pid: 0,
    id: 123,
    label: "菜单管理",
    path: "/home/menu",
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
// console.log('menuTree: ', menuTree);
</script>



<style lang="scss" scoped>
.el-header {
  // background: darkseagreen;
  height: 44px;
  padding: 0;
}
.hide-enter-active {
  animation: scsle-in 0.2s;
}

.hide-leave-active {
  animation: scsle-in 0.2s reverse;
}
@keyframes scsle-in {
  0% {
    transform: translate(-100%);
    opacity: 0;
  }
  100% {
    transform: translate(0%);
    opacity: 1;
  }
}
</style>
