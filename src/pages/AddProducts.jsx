import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
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
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h2>

        {message && (
          <p
            className={`mb-4 text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter product name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter product description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Stock */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Stock
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter stock quantity"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Add Product
        </button>
      </div>
    </>
  );
}
