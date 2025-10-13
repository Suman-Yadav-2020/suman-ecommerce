// components/ProductCard.tsx
"use client";
import Link from "next/link";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const id = p._id ?? p.id ?? "";
  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold">{p.name}</h3>
      <p className="text-sm">{p.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <div>₹{p.price}</div>
        <div className="flex gap-2">
          <Link href={`/product/${id}`} className="underline">View</Link>
          <button onClick={() => add(p, 1)} className="px-2 py-1 border rounded">Add</button>
        </div>
      </div>
    </div>
  );
}
