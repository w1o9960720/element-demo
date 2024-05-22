// 各种转换率返回的数量默认单位：
//     veneerWeight：(整单位)单板数量

export const BIG_NUMBER = 'bigUnitNumber'; // 整单位数量
export const SMALL_NUMBER = 'smallUnitNumber'; // 零单位数量

/**
 * 计算总数
 * @param smallUnitNumber：零单位数量
 * @param bigUnitNumber：整单位数量
 * @param conversionRate：换算率
 * @returns {number} 总数*1000
 */
// eslint-disable-next-line default-param-last
function calculateTotalTimes1000(smallUnitNumber = 0, bigUnitNumber = 0, conversionRate) {
  return (smallUnitNumber * 1000 + bigUnitNumber * conversionRate * 1000).toFixed(0);
}
/**
 * 计算整、零单位数
 * @param totalTimes1000：总数*1000
 * @param conversionRate：换算率
 * @param baseNumberDisplay：展示基数-当转换率为1时，总数量应该返回零单位数量还是整单位数量
 * @returns {onnject} {bigNumber：整单位数， smallNumber：零单位数}
 */
function calculateBigNumAndSamllNum(totalTimes1000, conversionRate, baseNumberDisplay) {
  if (conversionRate !== 1) {
    const bigNumber = parseInt(totalTimes1000 / 1000 / conversionRate, 10);
    const smallNumber = (totalTimes1000 % (conversionRate * 1000)) / 1000;
    return { bigNumber, smallNumber };
  }

  if (baseNumberDisplay === BIG_NUMBER) {
    return {
      smallNumber: 0,
      bigNumber: totalTimes1000 / 1000,
    };
  }

  return {
    bigNumber: 0,
    smallNumber: totalTimes1000 / 1000,
  };
}
/**
 * 转换为几箱几瓶形式
 * @param {number} bigUnitNumber - 整单位数量
 * @param {string} bigUnit  -整单位
 * @param {number} smallUnitNumber - 零单位数量
 * @param {string} smallUnit - 零单位
 * @returns {string} 几箱几瓶形式
 */
function convertTxt(
  { bigNumber, bigUnit, smallNumber, smallUnit, conversionRate },
  baseNumberDisplay = SMALL_NUMBER,
) {
  if (conversionRate !== 1) {
    return `${bigNumber}${bigUnit}${smallNumber}${smallUnit}`;
  }

  if (baseNumberDisplay === SMALL_NUMBER) {
    return `${smallNumber}${smallUnit}`;
  }

  return `${bigNumber}${bigUnit}`;
}

export default {
  /**
   * 转大小单位:见src\views\out-warehouse\wave-order
   * \details\components\taskDetails\components\adjustmentDialog.vue
   * @param {object} (params) -传入的对象参数
   * @param {string} params.bigUnit  -整单位
   * @param {string} params.smallUnit - 零单位
   * @param {number} params.smallUnitNumber - 零单位数量 默认0
   * @param {number} params.bigUnitNumber - 整单位数量 默认0
   * @param {number} params.conversionRate - 转化率 默认1
   * @param {string} baseNumberDisplay：展示基数-当转换率为1时，总数量应该返回零单位数量还是整单位数量
   * @returns {object} { bigUnitNumber: 整单位数量, smallUnitNumber: 零单位数量, amount: 总数, txt: '几箱几瓶'}
   */
  calculate: (params, baseNumberDisplay = SMALL_NUMBER) => {
    if (params) {
      const {
        bigUnit = '',
        smallUnit = '',
        smallUnitNumber = 0,
        bigUnitNumber = 0,
        conversionRate = 1,
      } = params;
      const total = calculateTotalTimes1000(smallUnitNumber, bigUnitNumber, conversionRate);
      const { bigNumber, smallNumber } = calculateBigNumAndSamllNum(
        total,
        conversionRate,
        baseNumberDisplay,
      );
      return {
        bigUnitNumber: bigNumber,
        smallUnitNumber: smallNumber,
        txt: convertTxt(
          {
            bigNumber,
            bigUnit,
            smallNumber,
            smallUnit,
            conversionRate,
          },
          baseNumberDisplay,
        ),
      };
    }
    return {};
  },
  /**
   * 转总数：见src\views\out-warehouse\wave-order
   * \details\components\taskDetails\components\adjustmentDialog.vue
   * @param {object} (params) -传入的对象参数
   * @param {number} params.smallUnitNumber - 零单位数量 默认0
   * @param {number} params.bigUnitNumber - 整单位数量 默认0
   * @param {number} params.conversionRate - 转化率 默认1
   * @returns {number} 整零转零单位总数
   */
  getTotal(params) {
    if (params) {
      const { smallUnitNumber = 0, bigUnitNumber = 0, conversionRate = 1 } = params;
      const total = calculateTotalTimes1000(smallUnitNumber, bigUnitNumber, conversionRate);
      return total / 1000;
    }
    return 0;
  },
};
