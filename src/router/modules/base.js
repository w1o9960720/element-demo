export default [
  {
    path: "/home/suppler",
    name: "货主",
    component: () => import("@/pages/firrst/index.vue"),
  },
  {
    path: "/home/car",
    name: "车辆",
    component: () => import("@/pages/second/index.vue"),
  },
  {
    path: "/home/search",
    name: "搜索",
    component: () => import("@/pages/search/index.vue"),
  },
  {
    path: "/home/echarts",
    name: "搜索",
    component: () => import("@/pages/echarts/index.vue"),
  },
];
