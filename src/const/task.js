// 任务状态
export const TaskStatus = {
  PREPARE: 'PREPARE',
  DOING: 'DOING',
  FINISHED: 'FINISHED',
  CLOSE: 'CLOSE',
};

export const TaskStatusText = {
  [TaskStatus.PREPARE]: '准备中',
  [TaskStatus.DOING]: '作业中',
  [TaskStatus.FINISHED]: '已完结',
  [TaskStatus.CLOSE]: '已关闭',
};

// 任务类型
export const TaskType = {
  PICKING: 'PICKING', // 出库-拣货
  PART_PICKING: 'PART_PICKING', // 出库-分拣
  RECHECKED: 'RECHECKED', // 出库-复核
  GATHER: 'GATHER', // 出库-集货
  LOADING: 'LOADING', // 出库-装车
  TRANSPORT: 'TRANSPORT', // 出库--发运
  MOVE: 'MOVE', // 出库-移动
  ACCEPTANCE: 'ACCEPTANCE', // 入库-验货
  UPPER_SHELF: 'UPPER_SHELF', // 入库-上架
  WAREHOUSING: 'WAREHOUSING', // 入库-入库
  TRANSFER_DOWN: 'TRANSFER_DOWN', // 移库移位-下货
  TRANSFER_UP: 'TRANSFER_UP', // 移库移位-上货
  COUNT: 'COUNT', // 盘点
  RECOUNT: 'RECOUNT', // 双人盘点
  TRANSFER_DIRECT: 'TRANSFER_DIRECT', // 直接移库
  DIFFERENCE_MOVE: 'DIFFERENCE_MOVE', // 差异回库
  ARRIVAL_REGISTRATION: 'ARRIVAL_REGISTRATION', // 入库-到货登记
  QUALITY_INSPECTION: 'QUALITY_INSPECTION', // 入库-车辆质检
  ACCEPT_UNLOADING_GOODS: 'ACCEPT_UNLOADING_GOODS', // 入库-卸货
  DELIVER_QUALITY_INSPECTION: 'DELIVER_QUALITY_INSPECTION', // 出库-质检
  FIRST_COUNT: 'FIRST_COUNT', // 在库-初盘
  REDO_COUNT: 'REDO_COUNT', // 在库-复盘
  ADJUST_REVIEW: 'ADJUST_REVIEW', // 在库-调整审核
  DESTRUCTION: 'DESTRUCTION', // 销毁申请
  TRANSFER_RECHECKED: 'TRANSFER_RECHECKED', // 移库复核
  EX_CENTER_PICK: 'EX_CENTER_PICK', // 异常处理-拣货
  EX_CENTER_PART_PICK: 'EX_CENTER_PART_PICK', // 异常处理-分拣
  ORDER_PICKING: 'ORDER_PICKING', // 订单拣货
  EXTRA_ATTRIBUTE_SHIP: 'EXTRA_ATTRIBUTE_SHIP',
  RECEIPT_TURNOVER_BASKET: 'RECEIPT_TURNOVER_BASKET',
  EXTRA_ATTRIBUTE_RETURN: 'EXTRA_ATTRIBUTE_RETURN',
  TURNOVER_BASKET_RETURN: 'TURNOVER_BASKET_RETURN',
};

export const TaskTypeText = {
  [TaskType.ARRIVAL_REGISTRATION]: '入库-到货登记', // 入库-到货登记
  [TaskType.QUALITY_INSPECTION]: '入库-车辆质检', // 入库-车辆质检
  [TaskType.ACCEPT_UNLOADING_GOODS]: '入库-卸货', // 入库-卸货
  [TaskType.ACCEPTANCE]: '入库-到货验收', // 入库-到货验收
  [TaskType.UPPER_SHELF]: '入库-上架', // 入库-上架
  [TaskType.PICKING]: '出库-拣货', // 出库-拣货
  [TaskType.PART_PICKING]: '出库-分拣', // 出库-分拣
  [TaskType.RECHECKED]: '出库-复核', // 出库-复核
  [TaskType.GATHER]: '出库-集货', // 出库-集货
  [TaskType.LOADING]: '出库-装车', // 出库-装车
  [TaskType.TRANSPORT]: '出库-发运', // 出库--发运
  [TaskType.MOVE]: '出库-移动', // 出库-移动
  [TaskType.WAREHOUSING]: '入库-入库', // 入库-入库
  [TaskType.TRANSFER_DOWN]: '在库-移库下架', // 在库 - 移库下架
  [TaskType.TRANSFER_UP]: '在库-移库上架', // 在库 - 移库上架
  [TaskType.RECOUNT]: '双人盘点', // 双人盘点
  [TaskType.DELIVER_QUALITY_INSPECTION]: '出库-质检', // 出库-质检
  [TaskType.FIRST_COUNT]: '在库-初盘', // 在库-初盘
  [TaskType.REDO_COUNT]: '在库-复盘', // 在库-复盘
  [TaskType.COUNT]: '在库-盘点确认', // 在库-盘点确认
  [TaskType.ADJUST_REVIEW]: '在库-调整审核', // 在库 - 调整审核
  [TaskType.TRANSFER_DIRECT]: '直接移库', // 直接移库
  [TaskType.DIFFERENCE_MOVE]: '差异回库', // 差异回库
  [TaskType.EX_CENTER_PICK]: '异常处理-拣货', // 异常处理-拣货
  [TaskType.EX_CENTER_PART_PICK]: '异常处理-分拣', // 异常处理-分拣
  [TaskType.EXTRA_ATTRIBUTE_SHIP]: '出库-周转品发运', //
  [TaskType.RECEIPT_TURNOVER_BASKET]: '入库-周转品验收', //
  [TaskType.EXTRA_ATTRIBUTE_RETURN]: '出库-回筐任务', //
  [TaskType.TURNOVER_BASKET_RETURN]: '入库-回框验收', //
};

export const TaskTypeTextOptions = {
  [TaskType.ARRIVAL_REGISTRATION]: '入库-到货登记', // 入库-到货登记
  [TaskType.QUALITY_INSPECTION]: '入库-车辆质检', // 入库-车辆质检
  [TaskType.ACCEPT_UNLOADING_GOODS]: '入库-卸货', // 入库-卸货
  [TaskType.ACCEPTANCE]: '入库-到货验收', // 入库-到货验收
  [TaskType.UPPER_SHELF]: '入库-上架', // 入库-上架
  [TaskType.PICKING]: '出库-拣货', // 出库-拣货
  [TaskType.PART_PICKING]: '出库-分拣', // 出库-分拣
  [TaskType.RECHECKED]: '出库-复核', // 出库-复核
  [TaskType.LOADING]: '出库-装车', // 出库-装车
  [TaskType.DELIVER_QUALITY_INSPECTION]: '出库-质检', // 出库-质检
  [TaskType.MOVE]: '出库-移动', // 出库-移动
  [TaskType.COUNT]: '在库-盘点确认', // 在库-盘点确认
  [TaskType.ADJUST_REVIEW]: '在库-调整审核', // 在库 - 调整审核
  [TaskType.TRANSFER_DOWN]: '在库-移库下架', // 在库 - 移库下架
  [TaskType.TRANSFER_UP]: '在库-移库上架', // 在库 - 移库上架
  [TaskType.RECOUNT]: '双人盘点', // 双人盘点
  [TaskType.TRANSFER_DIRECT]: '直接移库', // 直接移库
  [TaskType.DIFFERENCE_MOVE]: '差异回库', // 差异回库
  [TaskType.DESTRUCTION]: '销毁申请',
  [TaskType.TRANSFER_RECHECKED]: '移库复核',
  [TaskType.EX_CENTER_PICK]: '异常处理-拣货', // 异常处理拣货
  [TaskType.EX_CENTER_PART_PICK]: '异常处理-分拣', // 异常处理分拣
  [TaskType.EXTRA_ATTRIBUTE_SHIP]: '出库-周转品发运', //
  [TaskType.RECEIPT_TURNOVER_BASKET]: '入库-周转品验收', //
  [TaskType.EXTRA_ATTRIBUTE_RETURN]: '出库-回筐任务', //
  [TaskType.TURNOVER_BASKET_RETURN]: '入库-回框验收', //
};

// 单据类型
export const BillType = {
  STORE: 'STORE',
  MOVE: 'MOVE',
  COUNT: 'COUNT',
  WAVE: 'WAVE',
  TRANSFER: 'TRANSFER',
  DESTRUCTION: 'DESTRUCTION',
  EX_CENTER: 'EX_CENTER',
  EX_CENTER_PART_PICK: 'EX_CENTER_PART_PICK',
};

export const BillTypeText = {
  [BillType.STORE]: '入库',
  [BillType.MOVE]: '移动',
  [BillType.COUNT]: '盘点',
  [BillType.WAVE]: '波次',
  [BillType.DESTRUCTION]: '销毁申请',
  [BillType.EX_CENTER]: '拣货异常处理单',
  [BillType.EX_CENTER_PART_PICK]: '分拣异常处理单',
};

// 入库单类型
export const StoreBillType = {
  ORDER: 'ORDER',
  RETURNED: 'RETURNED',
  REJECTED: 'REJECTED',
  TRANSFER: 'TRANSFER',
  SETUP: 'SETUP',
  VIRTUAL: 'VIRTUAL',
  THROUGH: 'THROUGH',
  OTHER: 'OTHER',
};

export const StoreBillTypeText = {
  [StoreBillType.ORDER]: '订单入库',
  [StoreBillType.RETURNED]: '客退入库',
  [StoreBillType.REJECTED]: '拒收入库',
  [StoreBillType.TRANSFER]: '调拨入库',
  [StoreBillType.SETUP]: '期初建账',
  [StoreBillType.VIRTUAL]: '虚拟入库',
  [StoreBillType.THROUGH]: '经由品入库',
  [StoreBillType.OTHER]: '其它入库',
};
