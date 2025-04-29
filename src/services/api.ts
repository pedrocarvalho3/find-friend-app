import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.log(process.env.API_URL);

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@app:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.API_URL}/refresh`,
          {},
          { withCredentials: true }
        );

        const { token } = refreshResponse.data;
        await AsyncStorage.setItem("@app:token", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
