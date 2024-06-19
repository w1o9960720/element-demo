/**
 * 全站权限配置
 *
 */
import store from "@/store";
// progress bar style
import layout from "@/pages/layout/index.vue";

const whiteList = ["trajectory"];
let flag = false;
export default (router) => {
  router.beforeEach((to, from, next) => {
    if (whiteList.includes(to.name)) {
      next();
      return;
    }
    if (store.getters.access_token) {
      if (!flag) {
        store.dispatch("getMenu", store.getters.role).then((res) => {
          router.addRoute({
            name: "main",
            path: "/",
            component: layout,
            children: res,
          });
          flag = true;
          router.addRoute({ path: "/about", component: layout });
          // console.log("router: ", router.options.routes);
          router.replace(router.currentRoute.value.fullPath);
          // console.log("获取菜单", res);
        });
      }

      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        const value = to.query.src || to.fullPath;
        // 针对外链跳转
        if (value.includes("http") || value.includes("https")) {
          window.open(value, "_blank");
          return;
        }
        next();
      }
    }
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  });
};
