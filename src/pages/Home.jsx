import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LaptopCard from "../components/LaptopCard";
import { getAllLaptops } from "../api/publicApi";
import { rentLaptop } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllLaptops()
      .then((data) => setLaptops(data)) // ✅ directly using array
      .catch((err) => console.error("Error fetching laptops:", err));
  }, []);

  const handleRent = async (laptopId) => {
    if (!token || !user) {
      alert("⚠️ Please login to rent a laptop.");
      navigate("/login");
      return;
    }

    try {
      const res = await rentLaptop(laptopId, user.id);
      alert(res.message);

      // ✅ Pass rentAmount to Payment.jsx
      navigate("/user/payment", {
        state: {
          rentalId: res.rentalId,
          laptop: res.laptop,
          rentAmount: res.rentAmount, // ✅ Added
        },
      });
    } catch (err) {
      console.error("Rent error:", err);
      alert("❌ Unable to rent laptop. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Available Laptops for Rent
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {laptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} onRent={handleRent} />
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
