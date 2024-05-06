import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { message } from 'antd';
const baseURL = import.meta.env.VITE_API_BASE_URL;
class HttpRequest {
  axiosInstance: AxiosInstance;
  requestConfig: AxiosRequestConfig;
  constructor() {
    //axios 实例
    this.requestConfig = {};
    this.axiosInstance = this.create();
    this.interceptors(this.axiosInstance);
  }
  //创建axios实例
  create() {
    //基础配置
    const conf = {
      baseURL,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    return Axios.create(conf);
  }

  getCancelTokenSource = (): CancelTokenSource => {
    return Axios.CancelToken.source();
  };

  setRequestConfig = (conf: AxiosRequestConfig) => {
    this.requestConfig = conf;
  };
  //拦截器
  interceptors(instance: AxiosInstance) {
    //求情拦截
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );
    //响应拦截
    instance.interceptors.response.use(
      (response) => {
        const { data, status } = response;
        if (status < 200 || status > 300) {
          return Promise.reject(data);
        }
        return data;
      },
      (err) => {
        if (err.response.status == 401) {
          return message.error('权限过期，重新登录')
        }

        if (err.response) {
          return Promise.reject(err);
        }
      }
    );
  }
  //请求
  makeRequest<T>(config: AxiosRequestConfig) {
    const options = {
      ...config,
      ...this.requestConfig,
      method: config.method ? config.method.toLowerCase() : "get",
    };
    return this.axiosInstance.request<any, T>(options);
  }
}

const httpRequest = new HttpRequest();
export default httpRequest;
