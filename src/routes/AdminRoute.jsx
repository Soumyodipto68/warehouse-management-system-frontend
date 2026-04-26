import { Navigate } from "react-router-dom";
import { decodeToken } from "../utils/decodeToken";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const user = decodeToken(token);

  if (!user) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return children;
}