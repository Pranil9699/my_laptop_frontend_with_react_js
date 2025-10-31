import { useEffect, useState, useRef } from "react";
import { getUserRentals } from "../api/userApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rentals, setRentals] = useState([]);

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
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.fullName}</h1>
        <p className="text-gray-600 mb-6">Email: {user?.email}</p>

        <h2 className="text-2xl font-semibold mb-3">Your Current Rentals</h2>
        {rentals.length === 0 ? (
          <p className="text-gray-500">You haven't rented any laptops yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rentals.map((r) => (
              <div key={r.rentalId} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{r.laptopModel}</h3>
                <p>
                  <b>Start:</b> {r.startDate}
                </p>
                <p>
                  <b>End:</b> {r.endDate}
                </p>
                <p>
                  <b>Status:</b> {r.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}
