import { reactive, ref } from "vue";
import { useStorage } from "@vueuse/core";
export let tableList = useStorage("menu", [
  {
    label: "菜单",
    path: "/home/menu",
    role: "normal,admin",
  },
]);
export const addressList = reactive([
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
]);
export const levelList = reactive([
  {
    value: "A",
    label: "A级",
  },
  {
    value: "B",
    label: "B级",
  },
  {
    value: "C",
    label: "C级",
  },
  {
    value: "D",
    label: "D级",
  },
  {
    value: "D+",
    label: "D+级",
  },
]);
export const columnList = [
  {
    type: "selection",
    with: 50,
  },
  {
    label: "菜单名",
    prop: "label",
  },
  {
    label: "路径",
    prop: "path",
  },
  {
    label: "角色",
    prop: "role",
  },
  // {
  //   label: "数量",
  //   prop: "num",
  // },
  {
    label: "icon图标",
    prop: "icon",
  },
  {
    label: "操作",
    prop: "fixed",
    fixed: "right",
  },
];
export const dialogcolumnList = [
  {
    label: "车辆名",
    prop: "name",
  },
  {
    label: "级别",
    prop: "level",
  },
  {
    label: "重量",
    prop: "weight",
  },
  {
    label: "颜色",
    prop: "color",
    formatter: (row) => `${row.color}--颜色`,
  },
  {
    label: "价格",
    prop: "price",
  },
];
