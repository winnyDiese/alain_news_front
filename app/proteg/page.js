"use client";
import useAuth from "@/hooks/useAuth";

export default function AdminPage() {
  useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenue sur la page Admin</h1>
    </div>
  );
}