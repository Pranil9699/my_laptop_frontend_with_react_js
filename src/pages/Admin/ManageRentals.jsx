// src/pages/Admin/AdminRentals.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllRentals, updateRentalStatus } from "../../api/adminApi";

export default function ManageRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRentals(); }, []);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const res = await getAllRentals();
      setRentals(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      await updateRentalStatus(id, newStatus);
      fetchRentals();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Manage Rentals</h1>

        <div className="bg-white rounded-2xl shadow overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Rental ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Laptop</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="7" className="p-6">Loading...</td></tr> :
                rentals.length === 0 ? <tr><td colSpan="7" className="p-6">No rentals</td></tr> :
                rentals.map(r => (
                  <tr key={r.id} className="border-t">
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.userInfo ?? "—"}</td>
                    <td className="p-3">{r.laptopInfo ?? "—"}</td>
                    <td className="p-3">{r.startDate}</td>
                    <td className="p-3">{r.endDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded ${r.status === "ONGOING" ? "bg-yellow-100" : r.status === "COMPLETED" || r.status === "Completed" ? "bg-green-100" : "bg-gray-100"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select defaultValue={r.status} onChange={(e) => changeStatus(r.id, e.target.value)} className="p-2 border rounded">
                        <option value="ONGOING">ONGOING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
