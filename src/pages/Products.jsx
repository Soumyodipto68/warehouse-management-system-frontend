import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-bold text-gray-800">{p.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{p.description}</p>

            <div className="mt-4">
              <p className="text-indigo-600 font-semibold">₹{p.price}</p>
              <p className="text-gray-600 text-sm">Stock: {p.stock}</p>
            </div>

            <button
              onClick={() => navigate(`/products/${p.id}`)}
              className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}