import { wmsPlusHttp } from '@/util/http/index';

/**
 * @description:汇总报表
 * @api文档：https://yapi.ops.yunlizhi.cn/project/382/interface/api/37627
 */
export function reportPage(params, data) {
  return wmsPlusHttp.post(
    '/warehouse_management_system/extra_attribute_stock_record/total/report/page',
    data,
    {
      params,
    },
  );
}

/**
 * @description:导出
 * @api文档：https://yapi.ops.yunlizhi.cn/project/382/interface/api/37630
 */
export function pageExport(data) {
  return wmsPlusHttp.download(
    '/warehouse_management_system/extra_attribute_stock_record/total/report/export',
    data,
    { fileName: '导入', extension: 'xlsx' },
  );
}
