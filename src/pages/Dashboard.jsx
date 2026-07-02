import { useEffect, useState } from "react";
import API from "../services/api";

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

  const cards = [
    {
      title: "Users",
      value: stats.users,
      icon: "👥",
      accent: "from-indigo-500 to-violet-500",
    },
    {
      title: "Products",
      value: stats.products,
      icon: "📦",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: "🛒",
      accent: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Warehouse control center
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Admin Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Keep an eye on inventory health, customer activity, and order flow from one streamlined view.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur">
            <p className="text-slate-400">System status</p>
            <p className="font-semibold text-emerald-300">● Online</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-3 w-20 rounded-full bg-slate-200" />
              <div className="mt-4 h-8 w-16 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {message && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      {!loading && !message && (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${card.accent} p-3 text-xl`}>
                  {card.icon}
                </div>
                <h2 className="mt-4 text-sm font-medium text-slate-500">{card.title}</h2>
                <p className="mt-2 text-3xl font-semibold text-slate-800">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Inventory snapshot</h2>
                  <p className="text-sm text-slate-500">A quick view of stock coverage today.</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  Healthy
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tracked products</span>
                    <span className="font-semibold text-slate-800">{stats.products}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Orders in progress</span>
                    <span className="font-semibold text-slate-800">{stats.orders}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Low stock products</h2>
                  <p className="text-sm text-slate-500">Items that need attention soon.</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                  {stats.lowStock?.length ?? 0} items
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {(stats.lowStock?.length ?? 0) === 0 ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    All products are well stocked ✅
                  </div>
                ) : (
                  stats.lowStock.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-slate-700">{product.name}</p>
                        <p className="text-xs text-slate-500">Needs restock</p>
                      </div>
                      <span className="rounded-full bg-red-100 px-2.5 py-1 text-sm font-semibold text-red-600">
                        Stock: {product.stock}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
