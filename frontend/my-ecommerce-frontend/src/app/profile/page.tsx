// app/profile/page.tsx
"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
