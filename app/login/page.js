"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Échec de la connexion");

      const { token, user } = await res.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/admin");
    } catch (error: any) {
      console.error("Erreur :", error.message);
      alert("Connexion échouée. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Login Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-white p-8 shadow-md">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Connexion</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Se connecter
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">
              Vous n'avez pas de compte ? <a href="#" className="text-blue-600">Créer un compte</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Description */}
      <div className="hidden md:flex w-3/5 bg-blue-50 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Bon retour parmi nous !</h1>
          <p className="text-lg text-gray-600">
            Connectez-vous à votre tableau de bord pour gérer vos outils, consulter vos données, et rester informé. Simple, rapide, sécurisé.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
