import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage("");

    if (!form.name || !form.price || !form.stock) {
      return setMessage("Please fill all required fields");
    }

    try {
      await API.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      setMessage("Product added successfully ✅");

      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 px-8 py-6 text-white">
          <h2 className="text-3xl font-bold">Add New Product</h2>
          <p className="text-indigo-100 mt-1">
            Fill in the details to add a product to inventory.
          </p>
        </div>

        <div className="p-8">
          {message && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* Product Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Enter product name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Write a short product description..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Stock Quantity
              </label>

              <input
                type="number"
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/products")}
              className="w-1/3 rounded-xl border border-slate-300 py-3 font-semibold hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="w-2/3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}