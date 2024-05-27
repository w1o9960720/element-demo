import dayjs from 'dayjs';
// 仓库状态
export const WAREHOUSE_STATUS = {
  ENABLED: '启用',
  DISABLED: '禁用',
};
// 状态对应值（数字）1启用，0禁用
export const WAREHOUSE_STATUS_NUM = {
  ENABLED: '1',
  DISABLED: '0',
};
export const TABLECOLUMN = [
  {
    label: '手机号码',
    prop: 'mobile',
    width: 180,
  }, {
    label: '用户姓名',
    prop: 'realName',
    minWidth: 180,
  }, {
    label: '创建人',
    prop: 'createUserName',
    minWidth: 180,
  }, {
    label: '创建时间',
    prop: 'createTime',
    minWidth: 180,
    formatter: (row) => {
      if (row.createTime) {
        return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss');
      }
      return '--';
    },
  },
];
export const userTableColumn = [
  {
    label: '手机号码',
    prop: 'mobile',
    width: 180,
  }, {
    label: '用户姓名',
    prop: 'realName',
    minWidth: 180,
  },
];
