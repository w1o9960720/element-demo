import Moment from '@/util/moment';
import { YMD } from '@/const/timeFormat';

const TIME_COLUMN_WIDTH = 170; // 时间列的宽度
const DATE_TIME_COLUMN_WIDTH = 170; // 时间列的宽度
const BATCH_NO_COLUMN_WIDTH = 150; // 批次号宽度

// export const

export default {
  TIME_COLUMN_WIDTH, // 时间宽度
  batchNo: {
    width: BATCH_NO_COLUMN_WIDTH,
  },
  dateTime: {
    width: DATE_TIME_COLUMN_WIDTH,
    formatter: (value) => Moment.format(value),
  },
  date: {
    width: TIME_COLUMN_WIDTH,
    formatter: (value) => Moment.format(value, YMD),
  },
};
