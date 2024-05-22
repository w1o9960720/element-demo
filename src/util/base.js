// 获取操作人方法
export const formatKeyValueArray = (obj) =>
  Object.keys(obj).map((key) => ({
    value: key,
    label: obj[key],
  }));

export const formatKeyValueObject = (arr, keyObj = {}) => {
  const obj = {};
  const { value = 'value', label = 'label' } = keyObj;

  arr.forEach((item) => {
    obj[item[value]] = item[label];
  });

  return { ...obj };
};
