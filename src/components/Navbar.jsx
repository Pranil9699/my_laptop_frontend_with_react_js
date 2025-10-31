import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // 🧭 Load user info & role on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRole = localStorage.getItem("role");
    setUser(storedUser);
    setRole(storedRole);
  }, []);

  // 🧹 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  // 🧩 Normalize role (e.g., ROLE_USER → USER)
  const normalizedRole = role?.replace("ROLE_", "");

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        💻 My Laptop Rental
      </h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/about" className="hover:text-gray-200">About</Link>
        <Link to="/contact" className="hover:text-gray-200">Contact</Link>

        {/* 👤 Not Logged In */}
        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </>
        )}

        {/* 👩‍💼 Logged In as User */}
        {user && normalizedRole === "USER" && (
          <>
            <Link to="/user/dashboard" className="hover:text-gray-200">Dashboard</Link>
            <Link to="/user/rentals" className="hover:text-gray-200">My Rentals</Link>
            {/* <Link to="/user/payment" className="hover:text-gray-200">Payments</Link> */}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {/* 🧑‍💼 Logged In as Admin */}
        {user && normalizedRole === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="hover:text-gray-200">Dashboard</Link>
            <Link to="/admin/laptops" className="hover:text-gray-200">Laptops</Link>
            <Link to="/admin/users" className="hover:text-gray-200">Users</Link>
            <Link to="/admin/rentals" className="hover:text-gray-200">Rentals</Link>
            <Link to="/admin/payments" className="hover:text-gray-200">Payments</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
