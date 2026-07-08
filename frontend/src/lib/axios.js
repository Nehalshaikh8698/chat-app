import axios from "axios";

// API Base URL
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api");

// Axios Instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,

  // Send HTTP Only Cookies
  withCredentials: true,

  // Request Timeout (30 Seconds)
  timeout: 30000,

  // Default Headers
  headers: {
    "Content-Type": "application/json",
  },
});

////////////////////////////////////////////////////////////////////////////////
// Request Interceptor
////////////////////////////////////////////////////////////////////////////////

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

////////////////////////////////////////////////////////////////////////////////
// Response Interceptor
////////////////////////////////////////////////////////////////////////////////

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn("Unauthorized Request");
          break;

        case 403:
          console.warn("Forbidden Request");
          break;

        case 404:
          console.warn("API Not Found");
          break;

        case 500:
          console.warn("Internal Server Error");
          break;

        default:
          break;
      }
    } else if (error.code === "ECONNABORTED") {
      console.warn("Request Timeout");
    } else {
      console.warn("Network Error");
    }

    return Promise.reject(error);
  }
);