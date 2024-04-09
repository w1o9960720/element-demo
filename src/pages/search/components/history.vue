<template>
  <div class="records">
    <div class="history">
      <li v-for="i in 2" :key="i">1</li>
    </div>
    <ul>
      <li class="item" v-for="i in longlist" :key="i" @click="handlesave(i)">
        {{ i.value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRefs, watch, ref, reactive } from "vue";
import { debounce } from "lodash";
import { data } from "autoprefixer";
const props = defineProps({
  keywords: {
    type: String,
    defalut: "",
  },
});
const emits = defineEmits(["sendData"]);
let { keywords } = toRefs(props);
const longlist = ref([]); 
const list = ref([
  { value: "vue", link: "https://github.com/vuejs/vue" },
  { value: "element", link: "https://github.com/ElemeFE/element" },
  { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
  { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
  { value: "vuex", link: "https://github.com/vuejs/vuex" },
  { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
  { value: "babel", link: "https://github.com/babel/babel" },
  { value: " ", link: "https://github.com/babel/babel" },
]);
const getData = debounce(
  (val) => {
    longlist.value = list.value.filter((item) => {
      return item.value.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
    console.log("longlist: ", longlist);
  },
  1000,
  { trailing: true }
);
const handlesave = (i) => {
  console.log("i: ", i);
};
watch(
  () => keywords?.value,
  (val) => {
    getData(val);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
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
</style>