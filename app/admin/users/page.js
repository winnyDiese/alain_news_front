"use client"

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔽 Ajouter la logique pour envoyer les données (POST)
    console.log("Nouvel utilisateur :", formData);
    // reset
    setFormData({ name: "", email: "", type: "" });
    setShowForm(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 🔽 Formulaire de création d'utilisateur */}
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
              type="text"
              name="type"
              placeholder="Type d'utilisateur (ex: admin, éditeur...)"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Enregistrer
            </button>
          </form>
        )}
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Liste des utilisateurs</h1>
      </header>

      {/* Tableau des utilisateurs */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Nom</th>
              <th className="py-2">Email</th>
              <th className="py-2">Rôle</th>
              <th className="py-2">Date d'inscription</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Alice Martin</td>
              <td className="py-2">alice@example.com</td>
              <td className="py-2">Admin</td>
              <td className="py-2">2025-05-01</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Jean Dupont</td>
              <td className="py-2">jean.dupont@example.com</td>
              <td className="py-2">Utilisateur</td>
              <td className="py-2">2025-04-21</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Fatima B.</td>
              <td className="py-2">fatima.b@example.com</td>
              <td className="py-2">Éditeur</td>
              <td className="py-2">2025-06-01</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Louis R.</td>
              <td className="py-2">louisr@example.com</td>
              <td className="py-2">Utilisateur</td>
              <td className="py-2">2025-06-08</td>
            </tr>
          </tbody>
        </table>
      </div>

      
    </div>
  );
}
