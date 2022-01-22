import { store } from "@app/store";
import axios from "axios";
import { refresh_token } from "@services/index";
import Cookies from "js-cookie";
axios.defaults.baseURL = "http://localhost:5000/";
// axios.defaults.baseURL = "http://localhost/smart-project-manager-be/public/api";
export const configAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        const token = store.getState().auth.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      const url = originalConfig.url;

      if (error.response && url !== "/auth/refresh" && url !== "/auth/login") {
        //@ts-ignore
        if (error.response.status === 401) {
          //@ts-ignore
          try {
            const { data } = await refresh_token();
            const userInfo = JSON.parse(Cookies.get("userInfo"));
            const access_token = data?.access_token;
            Cookies.set("userInfo", { ...userInfo, access_token });
            originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
            return axios(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(error);
    }
  );
};
