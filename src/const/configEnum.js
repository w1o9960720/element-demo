import { isNaN } from 'lodash';

/**
 * 转换select options
 * @param {Object}map
 * @return {{label: key, value: number(value)}[]}
 */
export const transOptionsByMap = (map, type) => {
  const entries = Object.entries(map || {});
  return entries.map(([value, label]) => {
    const num = Number(value);
    return {
      label,
      value: isNaN(num) || type === 'string' ? value : num,
    };
  });
};

// 自定义
export const ManageMap = {
  0: '否',
  1: '是',
};

export const StatusMap = {
  1: '启用',
  0: '禁用',
};

export const TaxRateMap = {
  1: '1%',
  3: '3%',
  6: '6%',
  9: '9%',
  13: '13%',
};

export const AssetToUseMap = {
  1: '仓库用',
  2: '车辆用',
};

export const SettleTypeMap = {
  DAY: '每日生成',
  MONTH: '每月生成',
};
export const CostSettleTypeMap = {
  1: '单价',
  2: '总价',
};
// 待发送 对账中 已经对账 已经退回
// ['READY_CHECK', 'CHECKING', 'CHECKED', 'RETURN_BACK'];
export const RentBillStatusMap = {
  READY_CHECK: '待发送',
  CHECKING: '对账中',
  CHECKED: '已对账',
  RETURN_BACK: '已退回',
};
// 有效 作废 已归集
// ['VALID', 'CANCEL', 'COLLECTED'];
export const DtlStatusMap = {
  VALID: '有效',
  CANCEL: '已作废',
  COLLECTED: '已归集',
};
export const WorkUseStatusMap = {
  IDLE: '闲置中',
  USING: '使用中',
};
export const BillTypeMap = {
  STORE: '存储单',
  RECEIPT: '入库单',
  DELIVER: '出库单',
  OTHER: '其他',
};
export const ClearingStatusMap = {
  CHECKED: '已生成账单',
  CANCEL: '已作废',
  READY_CHECK: '待生成对账',
};
export const InvoicingStatusMap = {
  WAIT_INVOICING: '待开票',
  SOME_INVOICING: '部分开票',
  INVOICED: '已开票',
};
export const PaymentStatusMap = {
  WAIT_PAYMENT: '待回款',
  SOME_PAYMENT: '部分回款',
  PAYMENTED: '已回款',
};
