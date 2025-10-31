// src/pages/Admin/AdminLaptops.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getAllLaptops,
  addLaptops,
  updateLaptopAvailableAndRent,
  deleteLaptop,
  updateLaptop,
} from "../../api/adminApi";

export default function ManageLaptops() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLaptop, setEditLaptop] = useState(null);

  const [formRows, setFormRows] = useState([
    {
      brand: "",
      model: "",
      processor: "",
      ram: "",
      storage: "",
      graphicsCard: "",
      rentPerDay: "",
      conditionStatus: "",
      description: "",
      imageName: "",
    },
  ]);

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    setLoading(true);
    try {
      const res = await getAllLaptops();
      setLaptops(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // toggle availability
  const toggleAvailable = async (laptop) => {
    try {
      await updateLaptopAvailableAndRent(laptop.id, {
        available: !laptop.available,
      });
      fetchLaptops();
    } catch (err) {
      console.error(err);
      alert("Could not toggle availability");
    }
  };

  const handleRentEdit = async (laptopId, newRent) => {
    try {
      await updateLaptopAvailableAndRent(laptopId, { rentPerDay: newRent });
      fetchLaptops();
    } catch (err) {
      console.error(err);
      alert("Failed to update rent");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this laptop permanently?")) return;
    await deleteLaptop(id);
    fetchLaptops();
  };

  // Add Laptop Form
  const addRow = () =>
    setFormRows([
      ...formRows,
      {
        brand: "",
        model: "",
        processor: "",
        ram: "",
        storage: "",
        graphicsCard: "",
        rentPerDay: "",
        conditionStatus: "",
        description: "",
        imageName: "",
      },
    ]);

  const updateRow = (idx, key, val) => {
    const cp = [...formRows];
    cp[idx][key] = val;
    setFormRows(cp);
  };

  const submitNew = async (e) => {
    e.preventDefault();
    try {
      const payload = formRows.map((r) => ({
        brand: r.brand,
        model: r.model,
        processor: r.processor,
        graphicsCard: r.graphicsCard,
        ram: r.ram,
        storage: r.storage,
        rentPerDay: Number(r.rentPerDay || 0),
        conditionStatus: r.conditionStatus || "GOOD",
        description: r.description || "",
        imageName: r.imageName || "",
        available: true,
        blocked: false,
      }));
      await addLaptops(payload);
      setShowAddModal(false);
      setFormRows([
        {
          brand: "",
          model: "",
          processor: "",
          ram: "",
          storage: "",
          graphicsCard: "",
          rentPerDay: "",
          conditionStatus: "",
          description: "",
          imageName: "",
        },
      ]);
      fetchLaptops();
      alert("Laptop(s) added successfully");
    } catch (err) {
      console.error(err);
      alert("Add failed");
    }
  };

  const submitEdit = async () => {
    try {
      await updateLaptop(editLaptop.id, editLaptop);
      setShowEditModal(false);
      fetchLaptops();
      alert("Laptop updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Laptops</h1>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              + Add Laptop
            </button>
            <button
              onClick={fetchLaptops}
              className="ml-3 px-4 py-2 bg-gray-200 rounded"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Model</th>
                <th className="p-3">Rent/Day</th>
                <th className="p-3">Available</th>
                <th className="p-3">Condition</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : laptops.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    No laptops found
                  </td>
                </tr>
              ) : (
                laptops.map((l) => (
                  <tr key={l.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{l.id}</td>
                    <td className="p-3">{l.brand}</td>
                    <td className="p-3">{l.model}</td>
                    <td className="p-3">
                      <InlineRentEditor
                        initial={l.rentPerDay ?? 0}
                        onSave={(val) => handleRentEdit(l.id, val)}
                      />
                    </td>
                    <td className="p-3">
                      <button
                        className={`px-3 py-1 rounded ${
                          l.available ? "bg-green-100" : "bg-red-100"
                        }`}
                        onClick={() => toggleAvailable(l)}
                      >
                        {l.available ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="p-3">{l.conditionStatus}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setEditLaptop(l);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(l.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-4xl bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add Laptops</h3>
            <form onSubmit={submitNew} className="space-y-4">
              {formRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
                >
                  {[
                    "brand",
                    "model",
                    "processor",
                    "graphicsCard",
                    "ram",
                    "storage",
                    "rentPerDay",
                    "conditionStatus",
                    "imageName",
                    "description",
                  ].map((field) => (
                    <input
                      key={field}
                      value={row[field]}
                      onChange={(e) => updateRow(i, field, e.target.value)}
                      placeholder={
                        field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")
                      }
                      className="p-2 border rounded"
                    />
                  ))}
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={addRow}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  + Add another
                </button>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-indigo-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editLaptop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Laptop</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "brand",
                "model",
                "processor",
                "graphicsCard",
                "ram",
                "storage",
                "rentPerDay",
                "conditionStatus",
                "imageName",
              ].map((field) => (
                <input
                  key={field}
                  value={editLaptop[field] ?? ""}
                  onChange={(e) =>
                    setEditLaptop({ ...editLaptop, [field]: e.target.value })
                  }
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  className="border p-2 rounded"
                />
              ))}
              <textarea
                value={editLaptop.description ?? ""}
                onChange={(e) =>
                  setEditLaptop({ ...editLaptop, description: e.target.value })
                }
                placeholder="Description"
                className="border p-2 rounded col-span-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white"
                onClick={submitEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </>
  );
}

/* Inline Rent Editor component */
function InlineRentEditor({ initial = 0, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(initial);

  useEffect(() => setVal(initial), [initial]);

  return editing ? (
    <div className="flex items-center space-x-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        type="number"
        className="p-1 w-24 border rounded"
      />
      <button
        className="px-2 py-1 bg-green-500 text-white rounded"
        onClick={() => {
          onSave(Number(val));
          setEditing(false);
        }}
      >
        Save
      </button>
      <button
        className="px-2 py-1 bg-gray-200 rounded"
        onClick={() => {
          setVal(initial);
          setEditing(false);
        }}
      >
        Cancel
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-2">
      <span>₹{initial}</span>
      <button
        className="px-2 py-1 bg-blue-100 rounded"
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
    </div>
  );
}
