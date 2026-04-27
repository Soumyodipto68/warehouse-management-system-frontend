import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b border-[#3e2a1c]">
        
        {/* Logo */}
        <h1
          onClick={() => navigate("/products")}
          className="text-xl font-bold text-[#e5d3b3] cursor-pointer"
        >
          WMS
        </h1>

        <div className="flex gap-3 items-center">

          <button
            onClick={() => navigate("/products")}
            className="button"
          >
            Products
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="button"
          >
            Orders
          </button>

          {/* 👑 Admin Only */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="button"
            >
              Dashboard
            </button>
          )}

          {/* 🔴 Logout */}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}