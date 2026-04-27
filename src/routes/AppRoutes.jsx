import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProducts";
import Orders from "../pages/Orders";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      
    </Routes>
  );
}