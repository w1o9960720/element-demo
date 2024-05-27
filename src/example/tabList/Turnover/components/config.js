import { formatKeyValueObject } from '@/util/base';

const Dict = {
  Warehouse: 'WAREHOUSE',
  Transportation: 'STORE_TRANSIT',
  Shop: 'STORE',
  Factory: 'FACTORY',
  Diff: 'diff',
};

const getOptions = (map) =>
  Array.from(map, ([value, label]) => ({
    label,
    value,
  }));
const detailType = [
  {
    label: '仓库',
    value: Dict.Warehouse,
  },
  {
    label: '运输',
    value: Dict.Transportation,
  },
  {
    label: '门店',
    value: Dict.Shop,
  },
  {
    label: '工厂',
    value: Dict.Factory,
  },
];
const operationType = (type) => {
  const options = new Map([
    ['IN_WAREHOUSE', '入库'],
    ['OUT_WAREHOUSE', '出库'],
    ['RETURN_WAREHOUSE', '回库'],
    ['RETURN_FACTORY', '回厂'],
  ]);
  switch (type) {
    case Dict.Transportation:
      options.delete('IN_WAREHOUSE');
      break;
    case Dict.Shop:
      options.delete('IN_WAREHOUSE');
      options.delete('RETURN_FACTORY');
      options.set('OUT_WAREHOUSE', '入店');
      break;
    case Dict.Diff:
      options.delete('IN_WAREHOUSE');
      break;
    default:
      break;
  }
  return getOptions(options);
};
const operationTypeEnum = formatKeyValueObject(operationType());

const attributeSource = (type) => {
  const options = new Map([
    ['WAREHOUSE', '仓库'],
    ['FACTORY', '工厂'],
    ['STORE', '门店'],
  ]);
  switch (type) {
    case Dict.Transportation:
    case Dict.Shop:
      options.delete('FACTORY');
      break;
    default:
      break;
  }
  return getOptions(options);
};
const attributeSourceEnum = formatKeyValueObject(attributeSource());

export { Dict, detailType, operationType, operationTypeEnum, attributeSource, attributeSourceEnum };
