<template>
  <div>
    <el-scrollbar>
      <el-menu>
        <template v-for="item in menu" :key="item.id">
          <el-sub-menu :index="item.path" v-if="item.children.length > 0">
            <template #title>
              <el-icon><message /></el-icon>{{ item.label }}
            </template>
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="item.path"
              @click="handlemenu(item1)"
              >{{ item1.label }}</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item-group v-else>
            <el-menu-item @click="handlemenu(item)" :index="item.path">{{
              item.label
            }}</el-menu-item>
          </el-menu-item-group>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
const handlemenu = (item) => {
  router.push({
    path: item.path,
  });
};
const { menu } = toRefs(props);
</script>

<style lang="scss" scoped>
</style>