import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");

  // 📦 fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch {
      setMessage("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✏️ handle quantity
  const handleChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };

  // 🛒 place order
  const handleOrder = async (productId) => {
    setMessage("");

    const quantity = Number(quantities[productId]);

    if (!quantity || quantity <= 0) {
      return setMessage("Enter valid quantity");
    }

    try {
      await API.post("/orders", {
        items: [{ productId, quantity }],
      });

      setMessage("Order placed successfully ✅");

      setQuantities({
        ...quantities,
        [productId]: "",
      });

      fetchProducts(); // refresh stock
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Place Order</h1>
      </div>

      {/* Status Message */}
      {message && (
        <p className="mb-4 text-sm font-medium text-indigo-600">{message}</p>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold text-gray-800">{p.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{p.description}</p>

            <div className="mt-4">
              <p className="text-indigo-600 font-semibold">₹{p.price}</p>
              <p className="text-gray-600 text-sm">Stock: {p.stock}</p>
            </div>

            {/* Quantity + Order Button */}
            <div className="flex gap-2 mt-4">
              <input
                type="number"
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Qty"
                value={quantities[p.id] || ""}
                onChange={(e) => handleChange(p.id, e.target.value)}
              />

              <button
                onClick={() => handleOrder(p.id)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
