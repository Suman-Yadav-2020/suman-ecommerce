// src/app/product/[id]/page.tsx
import { Product } from "../../../types";
import ProductCard from "../../../components/ProductCard";

type Props = {
  params: Promise<{ id: string }>; // mark params as a Promise
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // ✅ await params before accessing
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000"}/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return <div>Product not found</div>;

  const p = (await res.json()) as Product;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{p.name}</h1>
      <p>{p.description}</p>
      <div className="mt-4">Price: ₹{p.price}</div>
      <div className="mt-4">
        <ProductCard p={p} />
      </div>
    </div>
  );
}
