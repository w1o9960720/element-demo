import { formatKeyValueObject } from '@/util/base';
import { TEMPERATURE_LAYER, JD } from '@/const/temperatureLayer';

/**
 * 返回温区
 * @param {string} temperature  -温度key
 * @param {object} keyObj - 格式化规则 默认{value:'layer',label:'name'} name/code/alias/layer
 * @param {boolean} isUnFreeze - 是否解冻 默认false
 * @returns {string} 格式化后对应属性值
 */
export default function temperatureLayer(temperature, keyObj = {}, isUnFreeze = false) {
  const { value = 'layer', label = 'name' } = keyObj;
  if (isUnFreeze) {
    return JD.name;
  }
  return formatKeyValueObject(TEMPERATURE_LAYER, { label, value })[temperature];
}
