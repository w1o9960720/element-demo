
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
];
