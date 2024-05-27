export default function getSerchFields() {
  return [
    {
      label: '货主编码',
      prop: 'shipperCode',
    }, {
      label: '货主名称',
      prop: 'shipperName',
    }, {
      label: '已绑定流程编码',
      prop: 'descriptionCode',
    },
  ];
}
