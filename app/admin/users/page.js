"use client";

import { ScrollText, MessageCircle } from "lucide-react";
import Image from "next/image";

const BlogDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 space-y-6">
      {/* Liste des blogs */}
      <div className="flex w-full gap-6">
        <div className="w-1/3 bg-white rounded-2xl shadow-lg p-4 max-h-[calc(100vh-3rem)] overflow-y-auto border border-gray-200 custom-scroll">
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-700">Blog List</h2>
          </div>

          <ul>
            <li className="p-3 rounded-xl mb-2 cursor-pointer bg-blue-100 text-blue-800 shadow-inner">
              <p className="font-medium">How to Improve Your Workflow</p>
            </li>
            <li className="p-3 rounded-xl mb-2 cursor-pointer hover:bg-gray-100 text-gray-700">
              <p className="font-medium">Mastering React Components</p>
            </li>
          </ul>
        </div>

        {/* Détails de l'article (statique) */}
        <div className="w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              How to Improve Your Workflow
            </h2>
            <Image
              src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80"
              alt="How to Improve Your Workflow"
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />
            <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
              Improving your workflow is about optimizing your tools and habits.
              In this article, we explore key strategies for better efficiency...
            </p>
          </div>

          {/* Commentaires statiques */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="text-green-500" />
              <h3 className="text-xl font-semibold text-gray-700">Commentaires</h3>
            </div>

            <ul className="space-y-3">
              <li className="bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm">
                <p className="text-gray-800 font-medium">Alice</p>
                <p className="text-gray-600 text-sm">
                  Great tips, I applied them and saw instant results!
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section statique : liste des utilisateurs */}
      <div className="w-full mt-10 bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Liste des utilisateurs</h1>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nom</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Rôle</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900">Jean Dupont</td>
              <td className="px-6 py-4">jean.dupont@email.com</td>
              <td className="px-6 py-4">Admin</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900">Alice Martin</td>
              <td className="px-6 py-4">alice.martin@email.com</td>
              <td className="px-6 py-4">Éditeur</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogDashboard;
