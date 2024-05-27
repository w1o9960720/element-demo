import { FormType } from '@/const/form';
import { YMDHM } from '@/const/timeFormat';
import moment from '@/util/moment';
import { formatKeyValueObject } from '@/util/base';

import { Dict, operationType, attributeSource, attributeSourceEnum } from './config';

const operationTypeEnum = (type) => formatKeyValueObject(operationType(type));

const endTime = {
  label: '完成时间',
  prop: 'endTime',
  minWidth: 180,
  formatter: ({ endTime: value }) => moment.format(value) || '-',
};
const bizId = {
  label: '业务单号',
  prop: 'bizNo',
  minWidth: 170,
};
const shipper = {
  label: '货主名称',
  prop: 'shipperName',
  minWidth: 160,
};
const typeDetail = (type) => ({
  label: '类型',
  prop: 'operationType',
  minWidth: 80,
  formatter: ({ operationType: value }) => operationTypeEnum(type)[value] || '-',
});
const source = {
  label: '来源',
  prop: 'attributeSource',
  minWidth: 100,
  formatter: ({ attributeSource: value }) => attributeSourceEnum[value] || '-',
};
const turnoverName = {
  label: '周转框名称',
  prop: 'attributeName',
  minWidth: 120,
};
const trueQuantity = {
  label: '实际数量',
  prop: 'actualNum',
  minWidth: 120,
};
const storeName = {
  label: '门店名称',
  prop: 'stationName',
  minWidth: 180,
};
const plateNO = {
  label: '车牌号',
  prop: 'plateNo',
  minWidth: 120,
};
const driver = {
  label: '司机姓名',
  prop: 'driverName',
  minWidth: 120,
};
const dispatchNo = {
  label: '派车单号',
  prop: 'shippingOrderNo',
  minWidth: 120,
};
const deliveryDate = {
  label: '送货日期',
  prop: 'sendTime',
  minWidth: 180,
  formatter: ({ sendTime }) => moment.format(sendTime) || '-',
};
const reservationNum = {
  label: '预约数量',
  prop: 'bookingNum',
  minWidth: 120,
};
const diffNum = {
  label: '差异数量',
  prop: 'differenceNum',
  minWidth: 120,
};
const operator = {
  label: '处理人',
  prop: 'operatorStaffName',
  minWidth: 120,
};
const factoryName = {
  label: '工厂',
  prop: 'stationName',
  minWidth: 180,
};
export const TABLECOLUMN = {
  [Dict.Warehouse]: [
    endTime,
    bizId,
    shipper,
    typeDetail(Dict.Warehouse),
    source,
    turnoverName,
    trueQuantity,
    operator,
    storeName,
  ],
  [Dict.Transportation]: [
    endTime,
    plateNO,
    driver,
    bizId,
    shipper,
    typeDetail(Dict.Transportation),
    source,
    dispatchNo,
    deliveryDate,
    turnoverName,
    reservationNum,
    trueQuantity,
    diffNum,
    storeName,
  ],
  [Dict.Shop]: [
    endTime,
    storeName,
    bizId,
    shipper,
    typeDetail(Dict.Shop),
    source,
    turnoverName,
    trueQuantity,
    operator,
  ],
  [Dict.Factory]: [
    endTime,
    factoryName,
    bizId,
    shipper,
    typeDetail(Dict.Factory),
    source,
    turnoverName,
    trueQuantity,
    operator,
  ],
};

export const serchFields = {
  [Dict.Warehouse]: [
    {
      label: '周转品名称',
      prop: 'attributeName',
      component: FormType.INPUT,
    },
    {
      label: '货主名称',
      prop: 'shipperId',
    },
    {
      label: '类型',
      prop: 'operationType',
      component: FormType.SELECT,
      options: operationType(Dict.Warehouse),
    },
    {
      label: '来源',
      prop: 'attributeSource',
      component: FormType.SELECT,
      options: attributeSource(Dict.Warehouse),
    },
    {
      label: '完成时间段',
      prop: 'time',
      component: FormType.DATE_PICKER,
      componentAttrs: {
        type: 'datetimerange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        format: YMDHM,
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
      },
    },
  ],
  [Dict.Transportation]: [
    {
      label: '周转品名称',
      prop: 'attributeName',
      component: FormType.INPUT,
    },
    {
      label: '车牌号',
      prop: 'plateNo',
      component: FormType.INPUT,
    },
    {
      label: '司机姓名',
      prop: 'driverName',
      component: FormType.INPUT,
    },
    {
      label: '货主名称',
      prop: 'shipperId',
      component: FormType.INPUT,
    },
    {
      label: '类型',
      prop: 'operationType',
      component: FormType.SELECT,
      options: operationType(Dict.Transportation),
    },
    {
      label: '来源',
      prop: 'attributeSource',
      component: FormType.SELECT,
      options: attributeSource(Dict.Transportation),
    },
    {
      label: '派车号',
      prop: 'shippingOrderNo',
      component: FormType.INPUT,
    },
    {
      label: '送货日期',
      prop: 'sendTime',
      component: FormType.DATE_PICKER,
    },
    {
      label: '完成时间段',
      prop: 'time',
      component: FormType.DATE_PICKER,
      componentAttrs: {
        type: 'datetimerange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        format: YMDHM,
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
      },
    },
  ],
  [Dict.Shop]: [
    {
      label: '周转品名称',
      prop: 'attributeName',
      component: FormType.INPUT,
    },
    {
      label: '门店名称',
      prop: 'stationName',
      component: FormType.INPUT,
    },
    {
      label: '货主名称',
      prop: 'shipperId',
      component: FormType.INPUT,
    },
    {
      label: '类型',
      prop: 'operationType',
      component: FormType.SELECT,
      options: operationType(Dict.Shop),
    },
    {
      label: '来源',
      prop: 'attributeSource',
      component: FormType.SELECT,
      options: attributeSource(Dict.Shop),
    },
    {
      label: '完成时间段',
      prop: 'time',
      component: FormType.DATE_PICKER,
      componentAttrs: {
        type: 'datetimerange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        format: YMDHM,
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
      },
    },
  ],
  [Dict.Factory]: [
    {
      label: '工厂名称',
      prop: 'stationName',
      component: FormType.INPUT,
    },
    {
      label: '货主名称',
      prop: 'shipperId',
      component: FormType.INPUT,
    },
    {
      label: '完成时间段',
      prop: 'time',
      component: FormType.DATE_PICKER,
      componentAttrs: {
        type: 'datetimerange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        format: YMDHM,
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
      },
    },
  ],
};
