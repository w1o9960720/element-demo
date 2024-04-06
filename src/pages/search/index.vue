<template>
  <div>
    <div class="filter">
      <el-input v-model="keywords" @blur="handlleblur"></el-input>
      <div v-show="show" class="records">
        <ul>
          <li class="item" v-for="i in 4" :key="i">1</li>
        </ul>
      </div>
    </div>

    <div v-show="!show" class="list">
      <ul>
        <li v-for="i in 3" :key="i">2</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
let keywords = ref("");
let show = computed(() => {
  return keywords.value;
});
const handlleblur = () => {};
</script>

<style lang="scss">
.filter {
  position: relative;
  .records {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    background: aliceblue;
    z-index: 56;
    height: 100px;
    & > ul {
      overflow-y: scroll;
      height: 300px;
      padding: 0;
      .item {
        border: 1px solid rebeccapurple;
        padding: 1px;
        box-sizing: border-box;
      }
    }
  }
}
</style>