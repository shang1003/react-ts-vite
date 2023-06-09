import Axios,{ AxiosInstance,AxiosRequestConfig } from "axios";
import CONFIG from "@/config";
class HttpRequest {
  axiosInstance: AxiosInstance;
  constructor() {
    //axios 实例
    this.axiosInstance = this.create();
    this.interceptors(this.axiosInstance);
    //拦截器执行
  }
  //创建axios实例
  create() {
    //基础配置
    const conf = {
      baseURL: CONFIG.http.baseURL,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    return Axios.create(conf);
  }
  //拦截器
  interceptors(instance:AxiosInstance) {
    //求情拦截
    instance.interceptors.request.use(
      (config) => {
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
        if (err.response) {
          return Promise.reject(err);
        }
      }
    );
  }
  //请求
  makeRequest(config:AxiosRequestConfig) {
    const options = {
      ...config,
      method: config.method ? config.method.toLowerCase() : "get",
    };
    return this.axiosInstance.request(options);
  }
}

const httpRequest = new HttpRequest();
export default httpRequest;
