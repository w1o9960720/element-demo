import { getUserInfo } from "@/api/user";
import { importRoutes } from "../../router/route";
import { useRouter } from "vue-router";
import { cloneDeep } from "lodash";
const router = useRouter();

const user = {
  state: {
    userInfo: {},
    token: localStorage.getItem("token"),
    menu: [],
  },
  actions: {
    // 查询用户信息
    GetUserInfo({ commit, dispatch }, data) {
      console.log("dispatch: ", data);
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          // let res = await getUserInfo(data);
          let res = `Beare ${Math.random()}-saddada`;
          localStorage.setItem("token", res);
          commit("SET_TOKEN", res);
          resolve(res);
        }, 1500);
      });
    },
    getMenu({ commit, dispatch }, data) {
      return new Promise((reslove, reject) => {
        const ApiTree = localStorage.getItem("menuTree") || [];
        cloneDeep(importRoutes.value);
        commit("SET_MENU", []);
        setTimeout(() => {
          reslove(importRoutes.value);
        }, 100);
      });
    },
    out({ commit, dispatch }) {
      return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          localStorage.removeItem("token");
          commit("SET_TOKEN", " ");
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
