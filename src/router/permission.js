/**
 * 全站权限配置
 *
 */
import store from "@/store";
// progress bar style
import home from "@/pages/home/index.vue";

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
        store.dispatch("getMenu").then((res) => {
          router.addRoute({
            name: "main",
            path: "/",
            component: home,
            children: res,
          });
          flag = true;
          console.log("获取菜单");
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
