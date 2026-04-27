import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen  text-black bg-gradient-to-br from-[#eeeeec] via-[#f8f7f4] to-[#f2efee]">
      
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b border-[#3e2a1c]">
        
        {/* Logo */}
        <h1
          onClick={() => navigate("/products")}
          className="text-xl font-bold text-[#0f0f0e] cursor-pointer"
        >
          WMS
        </h1>

        <div className="flex gap-3 items-center">

          <button onClick={() => navigate("/products")} className="button">
            Products
          </button>

          <button onClick={() => navigate("/orders")} className="button">
            Orders
          </button>

          {user?.role === "admin" && (
            <button onClick={() => navigate("/dashboard")} className="button">
              Dashboard
            </button>
          )}

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white font-semibold transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Page Content */}
      <div className="p-6">
        <Outlet /> {/* ✅ THIS FIXES YOUR ISSUE */}
      </div>
    </div>
  );
}