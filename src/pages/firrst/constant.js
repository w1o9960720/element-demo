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

export const columnList = [
  {
    label: "车辆名",
    prop: "car",
    width: 170,
  },
  {
    label: "级别",
    prop: "xh",
    width: 170,
  },
  {
    label: "重量",
    prop: "size",
    width: 170,
  },
  {
    label: "颜色",
    prop: "color",
    width: 170,
    formatter: (row) => `${row.color}--颜色`,
  },
  {
    label: "价格",
    prop: "price",
    width: 170,
  },
];
