import request from "@/util/axios";
/**
 *
 * @param
 * @returns
 */
export function getUserInfo(params) {
  return request({
    url: "/",
    method: "get",
    params,
  }).then((res) => res?.data?.data);
}
/**
 * 文件上传
 * https://yapi.ops.yunlizhi.cn/project/731/interface/api/33133
 */
export function upload(data) {
  return request({
    url: '/admin/sys-file/upload',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}