"use client"

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: ""
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔽 Récupération des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔽 Gérer les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔽 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.type // temporairement comme "mot de passe"
        })
      });

      if (!res.ok) throw new Error("Échec de l'ajout");

      const newUser = await res.json();
      setUsers([...users, newUser]);

      // reset
      setFormData({ name: "", email: "", type: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Liste des utilisateurs</h1>
      </header>

      {/* 🔽 Formulaire */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouvel utilisateur</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
          >
            <PlusCircle size={18} />
            {showForm ? "Annuler" : "Créer"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom de l'utilisateur"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="type"
              placeholder="Mot de passe..."
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </form>
        )}
      </div>

      {/* 🔽 Tableau */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Nom</th>
              <th className="py-2">Email</th>
              {/* <th className="py-2">Rôle</th> */}
              <th className="py-2">Date d'inscription</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-400">
                  Aucun utilisateur enregistré.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{user.username}</td>
                  <td className="py-2">{user.email}</td>
                  {/* <td className="py-2">{user.password}</td> utilisé ici comme rôle */}
                  <td className="py-2">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
