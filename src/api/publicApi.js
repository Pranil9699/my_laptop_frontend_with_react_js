import { myAxios } from "./helper";

// Get All Laptops (only available & not blocked)
export const getAllLaptops = async () => {
  const response = await myAxios.get("/public/laptops");
  console.log("✅ Public laptops fetched:", response.data);
  return response.data;
};

// Get Single Laptop Details
export const getLaptopById = async (id) => {
  const response = await myAxios.get(`/public/laptops/${id}`);
  return response.data;
};

// Get About Info
export const getAboutInfo = async () => {
  const response = await myAxios.get("/public/about");
  return response.data;
};

// Get Contact Info
export const getContactInfo = async () => {
  const response = await myAxios.get("/public/contact");
  return response.data;
};
