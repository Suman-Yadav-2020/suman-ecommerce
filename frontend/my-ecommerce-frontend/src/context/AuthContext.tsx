// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => (typeof window !== "undefined" ? localStorage.getItem("token") : null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      (async () => {
        try {
          const res = await api.getProfile(token);
          setUser((res as any).profile ?? (res as any));
        } catch (e) {
          console.error("profile load failed", e);
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        }
      })();
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const register = async (payload: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.register(payload);
      setToken(res.token);
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.login(payload);
      setToken(res.token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
