import { useEffect, useState,useRef } from "react";
import { getUserRentals } from "../api/userApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const effectRun = useRef(false);
  
    useEffect(() => {
      if (effectRun.current || !user?.id) return;
      effectRun.current = true;
  
      getUserRentals(user.id)
        .then((data) => setRentals(data))
        .catch((err) => console.error(err));
    }, [user?.id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">My Rentals</h1>

        {rentals.length === 0 ? (
          <p className="text-gray-600">No rentals found. Start renting a laptop!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rentals.map((r) => (
              <div key={r.rentalId} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">{r.laptopModel}</h3>
                <p><b>Start:</b> {r.startDate}</p>
                <p><b>End:</b> {r.endDate}</p>
                <p><b>Status:</b> {r.status}</p>
                {r.paymentAmount ? (
                  <p className="text-green-600 mt-2">
                    💰 Paid ₹{r.paymentAmount} ({r.paymentStatus})
                  </p>
                ) : (
                  <p className="text-red-500 mt-2">❌ Not Paid Yet</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
