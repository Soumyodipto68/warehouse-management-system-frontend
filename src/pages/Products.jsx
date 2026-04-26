import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Products</h1>

        <button
          onClick={() => navigate("/add-product")}
          className="button"
        >
          Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h2 className="font-bold">{p.name}</h2>
            <p className="text-sm text-gray-400">
              {p.description}
            </p>
            <p className="mt-2">₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}