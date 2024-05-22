/* eslint-disable */
import moment from 'moment';
export const dateFormatter = (time, formatter) => {
  if (time == undefined || time == null || time == '') return '';
  return moment(time).format(formatter || 'YYYY-MM-DD HH:mm:ss');
};

export const formatToDate = (time) => {
  return dateFormatter(time, 'YYYY-MM-DD');
};

export const pickerOptions = {
  shortcuts: [
    {
      text: '当天',
      onClick(picker) {
        const end = new Date();
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      },
    },
  ],
};
