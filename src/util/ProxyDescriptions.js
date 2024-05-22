// 和yun-descriptions配合使用
const ProxyObj = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => ProxyObj(item));
  }
  return new Proxy(obj, {
    get(target, key) {
      if (key === 'prop') {
        return (data) => {
          if (!data) return '-';
          if (Object.hasOwn(target, 'formatter')) {
            return Reflect.get(target, 'formatter').call(target, data);
          }

          return (Object.hasOwn(data, target[key]) && data[target[key]] !== null && data[target[key]] !== '') ? data[target[key]] : '-';
        };
      }
      return Reflect.get(target, key);
    },
  });
};

export default ProxyObj;
