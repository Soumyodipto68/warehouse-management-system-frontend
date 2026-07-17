import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProducts";
import Orders from "../pages/Orders";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Layout from "../components/Layout";
import { ProductDetails } from "../pages/ProductDetails";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>

        {/* Layout wrapper */}
        <Route element={<Layout />}>

          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          

          {/* Admin only */}
          <Route element={<AdminRoute />}>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Route>
      </Route>

    </Routes>
  );
}