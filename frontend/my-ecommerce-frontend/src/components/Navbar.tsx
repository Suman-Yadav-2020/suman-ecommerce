// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  return (
    <nav className="p-4 border-b flex justify-between">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-bold text-lg">My E-Store</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/cart">Cart ({items.length})</Link>
        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/profile">Hi, {user.name}</Link>
            <button onClick={logout} className="ml-2">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
