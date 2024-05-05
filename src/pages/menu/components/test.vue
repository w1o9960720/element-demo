<template>
  <div>{{ label }}</div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
const getInfo = () => {
  console.log(props.label);
};
defineExpose({
  getInfo,
});
</script>
