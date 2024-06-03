import Moment from '@/util/moment';

export const DateTime = {
  minWidth: 180,
  formatter: (row, { property }) => Moment.format(row[property]),
};
export const DateTimeFormatYMD = {
  minWidth: 165,
  formatter: (row, { property }) => Moment.format(row[property], 'YYYY-MM-DD'),
};
