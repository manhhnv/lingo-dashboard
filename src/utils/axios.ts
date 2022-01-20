import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseUrl } from "../apis/baseUrl";
import { toast } from "react-toastify";
import store from 'redux/store';
import { logout } from "redux/slices/adminSlice";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  responseType: "json",
});

export const setupAxios = () => {
  const requestHandler = (request: AxiosRequestConfig) => {
    const {
      admin,
    } = store.getState();

    if (admin?.token) {
      request.headers.Authorization = `Bearer ${admin.token}`;
    }

    return request;
  };

  const successHandler = (response: AxiosResponse<any>) => {
    return response;
  };

  const errorHandler = (error: { response: any }) => {
    const errorRes = error.response;
    if (errorRes) {
      if (errorRes.status === 401) {
        store.dispatch(logout(null));
      }
      showError({ error: errorRes.data || {}, status: errorRes.status });
    } else {
      toast.error(
       "Có một lỗi không mong muốn đã xảy ra"
      );
    }
    return Promise.reject(error);
  };

  const showError = ({ error, status }: any) => {
    // let title = i18n.t('AbpAccount::DefaultErrorMessage');
    let message = "Có lỗi xảy ra!";
    if (typeof error === "string") {
      message = error;
    } else if (error.details) {
      message = error.details;
    } else if (error.message) {
      message = error.message;
    } else {
      switch (status) {
        case 401:
          // title = i18n.t('AbpAccount::DefaultErrorMessage401');
          message = "Bạn cần đăng nhập để thực hiện chức năng này!"
          store.dispatch(logout(null));
          break;
        case 403:
          // title = i18n.t('AbpAccount::DefaultErrorMessage403');
          message = "Bạn không thể thực hiện chức năng này!"
          break;
        case 404:
          // title = i18n.t('AbpAccount::DefaultErrorMessage404');
          message = "Không tồn tại!"
          break;
        case 500:
          // title = i18n.t('AbpAccount::500Message');
          message = "Có lỗi xảy ra!"
          break;
        default:
          break;
      }
    }

    toast.error(`${message}`);
  };

  axiosInstance.interceptors.request.use((request) => requestHandler(request));

  axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
};

export default axiosInstance;