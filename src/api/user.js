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
