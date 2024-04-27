export default [
  {
    path: "/home/quantites/detail",
    name: "销量管理详情",
    meta: {
      title: "销量管理详情",
    },
    component: () => import("@/pages/quantites/detail/index.vue"),
  },
  {
    path: "/tiaozhuan",
    name: "跳转",
    meta: {
      title: "跳转",
    },
    component: () => import("@/pages/tiaozhuan/tiaozhuan.vue"),
    children: [],
  },
];
