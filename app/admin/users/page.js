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

      {/* 🔽 Liste des utilisateurs */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Liste des utilisateurs</h3>
        {/* Exemple statique - à remplacer par la vraie liste dynamique */}
        <ul className="divide-y divide-gray-200">
          <li className="py-2">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-600">john@example.com - Admin</p>
          </li>
          <li className="py-2">
            <p className="font-semibold">Jane Smith</p>
            <p className="text-sm text-gray-600">jane@example.com - Éditeur</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
