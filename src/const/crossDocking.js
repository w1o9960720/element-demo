import { formatKeyValueObject } from '@/util/base';
// 是否越库
const CROSS_DOCKING = [
  {
    value: true,
    code: 1, // 1.0 越库
    label: '是',
  },
  {
    value: false,
    code: 0,
    label: '否',
  },
];
const CROSS_DOCKING_ENUM = formatKeyValueObject(CROSS_DOCKING);
// 1.0 转2.0
const CROSS_DOCKING_CONVERT = formatKeyValueObject(CROSS_DOCKING, {
  value: 'code',
  label: 'value',
});
export { CROSS_DOCKING, CROSS_DOCKING_ENUM, CROSS_DOCKING_CONVERT };
