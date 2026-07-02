import { useEffect, useState } from "react";
import API from "../services/api";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Place Orders
          </h1>
          <p className="text-gray-500 mt-1">
            Select products and place warehouse orders.
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-3xl">
          🛒
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`rounded-xl px-5 py-3 font-medium ${
            message.includes("✅")
              ? "bg-green-100 border border-green-300 text-green-700"
              : "bg-red-100 border border-red-300 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top Bar */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

            <div className="p-6">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">
                📦
              </div>

              {/* Product Info */}
              <h2 className="text-xl font-bold text-slate-800">
                {p.name}
              </h2>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {p.description || "No description available"}
              </p>

              {/* Price & Stock */}
              <div className="flex justify-between items-center mt-5">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-xl font-bold text-indigo-600">
                    ₹{p.price}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Stock</p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      p.stock > 20
                        ? "bg-green-100 text-green-700"
                        : p.stock > 5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.stock} Units
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-600">
                  Quantity
                </label>

                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantities[p.id] || ""}
                  onChange={(e) => handleChange(p.id, e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                />
              </div>

              {/* Button */}
              <button
                onClick={() => handleOrder(p.id)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md border p-12 text-center">
          <div className="text-6xl mb-4">📦</div>

          <h2 className="text-2xl font-bold text-slate-700">
            No Products Available
          </h2>

          <p className="text-gray-500 mt-2">
            Add products before placing orders.
          </p>
        </div>
      )}
    </div>
  );
}