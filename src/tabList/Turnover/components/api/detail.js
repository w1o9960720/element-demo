import { wmsPlusHttp } from '@/util/http/index';

/**
 * @description:页查询详情
 * @api文档：https://yapi.ops.yunlizhi.cn/project/382/interface/api/37642
 */
export function pageDetail(params, data) {
  return wmsPlusHttp.post(
    '/warehouse_management_system/extra_attribute_biz_record/page_detail',
    data,
    {
      params,
    },
  );
}

/**
 * @description:导出
 * @api文档：
 */
export function pageExport() {}
