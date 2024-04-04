<template>
  <div class="h">
    <div class="header">
      <div class="left" @click="handlelogo">logo</div>
      <div class="down">
        <div>sdff</div>
        <ul class="down-d">
          <li v-for="item in 4" :key="item" class="item">
            <el-card style="height: 100%">
              <p v-for="o in 4" :key="o" class="text item">
                {{ "List item " + o }}
              </p>
            </el-card>
          </li>
        </ul>
      </div>
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
const handlelogo = () => {
  router.push({
    path: "/",
  });
};
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
    .down {
      line-height: 3em;
      height: 100%;
      .down-d {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        padding: 4px;
        flex-direction: column;
        position: absolute;
        top: 37px;
        left: 0;
        height: 300px;
        width: 100%;
        text-align: center;
        z-index: 999;
        transition: all 0.5s;
        background: white;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        overflow: hidden;
        .item {
          height: 300px;
        }
      }
      &:hover .down-d {
        visibility: visible;
        pointer-events: visible;
        opacity: 1;
        // height: 50%;
      }
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
