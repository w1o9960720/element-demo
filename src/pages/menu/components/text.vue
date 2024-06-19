<template>
  <el-form
    ref="form"
    size="mini"
    :model="formData"
    :rules="rules"
    label-position="left"
  >
    <div class="filterForm">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="菜单名" prop="level">
            <el-input v-model="formData.menuname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车辆" prop="car">
            <el-input @click="handlefocus" v-model="formData.car"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>
<script setup>
import { reactive, ref, computed, watch } from "vue";

const props = defineProps({
  formData: {
    type: Boolean,
    default: false,
  },
});
let arr = [
  {
    key: 1,
    value: "1",
    children: [
      {
        key: 11,
        value: "1",
        children: [
          {
            key: 12,
            value: "1",
            children: [
              {
                key: 122,
                value: "1",
                children: [
                  {
                    key: 1222,
                    value: "1",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 211,
        value: "1",
        children: [
          {
            key: 221,
            value: "1",
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    value: "2",
    children: [
      {
        key: 21,
        value: "2",
        children: [
          {
            key: 31,
            value: "3",
            children: [],
          },
        ],
      },
      {
        key: 331,
        value: "2",
        children: [
          {
            key: 3331,
            value: "3",
            children: [],
          },
        ],
      },
    ],
  },
];
const deleteArr = (arr, key) => {
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.key !== key) {
      if (item.children.length > 0) {
        item.children = deleteArr(item.children, key);
      }
      tree.push(item);
    }
  }
  return tree || [];
};
// console.log("deleteArr(arr,1): ", deleteArr(arr, 3331111));
watch(
  () => props.formData,
  (v) => {
    emit("update:modelValue", v);
  },
  {
    deep: true,
  }
);
const emit = defineEmits(["update:modelValue"]);
</script>