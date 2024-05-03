/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

export const validateRate = (rule, value, callback) => {
  if (!(Number(value) > 0.01)) {
    callback(new Error('请输入大于0.01的数字'));
  }
  callback();
};

export const validateWeight = (rule, value, callback) => {
  const RegExp = /^0(\.\d?[1-9])$|^([1-9]\d{0,4})(\.\d{1,2})?$|^100000(\.0{0,2})?$/;
  if (!RegExp.test(value)) {
    callback(new Error('请输入[0.01,100000]的数字'));
  }
  callback();
};

/* 合法uri */
export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/* 验证pad还是pc */
export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') {
      return true;
    }
    return false;
  }
  return false;
}
/**
 * 判断身份证号码
 */
export function cardid(code) {
  const list = [];
  let result = true;
  let msg = '';
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };
  if (!validatenull(code)) {
    if (code.length === 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = '证件号码格式错误';
        result = false;
      } else if (!city[code.substr(0, 2)]) {
        msg = '地址编码错误';
        result = false;
      } else {
        // 18位身份证需要验证最后一位校验位
        // eslint-disable-next-line no-param-reassign
        code = code.split('');
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] !== code[17]) {
          msg = '证件号码校验位错误';
          result = false;
        }
      }
    } else {
      msg = '证件号码长度不为18位';
      result = false;
    }
  } else {
    msg = '证件号码不能为空';
    result = false;
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  const list = [];
  let result = true;
  let msg = '';
  const isPhoneRegExp = /^0\d{2,3}-?\d{7,8}$/;
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length === 11) {
      if (isPhoneRegExp.test(phone)) {
        msg = '手机号码格式不正确';
      } else {
        result = false;
      }
    } else {
      msg = '手机号码长度不为11位';
    }
  } else {
    msg = '手机号码不能为空';
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断手机号码是否正确（可以为空）
 */
export function isValidateNoneMobile(phone) {
  const list = [];
  let result = true;
  let msg = '';
  const isPhoneRegExp = /^0\d{2,3}-?\d{7,8}$/;
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length === 11) {
      if (isPhoneRegExp.test(phone)) {
        msg = '手机号码格式不正确';
      } else {
        result = false;
      }
    } else {
      msg = '手机号码长度不为11位';
    }
  } else {
    result = false;
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断姓名是否正确
 */
export function validatename(name) {
  const regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(name)) return false;
  return true;
}

/**
 * 判断是否为整数
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g;
  if (type === 1) {
    if (!regName.test(num)) return false;
  } else if (type === 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}

/**
 * 判断是否为小数
 */
export function validatenumord(num, type) {
  let regName = /[^\d.]/g;
  if (type === 1) {
    if (!regName.test(num)) return false;
  } else if (type === 2) {
    regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}

export const validateIdent = (val) =>
  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    val,
  );

// 验证数字大小
export const validateNumberMinMax = (min, max) => (rule, value, callback) => {
  if (value < min || value > max) {
    callback(new Error(`请输入[${min}, ${max}]`));
  }
  callback();
};
// 验证数字大小
export const validateIntNumber = (rule, value, callback) => {
  const RegExp = /^[1-9]\d*$/g;
  if (value && !RegExp.test(value)) {
    callback(new Error('请输入正整数'));
  }
  callback();
};

export const idCardReg =
  /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

export const numAndSymbolReg = /^[0-9-.!@#$%\\^&*)(+={}[\]/",'<>~·`?:;|]+$/;

/**
 * 验证手机号
 * @param rule
 * @param value
 * @param callback
 */
export const validateTelephone = (rule, value, callback) => {
  const validate = /^[-\d]{6,13}$/;
  if (!validate.test(value)) {
    callback(new Error('请输入正确的电话号码'));
  } else {
    callback();
  }
};

/**
 * 验证密码
 * @param rule
 * @param value
 * @param callback
 */
export const validatePassword = (rule, value, callback) => {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([0-9|a-z|A-Z]{8,})$/g;
  if (value.length < 8 || value.length > 16) {
    callback(new Error('密码长度8-16位!'));
  } else if (!regex.test(value)) {
    callback(new Error('新密码必须包含大、小写字母、数字三种元素!'));
  } else {
    callback();
  }
};
// 验证手机号
export const mobileReg = /^1[23456789]\d{9}$/;
export const validatePhone = (rule, value, callback) => {
  if (value && value !== '' && !mobileReg.test(value)) {
    callback(new Error('请输入正确的手机号'));
  }
  callback();
};

// 验证企业信息代码
export const validateCreditCode = (rule, value, callback) => {
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/;
  if (value && value !== '' && !reg.test(value)) {
    callback(new Error('请输入正确的企业信用代码'));
  }
  callback();
};

export const isNumber = (value) => {
  const reg = /^[0-9]+\.?[0-9]*$/;
  if (!reg.test(value)) {
    return false;
  }
  return true;
};

// 验证数字
export const validateNumber = (rule, value, callback) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(Number(value))) {
    callback(new Error('请输入数字'));
  }
  callback();
};

// 验证身份证
export const validateIdCard = (rule, value, callback) => {
  const reg =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (value && value !== '' && !reg.test(value)) {
    callback(new Error('请输入正确的身份证号'));
  }
  callback();
};

// 车牌号
export const vehilceReg =
  /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}(([A-HJ-NP-Z0-9]{5,6}[DF]{1}$)|([DF]{1}[A-HJ-NP-Z0-9]{5,6}$)))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂]{1}$)/;

// 尺寸
export const sizeReg = /((^[1-9]\d*)|^0)(\.\d{0,3}){0,1}$/;

// 字母和数字
export const numAndLetterReg = /^[0-9a-zA-Z]*$/;

// 小数点后两位
export const twoNumberReg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;

// 输入负数
export const nagetiveMoneyReg = /^([-+])?\d+(\.[0-9]{1,2})?$/;

// 验证车牌号
export const validateVehicle = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('请输入车牌号'));
  }
  if (value && value !== '' && !vehilceReg.test(value)) {
    callback(new Error('车牌号输入有误'));
  }
  callback();
};

// 设备型号，发动机号
export const validateEquip = (rule, value, callback) => {
  if (value && value !== '') {
    if (!numAndLetterReg.test(value)) {
      callback(new Error('只能输入字母和数字'));
    }
    callback();
  }
  callback();
};
// 两位小数，长度随意
export const validateTwoDecimal = (rule, value, callback) => {
  if (value && value !== '' && !twoNumberReg.test(value)) {
    callback(new Error('输入格式有误(小数点后只能输入两位)'));
  }
  callback();
};
// 两位小数，长度随意
export const validateTwoDecimalAndMinMaxOrNo = (min, max) => (rule, value, callback) => {
  if (!value) {
    callback();
  }
  if (!twoNumberReg.test(Math.abs(value))) {
    callback(new Error('输入格式有误(小数点后只能输入两位)'));
  }
  if (max && Number(value) > max) {
    callback(new Error(`输入格式有误，最大输入值${max}`));
  }
  if (min && Number(value) < min) {
    callback(new Error(`输入格式有误，最小输入值${min}`));
  }
  callback();
};
// 两位小数，长度随意
export const validateTwoDecimalAndMinMax = (min, max) => (rule, value, callback) => {
  if (value && value !== '' && !twoNumberReg.test(Math.abs(value))) {
    callback(new Error('输入格式有误(小数点后只能输入两位)'));
  }
  if (max && Number(value) > max) {
    callback(new Error(`输入格式有误，最大输入值${max}`));
  }
  if (min && Number(value) < min) {
    callback(new Error(`输入格式有误，最小输入值${min}`));
  }
  callback();
};
// 开始区间
export const validateStart = (rule, value, callback) => {
  if (value && value !== '' && !nagetiveMoneyReg.test(value)) {
    callback(new Error('只能输入数字(最多两位小数)'));
  }
  if (value && value !== '' && (Number(value) > 100 || Number(value) < -100)) {
    callback(new Error('输入范围必须在-100和100之间'));
  }
  callback();
};

// 两位小数，长度为10
export const validateTwoNumberByTen = (rule, value, callback) => {
  if (value && value !== '') {
    if (!twoNumberReg.test(value)) {
      callback(new Error('输入格式有误(小数点后只能输入两位)'));
    }
    const valueArr = `${value}`.split('.');
    if (valueArr[0].length > 8) {
      callback(new Error('输入值整数部位不能超过8位'));
    }
    callback();
  }
  callback();
};

// 温度
export const validateTemperature = (rule, value, callback) => {
  const reg = /^[-+]?[0-9]{1,3}(\.[0-9]{1,2})?$/;
  if (value && value !== '' && !reg.test(value)) {
    callback(new Error('请输入整数(1-3位)或小数(1-2位)'));
  }
  if (value && value !== '' && (Number(value) > 100 || Number(value) < -100)) {
    callback(new Error('输入范围必须在-100和100之间'));
  }
  callback();
};

// 尺寸
export const validateSize = (rule, value, callback) => {
  if (value !== '' && value !== null && value !== undefined) {
    if (Number(value) === 0) {
      callback(new Error('尺寸输入必须大于0'));
    }
    if (!sizeReg.test(value)) {
      callback(new Error('尺寸输入格式有误'));
    }
    if (value.length > 5) {
      callback(new Error('长宽高均不能超过5位'));
    }
    if (parseInt(value, 10) > 100) {
      callback(new Error('长宽高均不能超过100米'));
    }
    callback();
  }
  callback();
};

// 核定载重
export const validateLoadWeight = (rule, value, callback) => {
  if (value && value !== '' && !/^[0-9]*$/.test(value)) {
    callback(new Error('只能输入数字'));
  }
  if (value && Number(value) > 300000) {
    callback(new Error('输入不能超过30万'));
  }
  callback();
};
// 车辆总质量
export const validateTotalWeight = (rule, value, callback) => {
  if (value && value !== '') {
    if (!twoNumberReg.test(value)) {
      callback(new Error('输入格式有误(小数点后只能输入两位)'));
    }
    const valueArr = `${value}`.split('.');
    if (valueArr[0].length > 6) {
      callback(new Error('输入值整数部位不能超过6位'));
    }
    callback();
  }
  callback();
};
export const validateDepRemainValue = (form) => (rule, value, callback) => {
  if (Number(value) > Number(form.depBeginValue)) {
    callback(new Error('残值不能大于折旧期初价值'));
  }
  callback();
};
