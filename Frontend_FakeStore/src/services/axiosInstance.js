import axios from "axios";
import authService from "./authService";

const API_BASE_URL = "https://localhost:7106/api/";

// Axios Instanz erstellen
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Setup-Funktion: Token setzen
export const initializeAxiosAuth = () => {
  const token = authService.getToken();
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// Interceptor global setzen
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
