import { privateAxios } from "./helper";

// 👤 Get User Profile
export const getUserProfile = async (userId) => {
  const response = await privateAxios.get(`/user/profile/${userId}`);
  return response.data;
};

// 💻 Rent a Laptop
export const rentLaptop = async (laptopId, userId) => {
  const response = await privateAxios.post(`/user/rent/${laptopId}/user/${userId}`);
  console.log("✅ Laptop rented:", response.data);
  return response.data;
};

// 💳 Make Payment
export const makePayment = async (rentalId, userId, paymentData) => {
  const response = await privateAxios.post(
    `/user/payment/${rentalId}/user/${userId}`,
    paymentData
  );
  console.log("✅ Payment made:", response.data);
  return response.data;
};

// 📦 Get All Rentals of a User
export const getUserRentals = async (userId) => {
  const response = await privateAxios.get(`/user/rentals/${userId}`);
  return response.data;
};
