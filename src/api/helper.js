import axios from "axios";

// ✅ Use environment variable (fallback to localhost if missing)
export const BASE_URL = `${process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"}/api`;

// 🌐 Public APIs
export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 🔐 Private APIs (requires token)
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 🧩 Automatically attach token if available
privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
