<template>
  <div>
    <el-scrollbar>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for="item in menuArray" :key="item.path">
          <template v-if="item.children.length">
            <el-sub-menu :index="item.path">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="item1 in item.children"
                :key="item1.path"
                :index="item1.path"
                @click="handlemenu(item1)"
              >
                <el-icon><icon-menu /></el-icon>
                <span>{{ item1.name }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <el-menu-item @click="handlemenu(item)" v-else :index="item.path">
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const menuArray = computed(() => store.getters.menu);
const router = useRouter();
const handlemenu = (item) => {
  router.push({
    path: item.path,
  });
};
</script>

<style lang="scss" scoped>
</style>