// app/register/page.tsx
"use client";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      router.push("/");
    } catch (error: any) {
      setErr(error.message || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {err && <div className="bg-red-100 text-red-700 p-2 mb-4">{err}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" />
        <button className="bg-green-600 text-white px-3 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
