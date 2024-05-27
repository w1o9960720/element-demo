import request from '@/util/axios';

// 开票回款 - search
// https://yapi.ops.yunlizhi.cn/project/857/interface/api/54094
export function getInvoicingPage(data, params) {
  return request({
    url: '/saas_bms/charging_invoicing/query/page',
    method: 'post',
    data,
    params,
  }).then((res) => res?.data?.data);
}
// 开票回款 - detail
// https://yapi.ops.yunlizhi.cn/project/857/interface/api/54100
export function getInvoicingDetail({ id }) {
  return request({
    url: `/saas_bms/charging_invoicing/query/invoicing/${id}`,
    method: 'post',
  }).then((res) => res?.data?.data);
}
// 开票回款 - save
// https://yapi.ops.yunlizhi.cn/project/857/interface/api/54118
export function saveInvoicing(data) {
  return request({
    url: `/saas_bms/charging_invoicing/save`,
    method: 'post',
    data,
  }).then((res) => res?.data?.data);
}
// 开票回款 - delete 发票
// https://yapi.ops.yunlizhi.cn/project/857/interface/api/54106
export function delInvoicing({ id }) {
  return request({
    url: `/saas_bms/charging_invoicing/delete/invoicing/${id}`,
    method: 'post',
  }).then((res) => res?.data?.data);
}
// 开票回款 - delete 回款
// https://yapi.ops.yunlizhi.cn/project/857/interface/api/54112
export function delBill({ id }) {
  return request({
    url: `/saas_bms/charging_invoicing/delete/payment/${id}`,
    method: 'post',
  }).then((res) => res?.data?.data);
}
