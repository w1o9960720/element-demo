export default [
  {
    path: "/home/suppler",
    name: "货主",
    meta: {
      title: "货主管理",
      role: "",
    },
    component: () => import("@/pages/firrst/index.vue"),
  },
  {
    path: "/home/car",
    name: "车辆",
    meta: {
      title: "车辆管理",
      role: "",
    },
    component: () => import("@/pages/second/index.vue"),
  },
  {
    path: "/home/search",
    name: "搜索",
    meta: {
      title: "搜索",
      role: "",
    },
    component: () => import("@/pages/search/index.vue"),
  },
  {
    path: "/home/echarts",
    name: "图表",
    meta: {
      title: "图表",
      role: "",
    },
    component: () => import("@/pages/echarts/index.vue"),
  },
  {
    path: "/home/test",
    name: "测试",
    meta: {
      title: "测试",
      role: "",
    },
    component: () => import("@/pages/test/index.vue"),
  },
  {
    path: "/home/third",
    name: "能源管理",
    meta: {
      title: "能源管理",
      role: "",
    },
    component: () => import("@/pages/third/index.vue"),
  },
  {
    path: "/home/four",
    name: "人员管理",
    meta: {
      title: "人员管理",
      role: "",
    },
    component: () => import("@/pages/four/index.vue"),
  },
  {
    path: "/home/category",
    name: "分类管理",
    meta: {
      title: "分类管理",
      role: "",
    },
    component: () => import("@/pages/category/index.vue"),
  },
  {
    path: "/home/menu",
    name: "菜单管理",
    meta: {
      title: "菜单管理",
      role: "",
    },
    component: () => import("@/pages/menu/index.vue"),
  },
];
