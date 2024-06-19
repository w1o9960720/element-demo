<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// const readNodes = (nodes = []) => {
//   const arr = [];
//   nodes.forEach((item, index) => {
//     arr.push({ label: item.name, value: item.name });
//     if (item.children && item.children.length > 0) {
//       arr[index].children = readNodes(item.children);
//     }
//   });
//   return arr;
// };
// const readNodes = (nodes = []) => {
//   return nodes.map((item) => {
//     let has = item.children && item.children.length > 0;
//     if (has) {
//       return {
//         label: item.name,
//         value: item.name,
//         children: readNodes(item.children),
//       };
//     } else {
//       return {
//         label: item.name,
//         value: item.name,
//       };
//     }
//   });
// };
// let arr = [
//   {
//     name: "sdf",
//     label: "sda",
//     children: [
//       {
//         label: "dsaas",
//         name: "sdfas",
//       },
//     ],
//   },
// ];
// console.log("readNodes: ", readNodes(arr));
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
    ],
  },
];

const deleteArr = (arr, key) => {
  return arr.filter((item) => {
    if (item.key !== key) {
      if (item?.children.length > 0) {
        item.children = deleteArr(item.children, key);
      }
      return true;
    }
  });
};
console.log("deleteArr(arr,1): ", deleteArr(arr, 21));
</script>

<template>
  <router-view></router-view>
  <el-button @click="handleclick">跳转</el-button>
</template>

<style scoped>
</style>
