import { reactive, ref } from "vue";

export const tableList = reactive([
  {
    car: "轿车",
    xh: "B级",
    size: "1.8吨",
    color: "黑色",
    price: "18.8w",
  },
  {
    car: "轿车",
    xh: "c级",
    size: "1.8吨",
    color: "白色",
    price: "38.8w",
  },
  {
    car: "轿车",
    xh: "d级",
    size: "2吨",
    color: "黑色",
    price: "98.8w",
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
export const columnList = [
  {
    label: "车辆名",
    prop: "car",
  },
  {
    label: "级别",
    prop: "xh",
  },
  {
    label: "重量",
    prop: "size",
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
