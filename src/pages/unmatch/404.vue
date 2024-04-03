<template>
  <div>
    走错地方了
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you requested could not be found.</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({
      path: "/",
    });
  }, 2000);
});
</script>
