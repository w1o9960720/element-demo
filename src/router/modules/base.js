export default [
  {
    path: "/home/four",
    name: "用户管理",
    meta: {
      title: "用户管理",
    },
    redirect: "/home/four",
    children: [
      {
        path: "/home/four",
        name: "人员管理",
        meta: {
          title: "人员管理",
        },
        component: () => import("@/pages/four/index.vue"),
      },
    ],
  },
  {
    path: "/home/car",
    name: "车辆管理",
    meta: {
      title: "车辆管理",
    },
    redirect: "/home/car",
    children: [
      {
        path: "/home/car",
        name: "车辆配件",
        meta: {
          title: "车辆配件",
        },
        component: () => import("@/pages/second/index.vue"),
      },
      {
        path: "/home/echarts",
        name: "车辆图表",
        meta: {
          title: "车辆图表",
        },
        component: () => import("@/pages/echarts/index.vue"),
      },
      {
        path: "/home/category",
        name: "分类管理",
        meta: {
          title: "分类管理",
        },
        component: () => import("@/pages/category/index.vue"),
      },
      {
        path: "/home/quantites",
        name: "销量管理",
        meta: {
          title: "销量管理",
        },
        component: () => import("@/pages/quantites/index.vue"),
        children: [
          // {
          //   path: "/home/quantites/detail",
          //   name: "销量管理详情",
          //   meta: {
          //     title: "销量管理详情",
          //   },
          //   component: () => import("@/pages/quantites/detail/index.vue"),
          // },
        ],
      },
    ],
  },
  {
    path: "/home/third",
    name: "品牌管理",
    redirect: "/home/third",
    children: [
      {
        path: "/home/third",
        name: "品牌类型",
        meta: {
          title: "能源管理",
        },
        component: () => import("@/pages/third/index.vue"),
      },
    ],
  },
  {
    path: "/home/menu",
    name: "菜单管理",
    meta: {
      title: "菜单管理",
    },
    component: () => import("@/pages/menu/index.vue"),
    children: [],
  },
  {
    path: "/home/search",
    name: "搜索",
    component: () => import("@/pages/search/index.vue"),
    children: [],
  },
  {
    path: "/antvx6",
    name: "antvx6",
    meta: {
      title: "绘图",
    },
    component: () => import("@/pages/antvx6/antvx6.vue"),
    children: [],
  },
  {
    path: "/home/test",
    name: "测试",
    meta: {
      title: "测试",
    },
    component: () => import("@/pages/test/index.vue"),
    children: [],
  },
];
