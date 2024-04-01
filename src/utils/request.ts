// index.ts
import axios from "axios";
import { message } from "antd";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import store from "@/store";
import { UserApi } from "@/service/user-service";
import { setToken } from "@/store/userSlice";
import env from "@/config/env";

type Result<T> = {
  code: number;
  message: string;
  data: T;
};
interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: env.server_host,
    timeout: 60000,
  };

  refreshing = false;
  queue: PendingTask[] = [];

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = store.getState().user?.accessToken;
        console.log("a", token);

        if (token) {
          config.headers!.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      async (err: any) => {
        console.log(err);
        let { data, config } = err.response;
        if (this.refreshing) {
          return new Promise((resolve) => {
            this.queue.push({
              config,
              resolve,
            });
          });
        }

        const errRes = err.response?.data;

        let content = "";
        switch (err.response.status) {
          case 400:
            content = errRes?.data || "请求错误(400)";
            break;
          case 401:
            const refreshToken = store.getState().user.refreshToken;
            if (!config.url.includes("/user/refresh") && refreshToken) {
              this.refreshing = true;
              const res = await UserApi.refreshToken({
                refreshToken,
              });
              this.refreshing = false;
              if (res.code === 200) {
                store.dispatch(setToken(res.data));
                this.queue.forEach(({ config, resolve }) => {
                  resolve(this.instance(config));
                });
                return this.instance(config);
              } else {
                console.log("token已经失效了");
              }
            }
            content = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            content = "拒绝访问(403)";
            break;
          case 404:
            content = "请求出错(404)";
            break;
          case 408:
            content = "请求超时(408)";
            break;
          case 500:
            content = "服务器错误(500)";
            break;
          case 501:
            content = "服务未实现(501)";
            break;
          case 502:
            content = "网络错误(502)";
            break;
          case 503:
            content = "服务不可用(503)";
            break;
          case 504:
            content = "网络超时(504)";
            break;
          case 505:
            content = "HTTP版本不受支持(505)";
            break;
          default:
            content = `连接出错(${err.response.status})!`;
        }

        message.error(content);

        return Promise.reject(err.response);
      },
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({});
