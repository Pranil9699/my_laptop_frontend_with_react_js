import axios from "axios";

export const BASE_URL = "https://my-laptop-backend.onrender.com/api";
// export const BASE_URL = "http://localhost:8080/api";

// 🌐 For public APIs (no token)
export const myAxios = axios.create({
  baseURL: BASE_URL,
   headers: { "Content-Type": "application/json" },
});

// 🔐 For private APIs (user/admin routes)
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },

});

// 🧩 Attach token if present
privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
