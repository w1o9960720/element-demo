import {
  STORE_UNIT_ENUM, RECEIPT_TYPE_ENUM,
  RECOMMEND_RULES_ENUM,
  PRIORITY_ENUM,
  EMPTY_RULES_ENUM,
  DELIVER_TYPE_ENUM,
} from '../constant';

const formatKeyValueArray = (obj) => Object.keys(obj).map((key) => ({
  value: key,
  label: obj[key],
}));

export const storeUnit = formatKeyValueArray(STORE_UNIT_ENUM);
export const DELIVER_TYPE = formatKeyValueArray(DELIVER_TYPE_ENUM);
export const RECEIPT_TYPE = formatKeyValueArray(RECEIPT_TYPE_ENUM);
export const RECOMMEND_RULES = formatKeyValueArray(RECOMMEND_RULES_ENUM);
export const PRIORITY = formatKeyValueArray(PRIORITY_ENUM);
export const EMPTY_RULES = formatKeyValueArray(EMPTY_RULES_ENUM);
// 温层
export const Thermosphere = [
  {
    label: '常温',
    value: 'NORMAL',
  },
  {
    label: '冷藏',
    value: 'REFRIGERATE',
  },
  {
    label: '冷冻',
    value: 'COLD',
  },
  {
    label: '恒温',
    value: 'CONSTANT',
  },
];
export const locationRange = [
  {
    label: '所有拣货区',
    value: 'PICKING_LOCATION',
  },
  {
    label: '所有备货区',
    value: 'STORAGE_LOCATION',
  },
  {
    label: '所有拣选区和备货区',
    value: 'PICKING_STORAGE_LOCATION',
  },
  {
    label: '自定义库位范围',
    value: 'CUSTOM_LOCATION',
  },
];

// 限定范围类型(文档虚拟库区就是逻辑区)
export const stockScopeTypeEnumEN = {
  ZONE: 'ZONE',
  STOREHOUSE: 'STOREHOUSE',
  ABSTRACT_ZONE: 'ABSTRACT_ZONE',
};
export const stockScopeTypeEnumCN = {
  ZONE: '指定库区',
  STOREHOUSE: '指定库位',
  ABSTRACT_ZONE: '指定逻辑区',
};
// 排序规则（接口中枚举错误）
export const sortRules = [
  {
    label: '由小到大',
    value: 'ASC',
  },
  {
    label: '由大到小',
    value: 'DESC',
  },
];
export const sortRulesCN = {
  ASC: '由小到大',
  DESC: '由大到小',
};
// 自定义优先规则
export const customizeRuleOptions = [
  {
    label: '先整后零',
    value: 'ROUND_OUT_FIRST',
  },
  {
    label: '先零后整',
    value: 'ZERO_OUT_FIRST',
  },
  {
    label: '库位顺序号',
    value: 'LOCATION_ORDER',
  },
];
export const customizeRuleCN = {
  ROUND_OUT_FIRST: '先整后零',
  ZERO_OUT_FIRST: '先零后整',
  LOCATION_ORDER: '库位顺序号',
};
