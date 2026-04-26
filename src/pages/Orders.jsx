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
    <Layout>
      <h1 className="text-2xl mb-4">Place Order</h1>

      {message && (
        <p className="mb-4 text-sm text-[#e5d3b3]">{message}</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h2 className="font-bold">{p.name}</h2>

            <p className="text-sm text-gray-400">
              {p.description}
            </p>

            <p className="mt-2">₹{p.price}</p>
            <p>Stock: {p.stock}</p>

            <div className="flex gap-2 mt-3">
              <input
                type="number"
                className="input w-24"
                placeholder="Qty"
                value={quantities[p.id] || ""}
                onChange={(e) =>
                  handleChange(p.id, e.target.value)
                }
              />

              <button
                onClick={() => handleOrder(p.id)}
                className="button"
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}