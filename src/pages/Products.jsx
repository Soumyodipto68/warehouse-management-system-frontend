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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Product Inventory
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all products in your warehouse.
          </p>
        </div>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
        >
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow p-5 border">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {products.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border">
          <p className="text-sm text-gray-500">Total Stock</p>
          <h2 className="text-3xl font-bold text-green-600">
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 border">
          <p className="text-sm text-gray-500">Inventory Value</p>
          <h2 className="text-3xl font-bold text-amber-600">
            ₹
            {products.reduce(
              (sum, p) => sum + p.price * p.stock,
              0
            )}
          </h2>
        </div>
      </div>

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Top Color Bar */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

            <div className="p-5">
              {/* Product Icon */}
              <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">
                📦
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                {p.name}
              </h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {p.description || "No description available."}
              </p>

              {/* Price & Stock */}
              <div className="mt-5 flex justify-between items-center">
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

              <button
                onClick={() => navigate(`/products/${p.id}`)}
                className="mt-6 w-full rounded-xl border border-indigo-600 text-indigo-600 py-2.5 font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-slate-700">
            No Products Found
          </h2>
          <p className="text-gray-500 mt-2">
            Start by adding your first product.
          </p>

          <button
            onClick={() => navigate("/add-product")}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Add Product
          </button>
        </div>
      )}
    </div>
  );
}