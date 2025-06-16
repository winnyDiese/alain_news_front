"use client";

import React, { useState } from 'react';
import { MessageCircle } from "lucide-react"; // ✅ Ajout de l'icône

const CommentPage = ({ selectedBlog }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBlog?._id) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_URL}/posts/${selectedBlog._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content: comment }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Erreur lors de l’ajout du commentaire.');
      }

        // Recharger après 2 secondes, pour laisser le temps de tout réinitialiser
        setTimeout(() => {
            window.location.reload();
        }, 2000);

        setAuthor('');
        setComment('');
        setSuccess('Commentaire ajouté avec succès.');

    } catch (error) {
      console.error('Erreur soumission commentaire :', error);
      setError(error.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 mt-6">
        <MessageCircle className="text-green-500" />
        <h3 className="text-xl font-semibold text-gray-700">Commentaires</h3>
      </div>

      <form onSubmit={handleCommentSubmit} className="space-y-4 mb-6">
        {error && <p className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded">{error}</p>}
        {success && <p className="text-green-600 text-sm bg-green-100 px-4 py-2 rounded">{success}</p>}

        <input
          type="text"
          name="author"
          placeholder="Votre nom"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="comment"
          placeholder="Votre commentaire"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default CommentPage;
