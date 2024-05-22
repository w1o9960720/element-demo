export const setData = (data, obj = {}) => {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    data[key] = obj[key];
  });
};
export const mockData = (data, obj = {}) => {
  const keys = Object.keys(data);
  const date = +new Date();
  keys.forEach((key) => {
    data[key] = obj[key] || date;
  });
};
export const getSelectedItem = (options, value, key = 'catNo') => {
  const item = options.find((option) => option[key] === value);
  if (item) {
    return item;
  }
  const arr = [];
  options.forEach((ele) => {
    if (ele.children && ele.children.length) {
      arr.push(...ele.children);
    }
  });
  if (arr.length) {
    return getSelectedItem(arr, value, key);
  }
};
