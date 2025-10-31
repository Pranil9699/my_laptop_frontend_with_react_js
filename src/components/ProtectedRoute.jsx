// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const userRole = localStorage.getItem("role"); // "ADMIN", "USER", or null

//   if (!userRole) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  // 🧩 Normalize the role (remove "ROLE_" prefix if present)
  const userRole = storedRole?.replace("ROLE_", "");

  if (!token) {
    console.warn("⛔ No token found. Redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.warn(`🚫 Access denied for role: ${userRole}`);
    return <Navigate to="/" />;
  }

  return children;
}
