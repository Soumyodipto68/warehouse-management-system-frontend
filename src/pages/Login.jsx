import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);

      if (isAdmin) navigate("/dashboard");
      else navigate("/products");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">

      <div className="relative w-[850px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* 🔹 FORMS */}
        <div className="absolute w-full h-full flex">

          {/* LEFT: CUSTOMER */}
          <div className="w-1/2 flex flex-col justify-center items-center p-10">
            <h2 className="text-2xl font-bold mb-4">Customer Login</h2>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button className="w-full bg-gray-900 text-white py-2 rounded-lg">
                Login
              </button>
              <div className="mt-6 text-center text-sm text-gray-500">
            <p>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
            </form>
          </div>

          {/* RIGHT: ADMIN */}
          <div className="w-1/2 flex flex-col justify-center items-center p-10">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="email"
                placeholder="Admin Email"
                required
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                Admin Login
              </button>
            </form>
          </div>

        </div>

        {/* 🔥 OVERLAY */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full z-10 
          bg-gradient-to-br from-indigo-600 to-purple-700 text-white 
          flex flex-col justify-center items-center p-10 
          transition-all duration-500 ease-in-out
          pointer-events-none
          ${isAdmin ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="pointer-events-auto text-center">

            {isAdmin ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Are you a Admin?
                </h2>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="border cursor-pointer px-6 py-2 rounded-lg hover:bg-white hover:text-black transition "
                >
                  Switch to Admin
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Login as Customer
                </h2>
                <button
                  onClick={() => setIsAdmin(true)}
                  className="border cursor-pointer px-6 py-2 rounded-lg hover:bg-white hover:text-black transition "
                >
                  Switch to Customer Login
                </button>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}