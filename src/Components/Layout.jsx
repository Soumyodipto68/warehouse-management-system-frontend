import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div
            onClick={() => navigate("/products")}
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow">
              W
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                WMS
              </h1>
              <p className="text-xs text-slate-500">
                Warehouse Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/products")}
              className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 transition font-medium"
            >
              Products
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 transition font-medium"
            >
              Orders
            </button>

            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 transition font-medium"
              >
                Dashboard
              </button>
            )}

            {/* User Badge */}
            {user && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>

                <div className="text-sm">
                  <p className="font-semibold text-slate-800">
                    {user?.name}
                  </p>
                  <p className="text-slate-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 min-h-[80vh]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}