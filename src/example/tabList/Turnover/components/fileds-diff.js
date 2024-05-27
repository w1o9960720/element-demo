import { FormType } from '@/const/form';
import momentUtils from '@/util/moment';
import { YMDHM } from '@/const/timeFormat';
import { Dict, operationType, operationTypeEnum } from './config';

export const TABLECOLUMN = [
  {
    label: '完成时间',
    prop: 'endTime',
    minWidth: 180,
    formatter: ({ endTime }) => momentUtils.format(endTime) || '-',
  },
  {
    label: '周转品名称',
    prop: 'attributeName',
    minWidth: 160,
  },
  {
    label: '货主',
    prop: 'shipperName',
    minWidth: 160,
  },
  {
    label: '差异节点',
    prop: 'attributeSource',
    minWidth: 120,
  },
  {
    label: '类型',
    prop: 'operationType',
    minWidth: 100,
    formatter: ({ operationType: value }) => operationTypeEnum[value] || '-',
  },
  {
    label: '差异量',
    prop: 'differenceNum',
    minWidth: 120,
  },
  {
    label: '处理人',
    prop: 'operatorStaffName',
    minWidth: 120,
  },
];

export const serchFields = [
  {
    label: '周转品名称',
    prop: 'attributeName',
    component: FormType.INPUT,
  },
  {
    label: '货主',
    prop: 'shipperId',
  },
  {
    label: '类型',
    prop: 'operationType',
    component: FormType.SELECT,
    options: operationType(Dict.Diff),
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
];
