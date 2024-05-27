// 库位推荐节点
export const recommendStorehouseOpportunityList = [
  {
    label: '验收时',
    value: 'ACCEPTING',
  },
  {
    label: '入库时',
    value: 'MOVING',
  },
];
// 是否
export const useBooleanState = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];
// 库位是否禁用
export const warehouseZoneCode = {
  ENABLED: '1',
  DISABLED: '0',
};
// 温层对应的暂存区
export const temporaryStorehouse = [
  {
    label: '常温',
    value: 'normalLocationId',
    code: 'normalLocationCode',
    temporary: 'NORMAL',
  },
  {
    label: '冷藏',
    value: 'refrigerateLocationId',
    code: 'refrigerateLocationCode',
    temporary: 'REFRIGERATE',
  },
  {
    label: '冷冻',
    value: 'coldLocationId',
    code: 'coldLocationCode',
    temporary: 'COLD',
  },
  {
    label: '恒温',
    value: 'constantLocationId',
    code: 'constantLocationCode',
    temporary: 'CONSTANT',
  },
];
