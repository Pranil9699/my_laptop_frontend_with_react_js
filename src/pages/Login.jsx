import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("role", res.user.roles[0].name);
      localStorage.setItem("token", res.token);

      if(localStorage.getItem("role")==="ROLE_ADMIN")
      navigate("/admin/dashboard");
      else
      navigate("/user/dashboard");

    } catch {
      alert("Login failed. Please check credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 fade-in">
        <form
          onSubmit={handleSubmit}
          className="card-glass w-96 p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}
