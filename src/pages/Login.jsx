import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 important

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="card w-80">
        <h2 className="text-xl mb-4">Login</h2>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <input
          className="input mb-2"
          placeholder="Email"
          type="email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="input mb-2"
          placeholder="Password"
          type="password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit" className="button w-full">
          Login
        </button>
      </form>
    </div>
  );
}