import { formatKeyValueObject } from '@/util/base';

const NORMAL = {
  name: '常温',
  code: '1',
  alias: 'CW',
  layer: 'NORMAL',
};
const COLD = {
  name: '冷冻',
  code: '2',
  alias: 'LD',
  layer: 'COLD',
};
const REFRIGERATE = {
  name: '冷藏',
  code: '3',
  alias: 'LC',
  layer: 'REFRIGERATE',
};
const CONSTANT = {
  name: '恒温',
  code: '4',
  alias: 'HW',
  layer: 'CONSTANT',
};
export const JD = {
  name: '解冻',
  code: '-1',
  alias: 'JD',
  // 此layer目前为假数据，后期如有更新再更改
  layer: 'JD',
};
// 此项只应用于某些打印项中，其余地方温层并不包括解冻
export const TEMPERATURE_LAYER = [
  { ...JD },
  { ...NORMAL },
  { ...COLD },
  { ...REFRIGERATE },
  { ...CONSTANT },
];

export const TemperatureLayerType = {
  [NORMAL.layer]: NORMAL.name,
  [COLD.layer]: COLD.name,
  [REFRIGERATE.layer]: REFRIGERATE.name,
  [CONSTANT.layer]: CONSTANT.name,
};

/**
 * 
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
