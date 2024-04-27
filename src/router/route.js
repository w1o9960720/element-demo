import layout from "@/pages/layout/index.vue";
import home from "@/pages/home/index.vue";

import { ref } from "vue";
// 批量导入路由
const modules = import.meta.globEager("./modules/**/*.js");
const staticmodules = import.meta.globEager("./staticMoudules/**/*.js");

export let importRoutes = ref(
  Object.values(modules)
    .map((item) => item.default)
    .flat()
    .filter((v) => v)
);

export let staticRoutes = ref(
  Object.values(staticmodules)
    .map((item) => item.default)
    .flat()
    .filter((v) => v)
);
const constantRoutes = [
  {
    path: "/login",
    name: "登录",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/login/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/unmatch/404.vue"),
  },
];
const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "home",
        name: "home",
        component: home,
        meta: { title: "首页" },
      },
      ...importRoutes.value,
      ...staticRoutes.value,
    ],
    meta: {
      title: "首页",
    },
  },
  ...constantRoutes,
];

export default routes;
