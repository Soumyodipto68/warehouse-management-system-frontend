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

  const [message, setMessage] = useState("");

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      setMessage("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl mb-6">Dashboard</h1>

      {message && (
        <p className="mb-4 text-sm text-[#e5d3b3]">{message}</p>
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

      {/* ⚠️ Low Stock */}
      <div className="card">
        <h2 className="text-lg mb-3">Low Stock Products</h2>

        {stats.lowStock.length === 0 ? (
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