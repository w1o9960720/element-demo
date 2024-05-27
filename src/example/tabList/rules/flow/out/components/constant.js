// 启用关闭状态
export const enableShutdownState = [
  {
    label: '是',
    value: 'ENABLED',
  },
  {
    label: '否',
    value: 'DISABLED',
  },
];
// 是否可预占在途库存
export const useTransportationInventory = [
  {
    label: '是',
    value: true,
    disabled: true,
  },
  {
    label: '否',
    value: false,
    disabled: true,
  },
];
// 任务分组方式
export const taskGroupType = [
  {
    label: '按温层',
    value: 'TEMPERATURE_LAYER',
    notChange: true,
  },
  {
    label: '按是否越库',
    value: 'CROSS_DOCKING',
    notChange: true,
  },
  {
    label: '按货主',
    value: 'CUSTOMER',
    notChange: true,
  },
  {
    label: '按逻辑区',
    value: 'ABSTRACT_ZONE',
    notChange: false,
  },
  {
    label: '按库区',
    value: 'ZONE',
    notChange: false,
  },
  {
    label: '按巷道',
    value: 'ROADWAY',
    notChange: false,
  },
  {
    label: '解冻标识',
    value: 'UN_FREEZE',
    notChange: false,
  },
];
// 是否分配集货位
export const useGatherGoodsPlace = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];
// 温层
export const temperatureLayers = [
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
// 任务分配方式
export const taskDistributionTypeEnum = [
  {
    label: '手动领取',
    value: 'MANUAL',
  },
  {
    label: '自动领取',
    value: 'AUTOMATIC',
  },
];
// 是否分越库
export const crossDocking = [
  {
    label: '不区分',
    value: 'ALL',
  },
  {
    label: '越库',
    value: 'CROSS',
  },
  {
    label: '不越库',
    value: 'NO_CROSS',
  },
];
export const crossDockingEN = {
  ALL: 'ALL',
  CROSS: 'CROSS',
  NO_CROSS: 'NO_CROSS',
};
// 是否区分温层
export const temperatureLayer = [
  {
    label: '不区分',
    value: 'ALL',
  },
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
export const BatchOrders = [
  {
    label: '波次下发时',
    value: 'WAVE_ALLOCATE',
  },
  {
    label: '总拣时',
    value: 'TOTAL_PICK',
  },
];
export const temperatureLayerEN = {
  ALL: 'ALL',
  NORMAL: 'NORMAL',
  REFRIGERATE: 'REFRIGERATE',
  COLD: 'COLD',
  CONSTANT: 'CONSTANT',
};
// 是否包含多订单
export const multiOrderType = [
  {
    label: '不区分',
    value: 'ALL',
  },
  {
    label: '1个订单',
    value: 'ORDER',
  },
  {
    label: '1条线路',
    value: 'LINE',
  },
  {
    label: '多条线路',
    value: 'MULTI_LINE',
  },
];
export const multiOrderTypeEN = {
  ALL: 'ALL',
  ORDER: 'ORDER',
  LINE: 'LINE',
  MULTI_LINE: 'MULTI_LINE',
};
// 是否应用分拣
export const sorting = [
  {
    label: '启用',
    value: true,
  },
  {
    label: '不启用',
    value: false,
  },
];
export const waveGroupType = [
  {
    label: '按货主',
    value: 'SHIPPER',
  },
  // {
  //   label: '按线路',
  //   value: 'LINK',
  // },
  // { // api文档上为线路顺序
  //   label: '按线路+装车顺序',
  //   value: 'LINE_SORT',
  // },
  {
    label: '按订单',
    value: 'DELIVER_ORDER',
  },
];
export const chooseAll = 'ALL';
export const configSortingKeys = {
  CROSS_DOCKING: 'crossDocking',
  TEMPERATURE_LAYER: 'temperatureLayer',
  MULTI_ORDER_TYPE: 'multiOrderType',
};
