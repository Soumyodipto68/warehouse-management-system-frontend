import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Success");
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 shadow-lg rounded-lg w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2"
        >
          Login
        </button>
        <p
  className="text-sm mt-2 text-blue-500 cursor-pointer"
  onClick={() => navigate("/signup")}
>
  Don't have an account? Signup
</p>
      </div>
    </div>
  );
}