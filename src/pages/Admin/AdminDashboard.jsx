// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllLaptops, getAllRentals, getAllPayments, getAllUsers } from "../../api/adminApi";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    laptops: 0,
    rentals: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const [lRes, uRes, rRes, pRes] = await Promise.all([
          getAllLaptops(),
          getAllUsers(),
          getAllRentals(),
          getAllPayments(),
        ]);
        setCounts({
          users: uRes?.data?.length ?? 0,
          laptops: lRes?.data?.length ?? 0,
          rentals: rRes?.data?.length ?? 0,
          payments: pRes?.data?.length ?? 0,
        });
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const Card = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-2xl shadow-md bg-white flex items-center justify-between`}>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg text-white ${color}`}>{icon}</div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {loading ? (
          <div className="p-8 bg-white rounded shadow">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card title="Total Users" value={counts.users} icon="👥" color="bg-blue-500" />
              <Card title="Total Laptops" value={counts.laptops} icon="💻" color="bg-green-500" />
              <Card title="Total Rentals" value={counts.rentals} icon="📦" color="bg-yellow-500" />
              <Card title="Total Payments" value={counts.payments} icon="💲" color="bg-pink-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 p-6 rounded-2xl bg-white shadow">
                <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
                <p className="text-sm text-gray-500">Use the left menu to manage Laptops, Users, Rentals, or Payments.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow">
                <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                <div className="space-y-3">
                  <a className="block w-full text-center py-2 rounded bg-blue-600 text-white" href="/admin/laptops">Manage Laptops</a>
                  <a className="block w-full text-center py-2 rounded bg-green-600 text-white" href="/admin/users">Manage Users</a>
                  <a className="block w-full text-center py-2 rounded bg-yellow-600 text-white" href="/admin/rentals">Manage Rentals</a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}
