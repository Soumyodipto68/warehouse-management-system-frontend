import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  // 🔐 decode role from token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch {
        setRole(null);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 border-b border-[#3e2a1c]">
        
        <h1
          onClick={() => navigate("/products")}
          className="text-xl font-bold text-[#e5d3b3] cursor-pointer"
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

          {/* 👑 Admin Only */}
          {role === "admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="button"
            >
              Dashboard
            </button>
          )}

          {/* 🔴 Logout always last */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
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