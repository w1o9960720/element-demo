const getters = {
  tag: (state) => state.tags.tag,
  access_token: (state) => state.user.token,
  menu: (state) => state.user.menu,
  role: (state) => state.user.userInfo.role,
};
export default getters;
