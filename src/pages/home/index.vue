<template>
  <div>
    <div class="home">
      <div class="header">
        <div class="left">logo</div>
        <div class="menu">
          <li
            class="menu-item"
            @click="handlemenu(item)"
            :key="item.name"
            v-for="item in menuList"
          >
            <div>{{ item.name }}</div>
          </li>
        </div>
        <div class="search">
          <el-input v-model="keywords">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </div>
        <div class="right">
          <el-button type="primary" @click="handleout">退出页面</el-button>
          <el-button type="primary" @click="handletarget">跳转新页面</el-button>
        </div>
      </div>
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

const store = useStore();
const router = useRouter();
const keywords = ref("");
const menuList = reactive([
  {
    name: "货主",
    url: "/home/suppler",
  },
  {
    name: "车辆",
    url: "/home/car",
  },
  // {
  //   name: "搜索",
  //   url: "/home/search",
  // },
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
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
    }
    .search {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .menu-item {
        padding: 0px 2px;
      }
    }
    .right {
    }
  }
  .content {
    flex: 1;
    width: 100%;
  }
}
</style>
