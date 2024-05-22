import { useStore } from 'vuex';
/**
 *
 * 获取字典对应列表
 * @param {*} code 所需字典编码
 * @return
 */
export function getDictionary(code) {
  let searchList = [];
  const store = useStore();
  if (store.state.dictionary.DictionaryList) {
    store.state.dictionary.DictionaryList.forEach((res) => {
      if (res.dictionaryCode === code) {
        searchList = res.dictionaryValues;
      }
    });
  }
  return searchList;
}
/**
 *
 * 将字典code转化为对应的名字
 * @param {*} code 实际要变更的code
 * @param {*} dictCode 对应字典code
 * @return
 */
export function returnDictionaryCN(code, dictCode) {
  let returnDictionaryName = '';
  const dataList = getDictionary(dictCode);
  dataList.forEach((res) => {
    if (res.code === code) {
      returnDictionaryName = res.name;
    }
  });
  return returnDictionaryName;
}
