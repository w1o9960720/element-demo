import joinToString from './unit';

export const WAREHOUSE = [
  {
    label: '--请选择--',
    value: undefined,
  },
  {
    label: '双手1仓',
    value: '双手1仓',
  },
  {
    label: '成鲜成都1仓',
    value: '成鲜成都1仓',
  },
];
export const TabNameList = [
  {
    label: '上架规则',
    name: 'LISTING_RULES',
  },
  {
    label: '分配规则',
    name: 'DISTRIBUTION_RULES',
  },
  {
    label: '补货规则',
    name: 'REPLENISHMENT_RULES',
  },
];

// 任务分组方式
export const taskGroupType = [
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
];
export const TabNameEng = {
  DISTRIBUTION_RULES: 'DISTRIBUTION_RULES',
  REPLENISHMENT_RULES: 'REPLENISHMENT_RULES',
  LISTING_RULES: 'LISTING_RULES',
};
// 规则编辑查看页面路由
export const RuleDetailPath = {
  DISTRIBUTION_RULES: '/wms/rules/rule/distribution',
  REPLENISHMENT_RULES: '/wms/rules/rule/replenishment',
  LISTING_RULES: '/wms/rules/rule/listing',
};
// 是否自动执行DISABLED为注销（否），ENABLED为启用（是）
export const Automatic = {
  DISABLED: '否',
  ENABLED: '是',
};
// 是否自动执行DISABLED为注销（否），ENABLED为启用（是）
export const AutomaticEng = {
  DISABLED: 'DISABLED',
  ENABLED: 'ENABLED',
};
// 触发补货条件
export const REPLENISHMENT_CONDITION_ENUM = [
  {
    label: '低于拣货区安全库存',
    value: 'LOWER_THAN_THE_SAFETY_STOCK_PICKING',
  },
];
// 补货量基准
export const REPLENISHMENT_DATUM = [
  {
    label: '最大存量',
    value: 'STOCK_MAX',
  },
  {
    label: '最低存量',
    value: 'STOCK_MIN',
  },
];
// 执行方式
export const IMPLEMENTATION_MODE = {
  INTERVAL_EXECUTION: '间隔执行',
  REGULAR_EXECUTION: '定时执行',
};
// 跳转页面类型VIEW查看，EDIT编辑
export const PAGE_TYPE = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};
export const ThermosphereCN = {
  NORMAL: '常温',
  REFRIGERATE: '冷藏',
  COLD: '冷冻',
  CONSTANT: '恒温',
};
export const STORE_UNIT_ENUM = {
  PART: '拆零',
  WHOLE_BOX: '整箱',
  WHOLE_BRACKET: '整托',
};
export const RECEIPT_TYPE_ENUM = {
  ORDER: '订单入库',
  RETURNED: '退货入库',
  REJECTED: '拒收入库',
  TRANSFER: '调拨入库',
  OTHER: '其它入库',
  MOVE: '移库移位',
  ADVENT_MOVE: '临期移库',
};
export const DELIVER_TYPE_ENUM = {
  ORDER_OUT: '订单出库',
  ALLOT_OUT: '调拨出库',
  ADJUST_OUT: '调整出库',
  INVENTORY_LESS: '盘亏出库',
  DESTROY_OUT: '销毁出库',
  CANCEL_OUT: '退供出库',
  TEMPORARY_OUT: '零担出库',
  OTHER_IT_OUT: '其它出库',
  OTHER_HE_OUT: '其他出库',
  JYP_OUT: '经由品出库',
  DAILY_REPLENISHMENT: '日常补货',
  EMERGENCY_REPLENISHMENT: '紧急补货',
};
export const RECOMMEND_RULES_ENUM = {
  TARGET_LOCATION: '01-在目标库区查找合适储位',
  APPOINTED_STOCK_UP_LOCATION: '02-从SKU指定的备货位查找合适库位',
  APPOINTED_PICKING_LOCATION: '03-从SKU指定的拣货位查找合适库位',
  PICKING_STORAGE_LOCATION: '04-从所有拣选区和备货区查找合适库位',
};
export const PRIORITY_ENUM = {
  EMPTY_LOCATION: '空库位',
  SAME_GOODS: '同品',
  SAME_BATCH_NO: '同批次',
};
export const EMPTY_RULES_ENUM = {
  ASC: '按上架顺序号顺序',
  DESC: '按上架顺序号倒序',
};
// 库位是否禁用
export const warehouseZoneCode = {
  ENABLED: '1',
  DISABLED: '0',
};
export const listingRulesTable = (goodsQualityList) => {
  const QUALITY_ENUM = {};
  goodsQualityList.forEach((item) => {
    QUALITY_ENUM[item.code] = item.name;
  });
  return [
    {
      prop: 'preCondition.quality',
      label: '货品质量',
      attrs: {
        minWidth: '100px',
        formatter: ({ preCondition }) => joinToString(preCondition.quality, QUALITY_ENUM),
      },
    },
    {
      prop: 'preCondition.storeUnit',
      label: '存放单位',
      attrs: {
        minWidth: '140px',
        formatter: ({ preCondition }) => joinToString(preCondition.storeUnit, STORE_UNIT_ENUM),
      },
    },
    {
      prop: 'preCondition.orderType',
      label: '单据类型',
      attrs: {
        minWidth: '180px',
        formatter: ({ preCondition }) => joinToString(preCondition.orderType, RECEIPT_TYPE_ENUM),
      },
    },
    {
      prop: 'preCondition.temperatureLayer',
      label: '温层',
      attrs: {
        minWidth: '160px',
        formatter: ({ preCondition }) =>
          joinToString(preCondition.temperatureLayer, ThermosphereCN),
      },
    },
    {
      prop: 'recommendRuleType',
      label: '预定义推荐规则',
      attrs: {
        minWidth: '180px',
        formatter: ({ recommendRuleType }) => RECOMMEND_RULES_ENUM[recommendRuleType],
      },
    },
    {
      prop: 'priorityRules',
      label: '推荐库位优先顺序',
      attrs: {
        minWidth: '180px',
        formatter: ({ priorityRules }) => joinToString(priorityRules, PRIORITY_ENUM, '>>'),
      },
    },
    {
      prop: 'storehouseSortRule',
      label: '库位排序规则',
      attrs: {
        minWidth: '160px',
        formatter: ({ storehouseSortRule }) => EMPTY_RULES_ENUM[storehouseSortRule],
      },
    },
  ];
};
