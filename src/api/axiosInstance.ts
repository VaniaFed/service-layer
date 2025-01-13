import axios, { AxiosError } from "axios";
import { generateResponseError } from "@/api/utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_BASE_API_URL,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      location.href = "/login";
    }

    const err = generateResponseError(error);

    return Promise.reject(err);
  }
);

export default axiosInstance;
