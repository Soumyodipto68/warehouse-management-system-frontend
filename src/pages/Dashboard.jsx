import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    lowStock: [],
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");

      setStats({
        users: res.data?.totalUsers ?? 0,
        products: res.data?.totalProducts ?? 0,
        orders: res.data?.totalOrders ?? 0,
        lowStock: res.data?.lowStockProducts ?? [],
      });
    } catch (err) {
      console.error("Dashboard Error:", err);
      setMessage("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Loading State */}
      {loading && (
        <p className="mb-4 text-sm text-gray-500">Loading dashboard...</p>
      )}

      {/* Error Message */}
      {message && (
        <p className="mb-4 text-sm text-red-500">{message}</p>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Users</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.users}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Products</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.products}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Orders</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.orders}</p>
        </div>
      </div>

      {/* Low Stock Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Low Stock Products
        </h2>

        {(stats.lowStock?.length ?? 0) === 0 ? (
          <p className="text-gray-500">All products are well stocked ✅</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {stats.lowStock.map((p) => (
              <div
                key={p.id}
                className="flex justify-between py-3 text-sm"
              >
                <span className="font-medium text-gray-700">{p.name}</span>
                <span className="text-red-600 font-semibold">
                  Stock: {p.stock}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
