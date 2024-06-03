export const emailReg =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 手机号
export const mobileReg = /^1[3456789]\d{9}$/;

export const idCardReg =
  /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 数字和英文
export const numAndLetterReg = /^[0-9a-zA-Z]*$/;

// 数字和符号
export const numAndSymbolReg = /^[0-9-.!@#$%\\^&*)(+={}[\]/",'<>~·`?:;|]+$/;

// 不包含中文
export const notContainChineseCodeReg = /^[a-z_A-Z0-9-.!@#$%\\^&*)(+={}[\]/",'<>~·`?:;|]+$/;

export const NumberAndLetter = {
  reg: numAndLetterReg,
  error: '请输入数字或字母',
};
