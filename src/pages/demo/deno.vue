<template></template>


<script>
/**
 * 去除表单空字符串
 */
const getSearchData = () =>
  Object.keys(form.value).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: form.value[curr] || undefined,
    }),
    {}
  );
/**
 * 去除表单空字符串
 */
const p = new Promise((resolve, reject) => {
  http(params)
    .then((res) => {
      resolve(res);
    })
    .catch(() => {
      reject();
    });
});

const [data]=Promise.all([p])
</script>


<style scoped>
</style>