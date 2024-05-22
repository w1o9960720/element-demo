let allBaseRouter = [];

const loop = (menuArr = []) =>
  (menuArr || []).map((item) => {
    const meun = { ...item };
    // hiddenList  children中 type为2的
    // children  type为2的要置为null
    meun.hiddenList = null;
    if (meun.children && meun.children.length > 0) {
      const res = meun.children.filter((i) => i.type === 2);
      if (res.length > 0) {
        meun.hiddenList = res;
        allBaseRouter = [...allBaseRouter, ...res];
        meun.children = [];
      } else {
        meun.children = loop(meun.children).sort((a, b) => a.order - b.order);
      }
    }
    return meun;
  });
/**
 * @description 格式化菜单项
 */
const formatMenus = (menuArr) => {
  allBaseRouter = [];
  const menu = loop(menuArr).sort((a, b) => a.order - b.order);
  return {
    menu,
    allBaseRouter,
  };
};

export default formatMenus;
