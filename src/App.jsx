import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🌐 Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// 📄 Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About"
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Rentals from "./pages/Rentals";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

// 🧭 Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageLaptops from "./pages/Admin/ManageLaptops";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageRentals from "./pages/Admin/ManageRentals";
import ManagePayments from "./pages/Admin/ManagePayments";

// 🧩 Global Styles
// import "./styles/global.css";
// import "./styles/components.css";
import "./App.css";

function App() {
  // get role from localStorage
  const userRole = localStorage.getItem("role"); // "ADMIN" | "USER" | null

  return (
    <Router>
      <div className="app-container">
        {/* <Navbar /> */}

        <main className="content">
          <Routes>
            {/* 🌍 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* 👤 User Protected Routes */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/rentals"
              element={
                <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                  <Rentals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/payment"
              element={
                <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                  <Payment />
                </ProtectedRoute>
              }
            />

            {/* 🧭 Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/laptops"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageLaptops />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rentals"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageRentals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManagePayments />
                </ProtectedRoute>
              }
            />

            {/* ❌ 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
