// app/login/page.tsx
"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/");
    } catch (error: any) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {err && <div className="bg-red-100 text-red-700 p-2 mb-4">{err}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
