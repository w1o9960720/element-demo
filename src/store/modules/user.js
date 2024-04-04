import { getUserInfo } from "@/api/user";
import { importRoutes } from "../../router/route";
import { useRouter } from "vue-router";
import { cloneDeep } from "lodash";
import { useStorage } from "@vueuse/core";
import { resetRouter } from "@/router";
export let tableList = useStorage("menu");
let menuStorege;
try {
  menuStorege = JSON.parse(tableList.value);
} catch (error) {
  menuStorege = [
    {
      path: "/home/menu",
      label: "菜单管理",
      role: "admin",
      icon: "sadad",
    },
  ];
}

const filter = (store, routeTree) => {
  return routeTree.filter((item) => {
    if (item.children?.length > 0) {
      item.children = filter(store, item.children);
    }
    return store.includes(item.path);
  });
};
const user = {
  state: {
    userInfo: JSON.parse(localStorage.getItem("userinfo")),
    token: localStorage.getItem("token"),
    menu: [],
  },
  actions: {
    // 查询用户信息
    GetUserInfo({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          // let res = await getUserInfo(data);
          const data = {
            token: `Beare ${Math.random()}-saddada`,
            role: "admin",
          };
          localStorage.setItem("token", data.token);
          commit("SET_TOKEN", data.token);
          localStorage.setItem("userinfo", JSON.stringify(data));
          commit("SET_USER_INFO", data);
          resolve(data);
        }, 1500);
      });
    },
    getMenu({ commit, dispatch }, role) {
      return new Promise((reslove, reject) => {
        let userMenu = menuStorege
          .filter((item) => {
            return item.role.split(",").includes(role);
          })
          .map((item) => item.path);
        let menu = filter(userMenu, cloneDeep(importRoutes.value));
        console.log(
          "cloneDeep(importRoutes.value): ",
          cloneDeep(importRoutes.value)
        );
        console.log("userMenu: ", userMenu);
        // console.log("menu: ", menu);
        commit("SET_MENU", menu);
        setTimeout(() => {
          reslove(menu);
        }, 100);
      });
    },
    out({ commit, dispatch }) {
      return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userinfo");
          commit("SET_TOKEN", " ");
          commit("SET_USER_INFO", " ");
          resetRouter();
          resolve();
        }, 1500);
      });
    },
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
  },
};
export default user;
