import home from "@/pages/home/index.vue";
// 批量导入路由
const modules = import.meta.globEager("./modules/**/*.js");
const importRoutes = Object.values(modules)
  .map((item) => item.default)
  .flat()
  .filter((v) => v);
const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: home,
    children: importRoutes,
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
];

export default routes;
