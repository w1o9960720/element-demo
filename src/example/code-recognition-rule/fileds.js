import { FormType } from '@/const/form';
import Moment from '@/util/moment';

export const TABLECOLUMN = [
  {
    label: '序号',
    type: 'index',
    width: 60,
    fixed: 'left',
  },
  {
    label: '码规则编码',
    prop: 'ruleCode',
  },
  {
    label: '码规则名称',
    prop: 'ruleName',
  },
  {
    label: '码类型',
    prop: 'barcodeType',
    formatter: (row) => (row.barcodeType === 'PALLET' ? '整托条码' : '箱条码'),
  },
  {
    label: '创建人',
    prop: 'createUserName',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ createTime }) => Moment.format(createTime),
    width: 200,
  },
  {
    label: '修改人',
    prop: 'updateUserName',
  },
  {
    label: '修改时间',
    prop: 'updateTime',
    formatter: ({ updateTime }) => Moment.format(updateTime),
    width: 200,
  },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    width: 100,
  },
];
export const codeType = [
  {
    label: '整托条码',
    value: 'PALLET',
  },
  {
    label: '箱条码',
    value: 'CASE',
  },
];
export const serchFields = [
  {
    label: '码规则编码',
    prop: 'ruleCode',
    component: FormType.INPUT,
  },
  {
    label: '码规则名称',
    prop: 'ruleName',
    component: FormType.INPUT,
  },
  {
    label: '码类型',
    prop: 'barcodeType',
    component: FormType.SELECT,
    options: codeType,
  },
];
export const options = [
  {
    label: '固定字段',
    value: 'FIX_FIELD',
  },
  {
    label: '批属性',
    value: 'BATCH_ATTR',
  },
];

export const rules = {
  ruleCode: [{ required: true, message: '请输入码识别规则编码', trigger: 'blur' }],
  ruleName: [
    { required: true, message: '请输入码识别规则名称', trigger: 'blur' },
    {
      min: 1,
      max: 30,
      message: '请填写为30个字段以内的数字、字母、文字、符号',
      trigger: 'blur',
    },
  ],
  barcodeType: [{ required: true, message: '请选择码类型', trigger: 'change' }],
  barcodeLength: [{ required: true, message: '请输入码的长度', trigger: 'blur' }],
  shippers: [{ required: true, message: '请选择关联货主', trigger: 'blur' }],
};
