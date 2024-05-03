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
</script>

<template>
  <router-view></router-view>
  <el-button @click="handleclick">跳转</el-button>
</template>

<style scoped>
</style>
