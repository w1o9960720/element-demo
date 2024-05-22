import unitNumber, { BIG_NUMBER } from '@/util/unitNumber';
import BigNumber from 'bignumber.js';
/**
 *  config = {
 *    view: new Map([[prop, '合计']]), // 固定展示
 *    str: [prop], // 展示为xx整xx零
 *    num: [prop], // 纯数字相加
 *  };
 */
/**
 * table表计算合计:
 * @param {object} (params) -传入的对象参数
 * @param {string} params.column  -列：同element-table 自定义的合计计算方法
 * @param {string} params.data - 数据集：同element-table 自定义的合计计算方法
 * @param {number} params.config - 配置:详见src\views\out-warehouse\deliver-order\detailTable\config.js
 * @param {string} baseNumberDisplay：展示基数-当转换率为1时，总数量应该返回零单位数量还是整单位数量
 * @returns 展示字段
 */
export default function tableSummary(params, baseNumberDisplay = BIG_NUMBER) {
  const { column, data, config = {} } = params;
  const { view, str, num } = config;
  if (view instanceof Map) {
    if (config.view.has(column.property) || config.view.has(column.type)) {
      return config.view.get(column.property) || config.view.get(column.type);
    }
  }
  if (Array.isArray(str)) {
    if (str.includes(column.property)) {
      const { big, small } = data.reduce(
        (prev, curr) => {
          const { bigUnitNumber, smallUnitNumber } = unitNumber.calculate(
            {
              ...curr,
              smallUnitNumber: curr[column.property],
            },
            baseNumberDisplay,
          );
          return {
            big: prev.big.plus(bigUnitNumber),
            small: prev.small.plus(smallUnitNumber),
          };
        },
        { big: new BigNumber(0), small: new BigNumber(0) },
      );
      return `${big.toNumber()}整${small.toNumber()}零`;
    }
  }
  if (Array.isArray(num)) {
    if (config.num.includes(column.property)) {
      return data
        .reduce((prev, curr) => prev.plus(curr[column.property] || 0), new BigNumber(0))
        .toNumber();
    }
  }
  return '';
}
