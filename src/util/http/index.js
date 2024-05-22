// import { FILE_TYPE_ENUM } from '@/const/fileDownload';
import request from '@/util/axios';
import { getStore } from '@/util/store';

class CreatHttp {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || '';
  }

  static getHeader() {
    const accountInfo = getStore({
      name: 'accountInfo',
    }) || {
      warehouseId: null,
      ext: {
        warehouseCode: null,
        warehouseId: null,
      },
    };
    const {
      warehouseId,
      ext: { warehouseCode },
    } = accountInfo;
    return {
      'WAREHOUSE-ID': warehouseId,
      'WAREHOUSE-CODE': warehouseCode,
    };
  }

  download(url, data, options = {}) {
    const { params = {}, headers = {}, warehouseNo, fileName, extension, noWMS } = options;
    if (!noWMS) {
      const wareInfo = CreatHttp.getHeader();
      if (!warehouseNo) {
        params.warehouseId = wareInfo['WAREHOUSE-ID'];
        params.warehouseCode = wareInfo['WAREHOUSE-CODE'];
        Object.assign(headers, wareInfo);
      }
    }

    return request({
      url: `${this.baseUrl}${url}`,
      headers,
      method: 'post',
      responseType: 'arraybuffer',
      fileName,
      extension,
      data,
      params,
    }).then((res) => {
      const downloadFile = `${fileName || ''}_${+new Date()}.${extension || 'xlsx'}`;
      const blob = new Blob([res.data]);
      const csvUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = csvUrl;
      link.download = downloadFile;
      link.click();
    });
  }

  post(url, data, options = {}) {
    const { params = {}, headers = {}, warehouseNo, warehouseParams } = options;
    const wareInfo = CreatHttp.getHeader();
    if (!warehouseNo) {
      params.warehouseId = wareInfo['WAREHOUSE-ID'];
      params.warehouseCode = wareInfo['WAREHOUSE-CODE'];
      Object.assign(headers, wareInfo);
    }
    if (warehouseParams) {
      wareInfo['WAREHOUSE-ID'] = data.warehouseId || params.warehouseId;
      wareInfo['WAREHOUSE-CODE'] = data.warehouseCode || params.warehouseCode;
      Object.assign(headers, wareInfo);
    }
    return request({
      url: `${this.baseUrl}${url}`,
      headers,
      method: 'post',
      data,
      params,
    }).then((res) => res?.data?.data);
  }

  put(url, data, options = {}) {
    const { params = {}, headers = {}, warehouseNo } = options;
    const wareInfo = CreatHttp.getHeader();
    if (!warehouseNo) {
      params.warehouseId = wareInfo['WAREHOUSE-ID'];
      params.warehouseCode = wareInfo['WAREHOUSE-CODE'];
      Object.assign(headers, wareInfo);
    }

    return request({
      url: `${this.baseUrl}${url}`,
      headers,
      method: 'put',
      data,
      params,
    }).then((res) => res?.data?.data);
  }

  get(url, params, options = {}) {
    const { params: obj } = options;
    const data2 = {
      ...params,
      ...obj,
    };
    return request({
      url: `${this.baseUrl}${url}`,
      method: 'get',
      headers: CreatHttp.getHeader(),
      params: data2,
    }).then((res) => res?.data?.data);
  }
}

const env = {};

const otmsHttp = new CreatHttp(env.OTMS_WEB_PLUS_SERVER);
const wmsHttp = new CreatHttp(env.WMS_WEB_PLUS_SERVER);
const bfsSsoHttp = new CreatHttp(env.BFS_SSO_SERVER);
const bfsUserWebHttp = new CreatHttp(env.BFS_USER_WEB_SERVER);
const warehouseHttp = new CreatHttp(env.WAREHOUSE_WEB_SERVER);
const bigDataHttp = new CreatHttp(env.BIG_DATA_SERVER);
const bigDataAiotHttp = new CreatHttp(env.BIG_DATA_AIOT_SERVER);
// 老服务使用此 Http 服务
const noPrefixHttp = new CreatHttp('/');

export const wmsPlusHttp = new CreatHttp(env.WMS_WEB_PLUS);

export {
  otmsHttp,
  wmsHttp,
  bfsSsoHttp,
  bfsUserWebHttp,
  noPrefixHttp,
  bigDataHttp,
  warehouseHttp,
  bigDataAiotHttp,
};
