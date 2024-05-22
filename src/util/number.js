export function formatFloatNum(num, digits = 3) {
  if (num) {
    const x = String(num).indexOf('.') + 1; // 小数点的位置
    const y = String(num).length - x; // 小数的位数
    const n = y > digits ? digits : y;
    return Number.isInteger(num) ? num : num.toFixed(n);
  }
  return '';
}

export function formatNum(num, digits = 2) {
  if (num) {
    return num.toFixed(digits);
  }
  return '';
}

/**
 *
 * @param {输入值} val
 * @param {小数位长度} decimalLen
 * @param {是否返回正整数} positiveInteger
 * @returns
 */
export const limitInput = (val, decimalLen = 0, positiveInteger = false) => {
  let replacedVal = String(val).replace(/[^\d.]+/g, '')
    .replace(/^0+(\d)/, '$1')
    .replace(/^\./, '0.');
  if (decimalLen === 0) {
    replacedVal = replacedVal.replace(/\./g, '');
  }
  if (positiveInteger) {
    replacedVal = replacedVal.replace(/^0+/, '');
  }
  const regLen = new RegExp(`^\\d*(.?\\d{0,${decimalLen}})`, 'g');
  return replacedVal.match(regLen)[0] || '';
};
