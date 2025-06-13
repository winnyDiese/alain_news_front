"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const LoginPage = () => {

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [label_btn, setLabel_btn] = useState("Log In");
  const router = useRouter();
  

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Échec de la connexion");

      setEmail("")
      setPassword("")
      setLabel_btn("Logging In")

      const { token, user } = await res.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/admin");
    } catch (error) {
      console.error("Erreur :", error.message);
      alert("Connexion échouée. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Left: Login Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-white p-8 shadow-md">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Alino Nzungu</h2>
          <h2 className="text-xl font-semibold mb-6 text-gray-600">Sign in</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {label_btn}
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">
              Don't have an account? <a href="#" className="text-blue-600">Sign up</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Description */}
      <div className="hidden md:flex w-3/5 bg-blue-50 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome Back!</h1>
          <p className="text-lg text-gray-600">
            This is your dashboard login page. Access all your tools, insights, and data in one
            place. Secure, fast and simple.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
