import { FormType } from '@/const/form';
import { TaskTypeTextOptions } from '@/const/task';
import { OPERATION_TYPE, OPERATION_TYPE_OPTION } from '../constant';
import { BIZ_TYPE } from '../task-management/constant';

const moment = require('moment');

const WAREHOUSE_STATUS = [
  {
    label: '启用',
    code: '1',
    value: 'ENABLED',
  },
  {
    label: '禁用',
    code: '0',
    value: 'DISABLED',
  },
];
const SEARCH_FIELD = [
  {
    label: '任务号',
    prop: 'taskNo',
    component: FormType.INPUT,
  },
  {
    label: '任务类型',
    prop: 'taskType',
    component: FormType.SELECT,
  },
  {
    label: '作业方式',
    prop: 'operationType',
    component: FormType.SELECT,
    options: OPERATION_TYPE_OPTION,
  },
  {
    label: '货主',
    prop: 'shipperName',
    component: FormType.INPUT,
  },
  {
    label: '来源单据类型',
    prop: 'bizType',
    component: FormType.SELECT,
  },
  {
    label: '来源单据号',
    prop: 'bizNo',
    component: FormType.INPUT,
  },
  {
    label: '作业完成时间',
    prop: 'endTime',
    component: FormType.DATE_PICKER,
    componentAttrs: {
      type: 'datetimerange',
      default: [],
    },
  },
];

export { WAREHOUSE_STATUS, SEARCH_FIELD };
export const TABLECOLUMN = [
  {
    label: '序号',
    type: 'index',
    width: 60,
    fixed: 'left',
  },
  {
    label: '任务号',
    prop: 'taskNo',
    width: 200,
    sortable: 'custom',
  },
  {
    label: '任务类型',
    minWidth: 120,
    prop: 'taskType',
    formatter: (row) => {
      let taskTypeName = '';
      if (row.taskType) {
        taskTypeName = TaskTypeTextOptions[row.taskType];
      }
      return taskTypeName;
    },
  },
  {
    label: '作业方式',
    width: 100,
    prop: 'operationType',
    formatter: (row) => {
      let name = '';
      if (row.operationType) {
        name = OPERATION_TYPE[row.operationType].name;
      }
      return name;
    },
  },
  {
    label: '货主',
    prop: 'shipperName',
    width: 160,
  },
  {
    label: '来源单据类型',
    width: 140,
    prop: 'bizType',
    formatter: (row) => {
      const findItem = BIZ_TYPE.find((item) => item.value === row.bizType);
      let name = '';
      if (findItem) {
        name = findItem.label;
      }
      return name;
    },
  },
  {
    label: '来源单据号',
    prop: 'bizNo',
    width: 180,
  },
  {
    label: '任务创建时间',
    minWidth: 170,
    prop: 'createTime',
    formatter: (row) =>
      row.createTime ? moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') : '-',
  },
  {
    label: '任务分配时间',
    minWidth: 180,
    prop: 'receiveTime',
    sortable: 'custom',
    formatter: (row) =>
      row.receiveTime ? moment(row.receiveTime).format('YYYY-MM-DD HH:mm:ss') : '-',
  },
  {
    label: '作业开始时间',
    minWidth: 170,
    prop: 'startTime',
    sortable: 'custom',
    formatter: (row) => (row.startTime ? moment(row.startTime).format('YYYY-MM-DD HH:mm:ss') : '-'),
  },
  {
    label: '作业完成时间',
    minWidth: 170,
    prop: 'endTime',
    sortable: 'custom',
    formatter: (row) => (row.endTime ? moment(row.endTime).format('YYYY-MM-DD HH:mm:ss') : '-'),
  },
];
