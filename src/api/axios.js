import Axios from "axios";
import { removeTokens } from "utils/tokenUtils";
import { setToken } from "utils/tokenUtils";
import { getRefreshToken } from "utils/tokenUtils";
import { getToken } from "utils/tokenUtils";

const BASE_URL = "http://localhost:3000/"; // Adjust for production

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request interceptor: Set access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Response interceptor: Try refresh if token expired
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refresh_token = getRefreshToken();

        if (!refresh_token) throw new Error("No refresh token");

        const res = await Axios.post(`${BASE_URL}auth/refresh`, {
          refresh_token,
        });

        const newAccessToken = res.data.access_token;
        setToken("token", newAccessToken); // Update access token in storage

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); 
      } catch (err) {
        removeTokens();
        window.location.href = "/authentication/sign-in/basic"; // Auto logout
      }
    }

    return Promise.reject(error);
  }
);

export const axiosAuth = axiosInstance;
export const axiosGeneral = axiosInstance;
