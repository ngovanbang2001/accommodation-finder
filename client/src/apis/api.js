import axios from "axios";
import Cookies from "js-cookie";
import { removeToken, saveTokenToCookie } from "utils/auth";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8006",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  function (config) {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    if (error?.response?.status === 422) {
      const modal = document.getElementById("modal-lock-account");
      if (modal) {
        modal.click();
      }
    }
    if (error?.response?.status === 409) {
      const refreshToken = await Cookies.get(
        process.env.NEXT_PUBLIC_COOKIE_REFRESH_ACCESS_TOKEN_KEY
      );
      const { accessToken: accessTokenRes, refreshToken: refreshTokenRes } =
        await api.post(`/refreshToken`, { refreshToken });
      saveTokenToCookie({
        accessToken: accessTokenRes,
        refreshToken: refreshTokenRes,
      });
      return api(error.config);
    }

    return Promise.reject(error);
  }
);
export default api;
