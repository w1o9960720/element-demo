import axios from "axios";
// import { serialize } from '@/util';
// import errorCode from '@/const/errorCode';
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import store from "@/store"; // progress bar style
// 创建axios实例
const service = axios.create({
  baseURL:
    import.meta.env.MODE === "dev" ? "/api" : import.meta.env.VITE_PROXY_URL,
  timeout: 60000, // 请求超时时间
});
// 返回其他状态吗
service.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
service.defaults.withCredentials = true;
// NProgress Configuration

// HTTPrequest拦截
service.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false;
    const token = localStorage.getItem("token");
    if (token && !isToken) {
      config.headers.Authorization = `Bearer ${token}`; // token
    }
    // config.headers.Origin = '*';
    // headers中配置serialize为true开启序列化
    if (config.method === "post" && config.headers.serialize) {
      config.data = serialize(config.data);
      delete config.data.serialize;
    }

    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// HTTPresponse拦截
service.interceptors.response.use(
  async (res) => {
    const status = Number(res.status) || 200;
    let d = res?.data;
    // 后台定义 424 针对令牌过去的特殊响应码
    if (status === 424) {
      ElMessageBox.confirm("令牌状态已过期，请点击重新登录", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          store.dispatch("LogOut").then(() => {
            // 刷新登录页面，避免多次弹框
            window.location.reload();
          });
        })
        .catch(() => {});
      return res;
    }

    if (status !== 200 || +res.data.code === 1) {
      if (d instanceof ArrayBuffer) {
        try {
          const doc = new TextDecoder();
          const text = doc.decode(d);
          d = JSON.parse(text);
        } catch {
          ElMessage({
            message: errorCode[status] || errorCode.default,
            type: "error",
          });
          return Promise.reject(new Error("http response json parse error"));
        }
      }
      const message = d.msg || errorCode[status] || errorCode.default;
      ElMessage({
        message,
        type: "error",
      });
      // eslint-disable-next-line consistent-return
      return Promise.reject(new Error(message));
    }
    // eslint-disable-next-line consistent-return
    return res;
  },
  (error) => {
    // 处理 503 网络异常
    if (error?.response?.status === 503) {
      ElMessage({
        message: error.response.data.msg,
        type: "error",
      });
    }
    return Promise.reject(new Error(error));
  }
);

export default service;
