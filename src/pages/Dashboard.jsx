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

      console.log("DASHBOARD DATA:", res.data);
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
    <Layout>
      <h1 className="text-2xl mb-6">Dashboard</h1>

      {/* 🔄 Loading State */}
      {loading && (
        <p className="mb-4 text-sm text-gray-400">Loading dashboard...</p>
      )}

      {/* ❌ Error Message */}
      {message && (
        <p className="mb-4 text-sm text-red-400">{message}</p>
      )}

      {/* 📊 Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card text-center">
          <h2 className="text-lg">Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="card text-center">
          <h2 className="text-lg">Products</h2>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>

        <div className="card text-center">
          <h2 className="text-lg">Orders</h2>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
      </div>

      {/* ⚠️ Low Stock Section */}
      <div className="card">
        <h2 className="text-lg mb-3">Low Stock Products</h2>

        {(stats.lowStock?.length ?? 0) === 0 ? (
          <p className="text-gray-400">All products are well stocked</p>
        ) : (
          stats.lowStock.map((p) => (
            <div
              key={p.id}
              className="flex justify-between border-b border-[#3e2a1c] py-2"
            >
              <span>{p.name}</span>
              <span className="text-red-400">{p.stock}</span>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}