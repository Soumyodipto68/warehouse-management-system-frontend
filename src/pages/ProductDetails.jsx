import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const stockStatus =
    product?.stock > 20
      ? { label: "In Stock", color: "bg-green-100 text-green-700" }
      : product?.stock > 5
      ? { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" }
      : { label: "Out of Stock", color: "bg-red-100 text-red-700" };

  return (
    <div className="min-h-[80vh] px-2 py-4 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-500 px-6 py-8 text-white sm:px-8">
          <button
            onClick={() => navigate("/products")}
            className="mb-4 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
          >
            ← Back to Inventory
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">
                Product Details
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                {loading ? "Loading product..." : product?.name || "Product not found"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-indigo-100 sm:text-base">
                Review stock, pricing, and product information in one place.
              </p>
            </div>

            {!loading && product && (
              <div className="inline-flex w-fit items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                {product.stock} units available
              </div>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {loading && (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="animate-pulse rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <div className="h-6 w-32 rounded bg-slate-200" />
                <div className="mt-4 h-8 w-3/4 rounded bg-slate-200" />
                <div className="mt-4 h-24 rounded bg-slate-200" />
              </div>
              <div className="space-y-4">
                <div className="h-28 rounded-3xl bg-slate-100" />
                <div className="h-28 rounded-3xl bg-slate-100" />
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <div className="mb-4 text-5xl">⚠️</div>
              <h2 className="text-2xl font-bold text-slate-800">Unable to load this product</h2>
              <p className="mt-2 text-slate-600">{error}</p>
              <button
                onClick={() => navigate("/products")}
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Go back to products
              </button>
            </div>
          )}

          {!loading && product && (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
                    📦
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                      Inventory Item
                    </p>
                    <h2 className="text-2xl font-bold text-slate-800">{product.name}</h2>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Description
                  </p>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {product.description || "No description was added for this product yet."}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Price
                    </p>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">₹{product.price}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Stock
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-800">{product.stock}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Availability
                  </p>
                  <div className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${stockStatus.color}`}>
                    {stockStatus.label}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    This product is currently {product.stock > 0 ? "ready for warehouse dispatch" : "unavailable in stock"}.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-800 to-slate-700 p-6 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                    Inventory Value
                  </p>
                  <p className="mt-3 text-4xl font-bold">₹{product.price * product.stock}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Based on current stock and unit price.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
