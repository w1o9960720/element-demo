import moment from 'moment';
import { YMDHMS } from '@/const/timeFormat';

export default {
  format(time, formatter = YMDHMS) {
    if (!time) {
      return '';
    }
    return moment(time).format(formatter);
  },
  startOf(time, key = 'day') {
    if (!time) {
      return '';
    }

    return moment(time).startOf(key);
  },
  ensOf(time, key = 'day') {
    if (!time) {
      return '';
    }

    return moment(time).endOf(key);
  },
  endOf(time, key = 'day') {
    if (!time) {
      return '';
    }

    return moment(time).endOf(key);
  },
  toTimestame(time) {
    if (!time) {
      return '';
    }

    return Number(time);
  },
  add(time, obj = {}) {
    if (!time) {
      return '';
    }

    return moment(time).add(obj);
  },
  subtract(time, obj = {}) {
    if (!time) {
      return '';
    }

    return moment(time).subtract(obj);
  },
};
