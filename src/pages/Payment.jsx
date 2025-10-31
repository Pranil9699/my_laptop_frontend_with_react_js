import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makePayment } from "../api/userApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [amount, setAmount] = useState(state?.rentAmount || "");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const paymentData = {
        amount,
        paymentMethod,
        transactionId,
      };

      const res = await makePayment(state.rentalId, user.id, paymentData);
      alert(res.message);
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Laptop</label>
              <input
                type="text"
                value={state?.laptop || ""}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                disabled // ✅ User cannot change
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Method</option>
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
                {/* <option value="CARD">Card</option> */}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Transaction ID (optional)</label>
              <input
                type="text"
                placeholder="Auto-generated if left empty"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
