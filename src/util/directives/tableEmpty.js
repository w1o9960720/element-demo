const getAllCell = (el) => el.querySelectorAll('td.el-table__cell > .cell > span');
const replaceInnerHTML = (el, binding) => {
  const str = binding.value;
  const cells = getAllCell(el);
  cells.forEach((cell) => {
    const innerHTML = cell.innerHTML.trim();
    if (!innerHTML && el) {
      cell.innerHTML = str;
    }
  });
};

const tableEmpty = {
  install(Vue) {
    Vue.directive('empty', {
      // 当被绑定的元素插入到 DOM 中时……
      bind(el, binding) {
        setTimeout(() => {
          replaceInnerHTML(el, binding);
        }, 0);
      },
      update(el, binding) {
        setTimeout(() => {
          replaceInnerHTML(el, binding);
        }, 0);
      },
    });
  },
};
export default tableEmpty;
