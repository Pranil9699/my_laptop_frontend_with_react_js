// src/pages/Admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllUsers, toggleUserBlock, deleteUser } from "../../api/adminApi";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleUserBlock(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle user");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

        <div className="bg-white rounded-2xl shadow overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Active</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="6" className="p-6">Loading...</td></tr>
                : users.length === 0 ? <tr><td colSpan="6" className="p-6">No users</td></tr>
                : users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.fullName}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.phone}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded ${u.active ? "bg-green-100" : "bg-red-100"}`}>
                        {u.active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button className="px-3 py-1 bg-yellow-400 rounded" onClick={() => handleToggle(u.id)}>
                        {u.active ? "Block" : "Unblock"}
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(u.id)}>Delete</button>
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
