import { getUserInfo } from "@/api/user";

const user = {
  state: {
    userInfo: {},
    token: localStorage.getItem("token"),
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
  },
};
export default user;
