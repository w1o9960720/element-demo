// 数字金额转化为大写金额   最大转化为万亿
const priceChange = (number) => {
  let newNumber = number;
  let ret = '';
  if (parseFloat(newNumber) === 0) {
    ret = '零元';
  } else if (newNumber !== '' && newNumber !== null) {
    let unit = '万仟佰拾亿仟佰拾万仟佰拾元角分';
    let str = '';
    newNumber += '00';
    const point = newNumber.indexOf('.');
    if (point >= 0) {
      newNumber = newNumber.substring(0, point) + newNumber.substr(point + 1, 2);
    }
    unit = unit.substr(unit.length - newNumber.length);
    for (let i = 0; i < newNumber.length; i += 1) {
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(newNumber.charAt(i)) + unit.charAt(i);
    }
    ret = `${str
      .replace(/零(仟|佰|拾|角)/g, '零')
      .replace(/(零)+/g, '零')
      .replace(/零(万|亿|元)/g, '$1')
      .replace(/(亿)万|(拾)/g, '$1$2')
      .replace(/^元零?|零分/g, '')
      .replace(/元$/g, '元')}整`;
  }
  return ret;
};
export default priceChange;
