export const transOptions = (enums = {}, type = 'string') => {
  const arr = [];
  for (const [key, value] of Object.entries(enums)) {
    let v = key;
    if (type === 'number') {
      v = +key;
    } else if (type === 'boolean') {
      v = Boolean(key);
    }
    arr.push({
      label: value,
      value: v,
    });
  }
  return arr;
};
export const APP_SCE = {
  1: '纯运输',
  2: '运输➕仓储',
};
export const TEMP_RANGE = {
  NORMAL: '常温',
  COLD: '冷冻',
  REFRIGERATE: '冷藏',
  CONSTANT: '恒温',
};
export const STORE_TYPE = {
  1: '平面库',
  2: '立体',
  3: '自动化库',
  4: '楼层库',
  5: '高台库',
  6: '地下库',
  7: '坡道库',
};
export const ORDER_TYPE = {
  in: '入库',
  out: '出库',
};
export const ORDER_ITEM_TYPE = {
  in1: '订单入库',
  in2: '盘盈入库',
  out1: '订单出库',
  out2: '盘亏出库',
};
export const W_ORDER_STATUS = {
  待入库: '待入库',
  入库中: '入库中',
  已入库: '已入库',
  待出库: '待出库',
  出库中: '出库中',
  已出库: '已出库',
  已取消: '已取消',
};
export const MENU_TYPES = {
  0: '子菜单',
  1: '按钮',
  2: '主菜单',
};
export const WAREHOUSE_STATUS_TYPE = {
  true: '启用',
  false: '禁用',
};
// 是否自营
export const ASCRIPTION_TYPE = {
  SELF_EMPLOYED: '自营',
  JOIN: '加盟',
};
