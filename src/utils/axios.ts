import axios, { AxiosRequestConfig } from "axios";
import { BaseUrl } from "../apis/baseUrl";
import store from "redux/store";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  responseType: "json",
});

export const setupAxios = () => {
  const requestHandler = (request: AxiosRequestConfig) => {
    const {
      admin: { token },
    } = store.getState();

    if (token) {
      if (request?.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return request;
  };

  axiosInstance.interceptors.request.use((request) => requestHandler(request));
};

export default axiosInstance;
