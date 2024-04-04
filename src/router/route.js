import home from "@/pages/home/index.vue";
import { ref } from "vue";
// 批量导入路由
const modules = import.meta.globEager("./modules/**/*.js");
export let importRoutes = ref(
  Object.values(modules)
    .map((item) => item.default)
    .flat()
    .filter((v) => v)
);

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: home,
    children: [],
    meta: {
      title: "首页",
    },
  },
  {
    path: "/home",
    name: "首页",
    component: home,
  },
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

export default routes;
