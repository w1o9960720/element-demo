/*eslint-disable*/
import { wmsPlusHttp } from '@/util/http/index';

/**
 * @description: 我的已办列表
 * @api文档：https://yapi.ops.yunlizhi.cn/project/382/interface/api/22811
 */
export function getDoneList(data, params) {
  return wmsPlusHttp.post('/warehouse_management_system/my_tasks/my_done_list_4_pc', data, {
    params,
  });
}
