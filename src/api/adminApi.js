// import { privateAxios } from "./helper";

// const BASE_URL = "/admin";

// // 💻 Laptops
// export const getAllLaptops = () => privateAxios.get(`${BASE_URL}/laptops`);
// export const addLaptop = (data) => privateAxios.post(`${BASE_URL}/laptops`, data);
// export const updateLaptopStatus = (id, field) =>
//   privateAxios.put(`${BASE_URL}/laptops/${id}/toggle/${field}`);
// export const deleteLaptop = (id) => privateAxios.delete(`${BASE_URL}/laptops/${id}`);

// // 👥 Users
// export const getAllUsers = () => privateAxios.get(`${BASE_URL}/users`);
// export const toggleUserStatus = (id) =>
//   privateAxios.put(`${BASE_URL}/users/${id}/toggle-status`);
// export const toggleUserRole = (id) =>
//   privateAxios.put(`${BASE_URL}/users/${id}/toggle-role`);
// export const deleteUser = (id) => privateAxios.delete(`${BASE_URL}/users/${id}`);

// // 📦 Rentals
// export const getAllRentals = () => privateAxios.get(`${BASE_URL}/rentals`);
// export const updateRentalStatus = (id, status) =>
//   privateAxios.put(`${BASE_URL}/rentals/${id}/status`, { status });

// // 💳 Payments
// export const getAllPayments = () => privateAxios.get(`${BASE_URL}/payments`);
// export const verifyPayment = (id) =>
//   privateAxios.put(`${BASE_URL}/payments/${id}/verify`);
// src/api/adminApi.js
// import { privateAxios } from "./helper";

// const BASE_URL = "/admin";

// // 💻 Laptops
// export const getAllLaptops = () => privateAxios.get(`${BASE_URL}/laptops`);
// export const addLaptops = (data) => privateAxios.post(`${BASE_URL}/laptops`, data);
// export const updateLaptopAvailableAndRent = (id, payload) =>
//   privateAxios.put(`${BASE_URL}/laptops/${id}/availableAndRentperDay`, payload);
// export const deleteLaptop = (id) => privateAxios.delete(`${BASE_URL}/laptops/${id}`);

// // 👥 Users
// export const getAllUsers = () => privateAxios.get(`${BASE_URL}/users`);
// export const toggleUserBlock = (id) => privateAxios.put(`${BASE_URL}/users/${id}/block`);
// export const deleteUser = (id) => privateAxios.delete(`${BASE_URL}/users/${id}`);

// // 📦 Rentals
// export const getAllRentals = () => privateAxios.get(`${BASE_URL}/rentals`);
// export const updateRentalStatus = (id, status) =>
//   privateAxios.put(`${BASE_URL}/rentals/${id}/status`, null, { params: { status } });

// // 💳 Payments
// export const getAllPayments = () => privateAxios.get(`${BASE_URL}/payments`);
// export const verifyPayment = (id) =>
//   privateAxios.put(`${BASE_URL}/payments/${id}/verify`);

// // src/api/adminApi.js
import { privateAxios } from "./helper";

const BASE_URL = "/admin";

// Laptops
export const getAllLaptops = () => privateAxios.get(`${BASE_URL}/laptops`);
export const addLaptops = (data) => privateAxios.post(`${BASE_URL}/laptops`, data);
export const updateLaptop = (id, data) =>
  privateAxios.put(`${BASE_URL}/laptops/${id}`, data);

export const updateLaptopAvailableAndRent = (id, payload) =>
  privateAxios.put(`${BASE_URL}/laptops/${id}/availableAndRentperDay`, payload);
export const deleteLaptop = (id) => privateAxios.delete(`${BASE_URL}/laptops/${id}`);

// Users
export const getAllUsers = () => privateAxios.get(`${BASE_URL}/users`);
export const toggleUserBlock = (id) => privateAxios.put(`${BASE_URL}/users/${id}/block`);
export const deleteUser = (id) => privateAxios.delete(`${BASE_URL}/users/${id}`);

// Rentals
export const getAllRentals = () => privateAxios.get(`${BASE_URL}/rentals`);
export const updateRentalStatus = (id, status) =>
  privateAxios.put(`${BASE_URL}/rentals/${id}/status`, null, { params: { status } });

// Payments
export const getAllPayments = () => privateAxios.get(`${BASE_URL}/payments`);
export const verifyPayment = (id) => privateAxios.put(`${BASE_URL}/payments/${id}/verify`);
