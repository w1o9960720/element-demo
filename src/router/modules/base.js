export default [
  {
    path: "/home/suppler",
    name: "货主",
    meta: {
      title: "货主",
    },
    component: () => import("@/pages/firrst/index.vue"),
  },
  {
    path: "/home/car",
    name: "车辆",
    meta: {
      title: "车辆",
    },
    component: () => import("@/pages/second/index.vue"),
  },
  {
    path: "/home/search",
    name: "搜索",
    meta: {
      title: "搜索",
    },
    component: () => import("@/pages/search/index.vue"),
  },
  {
    path: "/home/echarts",
    name: "图表",
    meta: {
      title: "图表",
    },
    component: () => import("@/pages/echarts/index.vue"),
  },
  {
    path: "/home/test",
    name: "测试",
    meta: {
      title: "测试",
    },
    component: () => import("@/pages/test/index.vue"),
  },
];
