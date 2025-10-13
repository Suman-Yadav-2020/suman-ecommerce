// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";

type CartItem = { id: string; product: Product; qty: number };
type CartContextType = { items: CartItem[]; add: (product: Product, qty?: number) => void; remove: (id: string) => void; clear: () => void };

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === (product._id ?? product.id));
      if (found) return prev.map((i) => (i.id === (product._id ?? product.id) ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id: product._id ?? product.id ?? String(Math.random()), product, qty }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  return <CartContext.Provider value={{ items, add, remove, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
