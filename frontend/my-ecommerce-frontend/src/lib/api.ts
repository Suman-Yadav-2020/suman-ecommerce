// lib/api.ts
import { Product, User } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
};

async function request<T>(path: string, { method = "GET", body, token, headers = {} }: RequestOptions = {}): Promise<T> {
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  };
  if (token) (opts.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, opts);
  const text = await res.text();
  let data: any = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message = data?.message || res.statusText || "API error";
    const err: any = new Error(message);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data as T;
}

export const api = {
  getProducts: (q = "") => request<{ count: number; data: Product[] }>(`/api/products${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getProduct: (id: string) => request<Product>(`/api/products/${id}`),
  createProduct: (body: Partial<Product>, token?: string | null) => request<Product>(`/api/products`, { method: "POST", body, token }),
  register: (body: { name: string; email: string; password: string }) => request<{ user: User; token: string }>(`/api/auth/register`, { method: "POST", body }),
  login: (body: { email: string; password: string }) => request<{ user: User; token: string }>(`/api/auth/login`, { method: "POST", body }),
  getProfile: (token?: string | null) => request<{ profile: User | null }>(`/api/profile`, { token }),
};
