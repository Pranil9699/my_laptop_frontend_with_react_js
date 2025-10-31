// src/pages/Admin/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllPayments, verifyPayment } from "../../api/adminApi";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getAllPayments();
      console.log(res.data)
      setPayments(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    await verifyPayment(id);
    fetchPayments();
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Manage Payments</h1>

        <div className="bg-white rounded-2xl shadow overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Payment ID</th>
                <th className="p-3">Rental ID</th>
                <th className="p-3">Method</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Transaction_id</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-6">
                    Loading...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6">
                    No payments
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.rental?.id ?? p.rentalId ?? "—"}</td>
                    <td className="p-3">{p.paymentMethod ?? p.method}</td>
                    <td className="p-3">₹{p.amount}</td>
                    <td className="p-3">{p.transactionId}</td>
                    <td className="p-3">
                      {p.paymentVerification ?? p.verification ?? "—"}
                    </td>
                    <td className="p-3">
                      {p.paymentDate
                        ? new Date(p.paymentDate)
                            .toLocaleString("en-GB", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })
                            .replace(",", " -")
                            .replaceAll("/", "/")
                        : "—"}
                    </td>
                    <td className="p-3">
                      {(p.paymentMethod === "CASH" ||
                        (p.method && p.method.toUpperCase() === "CASH")) &&
                      (p.paymentVerification === "NOT_VERIFIED" ||
                        p.verification === "NOT_VERIFIED") ? (
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleVerify(p.id)}
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 rounded">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
