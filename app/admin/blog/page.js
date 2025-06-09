"use client";

import { useState, useEffect } from "react";
import { ScrollText, MessageCircle, PlusCircle } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api/users";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    noms: "",
    email: "",
    type_user: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const cleanedData = Array.isArray(data)
          ? data.filter((u) => u && typeof u.noms === "string")
          : [];
        setUsers(cleanedData);
        if (cleanedData.length > 0) setSelectedUser(cleanedData[0]);
      })
      .catch((err) => {
        console.error("Erreur de récupération :", err);
        setUsers([]);
      });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
    };
    setUsers([newUser, ...users]);
    setSelectedUser(newUser);
    setFormData({ noms: "", email: "", type_user: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 space-y-6">
      {/* Formulaire */}
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
              name="noms"
              placeholder="Nom complet"
              value={formData.noms}
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
              name="type_user"
              placeholder="Type utilisateur"
              value={formData.type_user}
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

      <div className="flex w-full gap-6">
        {/* Liste des utilisateurs */}
        <div className="w-1/3 bg-white rounded-2xl shadow-lg p-4 max-h-[calc(100vh-3rem)] overflow-y-auto border border-gray-200 custom-scroll">
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-700">Liste Users</h2>
          </div>

          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 ${
                  selectedUser?._id === user._id
                    ? "bg-blue-100 text-blue-800 shadow-inner"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <p className="font-medium">{user.noms}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Détail utilisateur */}
        <div className="w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
          {selectedUser ? (
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                {selectedUser.noms}
              </h2>
              <p className="text-gray-700 text-lg mb-2">
                <strong>Email :</strong> {selectedUser.email}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Type :</strong> {selectedUser.type_user}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun utilisateur sélectionné.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
