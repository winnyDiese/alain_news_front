"use client"

import { useState } from "react";
import { PlusCircle } from "lucide-react"; // ou autre icône que tu utilises

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔽 Ajouter la logique pour envoyer les données (POST)
    console.log("Form data submitted:", formData);
    // reset
    setFormData({ title: "", image: "", content: "" });
    setShowForm(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 🔽 Formulaire de création */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouveau post</h2>
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
              name="title"
              placeholder="Titre de l'article"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="url"
              name="image"
              placeholder="Lien de l'image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="content"
              placeholder="Contenu de l'article"
              rows={5}
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Publier
            </button>
          </form>
        )}
      </div>

      {/* 🔽 Liste des utilisateurs */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Liste des utilisateurs</h3>
        {/* Ici tu affiches ta liste de users */}
        {/* Exemple de liste en dur : */}
        <ul className="space-y-2">
          <li className="border-b pb-2">John Doe</li>
          <li className="border-b pb-2">Jane Smith</li>
        </ul>
      </div>
    </div>
  );
}
