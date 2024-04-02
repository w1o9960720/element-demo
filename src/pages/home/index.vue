<template>
  <div>
    <div class="home">
      <Header></Header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Header from "../../layout/header.vue";
const store = useStore();
const router = useRouter();
const keywords = ref("");
const menuList = reactive([
  {
    name: "表单",
    url: "/home/suppler",
  },
  {
    name: "车辆",
    url: "/home/car",
  },
  {
    name: "图表",
    url: "/home/echarts",
  },
]);
const handleout = async () => {
  await store.dispatch("out");
  window.location.reload();
};
const handlemenu = async (item) => {
  router.push({
    path: item.url,
  });
};
const handletarget = () => {
  const routeUrl = router.resolve({
    path: "/login",
    query: { id: "row.id " },
  });
  window.open(routeUrl.href, "_blank");
};
</script>



<style lang="scss" scoped>
.home {
  // max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    width: 1280px;
    margin: 0 auto;
  }
}
</style>
