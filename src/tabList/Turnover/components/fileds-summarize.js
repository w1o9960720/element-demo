import { FormType } from '@/const/form';
import { YMDHM } from '@/const/timeFormat';

export const TABLECOLUMN = [
  {
    label: '周转品名称',
    prop: 'attributeName',
    minWidth: 180,
  },
  {
    label: '货主',
    prop: 'shipperName',
    minWidth: 160,
  },
  {
    label: '汇总数量',
    prop: 'totalNum',
    minWidth: 120,
  },
  {
    label: '在库库存',
    prop: 'warehouseNum',
    minWidth: 100,
  },
  {
    label: '在途库存',
    prop: 'storeTransitNum',
    minWidth: 120,
  },
  {
    label: '门店库存',
    prop: 'storeNum',
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
    label: '完成时间点',
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
