"use client";

import { useEffect, useState } from "react";
import { ScrollText, PlusCircle } from "lucide-react";
import Image from "next/image";
import CommentPage from "@/components/new_comment_admin"; // ✅ Corrigé ici

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/posts`);
            const data = await res.json();
            const cleaned = Array.isArray(data) ? data.filter(p => p && typeof p.title === "string") : [];
            setPosts(cleaned);
        } catch (err) {
            console.error("Erreur de récupération :", err);
            setPosts([]);
        }
        };

        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Une erreur est survenue.');
        }

        setSuccess('Article publié avec succès.');
        setFormData({ title: '', content: '' });

        const refreshed = await fetch(`${API_URL}/posts`);
        const data = await refreshed.json();
        const cleaned = Array.isArray(data) ? data.filter(p => p && typeof p.title === "string") : [];
        setPosts(cleaned);

        } catch (error) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    
    const refreshPost = async () => {
        const updated = await fetch(`${API_URL}/posts/${id}`).then(res => res.json())
        setPosts()
    }

    const handleLike = async (postId) => {
        try {
            await fetch(`${API_URL}/posts/${postId}/like`, {
            method: 'POST',
            });
            refreshPost(); // ou tu peux passer `postId` à refreshPost si nécessaire
        } catch (error) {
            console.error("Erreur lors du like :", error);
        }
    };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 space-y-6">
      {/* Création */}
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
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
            {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}
            {success && <p className="text-green-600 bg-green-100 p-2 rounded">{success}</p>}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                type="text"
                name="title"
                placeholder="Titre de l'article"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
              <textarea
                name="content"
                placeholder="Contenu de l'article"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Publication en cours...' : 'Publier'}
            </button>
          </form>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Liste des blogs */}
        <div className={`md:w-1/3 w-full bg-white rounded-2xl shadow-lg p-4 max-h-[calc(100vh-3rem)] overflow-y-auto border border-gray-200 custom-scroll ${selectedBlog && 'hidden md:block'}`}>
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-700">Liste des articles</h2>
          </div>

          <ul>
            {posts.map((post) => (
              <li
                key={post._id}
                onClick={() => setSelectedBlog(post)}
                className={`p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 ${
                  selectedBlog?._id === post._id
                    ? "bg-blue-100 text-blue-800 shadow-inner"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <p className="font-medium">{post.title}</p>

               

              </li>
              
            ))}
          </ul>
        </div>

        {/* Contenu sélectionné + commentaire */}
        {selectedBlog && (
          <div className="md:w-2/3 w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
            <button
              onClick={() => setSelectedBlog(null)}
              className="md:hidden mb-4 text-sm text-blue-500 underline"
            >
              ← Retour à la liste
            </button>

            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              {selectedBlog.title}
            </h2>

            <Image
              src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80"
              alt={selectedBlog.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />

            <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
              {selectedBlog.content}

               {/* Like boutton */}
                <div className="flex items-center gap-2 mb-6 mt-3">
                    <button
                        onClick={() => handleLike(post._id)}
                        className="text-red-500 text-xs hover:scale-110 transition"
                    >
                        ❤️
                    </button>
                    <span>{post?.likes} like{post?.likes !== 1 && 's'}</span>
                </div>

            </p>

            {selectedBlog && (
                <CommentPage selectedBlog={selectedBlog} />
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDashboard;
