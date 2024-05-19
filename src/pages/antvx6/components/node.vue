
<template>
  <!-- <el-progress type="dashboard" :percentage="percentage" :width="80">
    <template #default="{ percentage }">
      <span class="percentage-value">{{ percentage }}%</span>
    </template>
  </el-progress> -->
  <el-tooltip>
    <div style="width: 100px; height: 100px">文本</div>
    <template #content>
      <div>sdfghfdsadfghv</div>
    </template>
  </el-tooltip>
</template>

<script setup>
import { defineComponent, inject, ref, onMounted } from "vue";

const getNode = inject("getNode");
let percentage = ref(80);
let keywords = ref("文本");

onMounted(() => {
  const node = getNode();
  console.log(node);
  node.on("change:data", ({ current }) => {
    const { progress } = current;
    this.percentage = progress;
  });
});
</script>