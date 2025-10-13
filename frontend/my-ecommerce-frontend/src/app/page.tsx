// app/page.tsx
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000"}/api/products`);
  if (!res.ok) {
    return <div>Error loading products</div>;
  }
  const data = (await res.json()) as { count: number; data: Product[] };
  const products = data?.data ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        Product
        {products.map((p) => (
          <ProductCard key={p._id ?? p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
