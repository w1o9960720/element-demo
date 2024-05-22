import dayjs from 'dayjs';

export default function formatTime(value) {
  if (!value) return '';
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
}
