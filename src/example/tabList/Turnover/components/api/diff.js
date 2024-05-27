import { wmsPlusHttp } from '@/util/http/index';

/**
 * @description:差异报表
 * @api文档：https://yapi.ops.yunlizhi.cn/project/382/interface/api/37636
 */
export function reportPage(params, data) {
  return wmsPlusHttp.post(
    '/warehouse_management_system/extra_attribute_biz_record/difference/report/page',
    data,
    {
      params,
    },
  );
}

/**
 * @description:导出
 * @api文档：https://yapi.ops.yunlizhi.cn/project/382/interface/api/37639
 */
export function pageExport(data) {
  return wmsPlusHttp.download(
    '/warehouse_management_system/extra_attribute_biz_record/difference/report/export',
    data,
    { fileName: '导入', extension: 'xlsx' },
  );
}
