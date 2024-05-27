// 订单类型下拉列表(入库)
export const IN_ORDER_TYPE = [
  {
    label: '--请选择--',
    value: undefined,
  },
  {
    label: '订单入库',
    value: 'ORDER',
  },
  {
    label: '客退入库',
    value: 'RETURNED',
  },
  {
    label: '拒收入库',
    value: 'REJECTED',
  },
  {
    label: '调拨入库',
    value: 'TRANSFER',
  },
  {
    label: '期初建账',
    value: 'SETUP',
  },
  {
    label: '经由品入库',
    value: 'THROUGH',
  },
  {
    label: '其它入库',
    value: 'OTHER',
  },
];
export const OUT_DELIVER_TYPE = [
  {
    label: '--请选择--',
    value: undefined,
  },
  {
    value: 'ORDER_OUT',
    label: '订单出库',
  },
  {
    value: 'ALLOT_OUT',
    label: '调拨出库',
  },
  {
    value: 'SHIFT_PARKING_OUT',
    label: '移库移位(出)',
  },
  {
    value: 'ADJUST_OUT',
    label: '调整出库',
  },
  {
    value: 'INVENTORY_LESS',
    label: '盘亏出库',
  },
  {
    value: 'DESTROY_OUT',
    label: '销毁出库',
  },
  {
    value: 'CANCEL_OUT',
    label: '退供出库',
  },
  {
    value: 'TOTAL_PICK_DOWN',
    label: '总拣下架',
  },
  {
    value: 'TEMPORARY_OUT',
    label: '零担出库',
  },
  {
    value: 'OTHER_IT_OUT',
    label: '其它出库',
  },
  {
    value: 'OTHER_HE_OUT',
    label: '其他出库',
  },
  {
    value: 'ALLOT_OUT_BOUND_IN',
    label: '调拨出库(库内)',
  },
];
// 货主下拉列表
export const CARGO_OWNER = [
  {
    label: '--请选择--',
    value: undefined,
  },
];
// 入库流程排序字段
export const UPDATETIME_DESC = 'updateTime__DESC';
// tab切换按钮名称列表
export const TabNameList = [
  {
    label: '入库流程',
    name: 'WAREHOUSING_PROCESS',
  },
  {
    label: '出库流程',
    name: 'OUTBOUND_PROCESS',
  },
];
// tab切换按钮对应中文
export const TabNameEng = {
  OUTBOUND_PROCESS: 'OUTBOUND_PROCESS',
  WAREHOUSING_PROCESS: 'WAREHOUSING_PROCESS',
};
// 编辑查看页面路由
export const RuleDetailPath = {
  OUTBOUND_PROCESS: '/wms/rules/flow/out',
  WAREHOUSING_PROCESS: '/wms/rules/flow/in',
};
// 跳转页面类型VIEW查看，EDIT编辑
export const PAGE_TYPE = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};
// 出库流程配置按钮
export const flowPath = {
  ORDER_APPROVAL_APPOINTMENT: 'ORDER_APPROVAL_APPOINTMENT',
  CREATE_WAVES: 'CREATE_WAVES',
  PICKING: 'PICKING',
  SORTING: 'SORTING',
  REVIEW: 'REVIEW',
  STORE_GOODS: 'STORE_GOODS',
  GET_INTO_CAR: 'GET_INTO_CAR',
  TRANSPORT: 'TRANSPORT',
};
export const outboundProcessStep = [
  {
    name: '订单创建',
    uri: 'ORDER_APPROVAL_APPOINTMENT',
  },
  {
    name: '创建波次',
    uri: 'CREATE_WAVES',
  },
  {
    name: '拣货',
    uri: 'PICKING',
  },
  {
    name: '分拣',
    uri: 'SORTING',
  },
  {
    name: '复核',
    uri: 'REVIEW',
  },
  {
    name: '装车',
    uri: 'GET_INTO_CAR',
  },
  {
    name: '发运',
    uri: 'TRANSPORT',
  },
];
// 入库流程配置按钮
export const warehousingFlowPath = {
  ORDER_APPROVAL_APPOINTMENT: 'ORDER_APPROVAL_APPOINTMENT',
  ARRIVAL_REGISTRATION: 'ARRIVAL_REGISTRATION',
  CHECK_AND_ACCEPT: 'CHECK_AND_ACCEPT',
  WAREHOUSING: 'WAREHOUSING',
  GROUNDING: 'GROUNDING',
};
export const warehousingStep = [
  {
    name: '到货登记',
    uri: 'ARRIVAL_REGISTRATION',
  },
  {
    name: '验收',
    uri: 'CHECK_AND_ACCEPT',
  },
  // {
  //   name: '入库',
  //   uri: 'WAREHOUSING',
  // },
  {
    name: '上架',
    uri: 'GROUNDING',
  },
];
