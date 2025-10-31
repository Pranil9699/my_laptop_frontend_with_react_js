import { myAxios } from "./helper";

// 📝 Register User
export const registerUser = async (userData) => {
  const response = await myAxios.post("/auth/register", userData);
  console.log("✅ Registered:", response.data);
  return response.data;
};

// 🔑 Login User
export const loginUser = async (loginData) => {
  const response = await myAxios.post("/auth/login", loginData);
  console.log("✅ Logged in:", response.data);
  return response.data;
};

// 🚪 Logout (frontend only)
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  return { message: "User logged out successfully" };
};
