<template>
  <el-dialog
    v-model="visible"
    :title="'新增'"
    :width="500"
    align-center
    append-to-body
    destroy-on-close
  >
    <div>{{ data }}</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleconfim">确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {
  reactive,
  ref,
  computed,
  toRefs,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
const selectList = ref([]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Boolean,
    default: false,
  },
});
const { data } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const handleconfim = () => {
  visible.value = false;
};
const fetchData = () => {
  const { id } = data;
  if (id) {
  } else {
  }
};
watch(visible, (val) => {
  if (val) {
    fetchData();
  }
});
</script>