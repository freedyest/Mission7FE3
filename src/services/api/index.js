import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // baca dari .env
});

// Optional interceptor (kalau mau logging/authorization)
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
