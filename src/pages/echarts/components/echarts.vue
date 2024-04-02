<template>
  <div>
    <div :id="uuid" :style="style"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue";
const props = defineProps({
  option: {
    type: Object,
    default: () => {},
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: "100%",
        height: "80vh",
      };
    },
  },
});
const uuid = ref(`${Math.ceil(Math.random() * 10000000)}`);
let myChart = reactive({});
const { option } = toRefs(props);
watch(option, () => {
  init();
});
const init = () => {
  myChart.setOption(option.value);
};
const update = () => {
  myChart.resize();
};
onMounted(() => {
  myChart = echarts.init(document.getElementById(uuid.value));
  window.addEventListener("resize", update);
});

onUnmounted(() => {
  window.removeEventListener("resize", update);
});
</script>

<style lang="scss" scoped>
</style>