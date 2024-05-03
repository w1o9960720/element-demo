import {
  mobileReg,
  numAndLetterReg,
  numAndSymbolReg,
  notContainChineseCodeReg,
  NumberAndLetter,
} from '@/const/regExp';

const validate = (rule, value) => {
  if (rule.reg.test(value)) {
    return null;
  }

  return rule.error;
};

// 校验数字或字母
export const validateNumberAndLetter = (value) => validate(NumberAndLetter, value);

const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else if (!mobileReg.test(value)) {
    callback(new Error('手机号格式不正确'));
  } else {
    callback();
  }
};
// 项目货主编码统一。不能输入汉字
const shipperCodeReg = notContainChineseCodeReg;
const validateCode = (rule, value, callback) => {
  if (value && !shipperCodeReg.test(value)) {
    callback(new Error('货主编码格式不正确'));
  } else {
    callback();
  }
};
// 项目纳税人识别号统一，无生成规则。前端采用平台端规则
const validateTaxpayerNo = (rule, value, callback) => {
  if (value && !numAndLetterReg.test(value)) {
    callback(new Error('纳税人识别号格式不正确'));
  } else {
    callback();
  }
};
const validateInvoiceTelPhone = (rule, value, callback) => {
  if (value && !numAndSymbolReg.test(value)) {
    callback(new Error('电话号码格式不正确'));
  } else {
    callback();
  }
};
const validateAccount = (rule, value, callback) => {
  if (value && !numAndLetterReg.test(value)) {
    callback(new Error('银行账号格式不正确'));
  } else {
    callback();
  }
};
// 邮箱
const IsEmail = (rule, value, callback) => {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
};
export {
  validatePhone, // 手机号
  validateCode, // 货主编码
  validateTaxpayerNo, // 纳税人识别号
  validateInvoiceTelPhone, // 电话号码
  validateAccount, // 银行账号
  IsEmail,
};
