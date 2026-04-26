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
    <Layout>
      <div className="max-w-md mx-auto card">
        <h2 className="text-xl mb-4">Add Product</h2>

        {message && (
          <p className="mb-3 text-sm text-[#e5d3b3]">
            {message}
          </p>
        )}

        <input
          className="input mb-2"
          placeholder="Product Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          className="input mb-2"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          className="input mb-2"
          placeholder="Price"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="number"
          className="input mb-4"
          placeholder="Stock"
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />

        <button onClick={handleSubmit} className="button w-full">
          Add Product
        </button>
      </div>
    </Layout>
  );
}