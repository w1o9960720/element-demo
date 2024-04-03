<template>
  <div class="h">
    <div class="header">
      <div class="left">logo</div>
      <div class="right">
        <el-dropdown>
          <span class="el-dropdown-link">
            设置
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
const handleout = async () => {
  await store.dispatch("out");
  window.location.reload();
};
// const handletarget = () => {
//   const routeUrl = router.resolve({
//     path: "/login",
//     query: { id: "row.id " },
//   });
//   window.open(routeUrl.href, "_blank");
// };
</script>



<style lang="scss" scoped>
.h {
  // background: slategrey;
  margin-bottom: 8px;
  width: 100%;
  .header {
    width: 100%;
    margin: 0 auto;
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
}
</style>
