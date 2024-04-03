import { reactive, ref } from "vue";

export const tableList = reactive([
  {
    id: "1",
    name: "轿车",
    level: "B",
    weight: "1.8吨",
    color: "黑色",
    price: "18.8w",
    time: "2024-09-08",
  },
  {
    id: "2",
    name: "轿车",
    level: "C",
    weight: "1.8吨",
    color: "白色",
    price: "38.8w",
    time: "2024-09-28",
  },
  {
    id: "3",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
  },
  {
    id: "4",
    name: "轿车",
    level: "B",
    weight: "1.8吨",
    color: "黑色",
    price: "18.8w",
    time: "2024-09-08",
  },
  {
    id: "5",
    name: "轿车",
    level: "C",
    weight: "1.8吨",
    color: "白色",
    price: "38.8w",
    time: "2024-09-28",
  },
  {
    id: "6",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
  },
  {
    id: "7",
    name: "轿车",
    level: "B",
    weight: "1.8吨",
    color: "黑色",
    price: "18.8w",
    time: "2024-09-08",
  },
  {
    id: "8",
    name: "轿车",
    level: "C",
    weight: "1.8吨",
    color: "白色",
    price: "38.8w",
    time: "2024-09-28",
  },
  {
    id: "9",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
  },
  {
    id: "10",
    name: "轿车",
    level: "D",
    weight: "2吨",
    color: "黑色",
    price: "98.8w",
    time: "2024-09-18",
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
    label: "车辆名",
    prop: "name",
  },
  {
    label: "级别",
    prop: "level",
    formatter: (row) =>
      levelList.find(({ value }) => row.level === value)?.label || "--",
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
