import { useEffect, useState } from "react";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Products</h1>

      {products.map((p) => (
        <div key={p.id} className="border p-3 mb-2">
          <h2>{p.name}</h2>
          <p>Stock: {p.stock}</p>
        </div>
      ))}
    </div>
  );
}