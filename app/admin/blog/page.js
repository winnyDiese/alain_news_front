"use client";

import { useEffect, useState } from "react";
import { ScrollText, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import CommentPage from "@/components/admin/new_comment_admin";
import LikeButton from "@/components/admin/Like_Button_admin";
import Link from "next/link";

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";
  const defaultImageUrl = "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80";

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

  const refreshPost = async (id) => {
    try {
      const updated = await fetch(`${API_URL}/posts/${id}`).then(res => res.json());

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === id ? updated : post
        )
      );

      setSelectedBlog(prev => (prev && prev._id === id ? updated : prev));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post :", error);
    }
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = confirm("Voulez-vous vraiment supprimer ce post ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression du post.");
      }

      setPosts((prev) => prev.filter((p) => p._id !== id));
      setSelectedBlog(null);
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    const confirmDelete = confirm("Supprimer ce commentaire ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression du commentaire.");
      }

      await refreshPost(postId);
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 space-y-6">
      {/* HEADER + NOUVEAU BOUTON */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Articles de blog</h2>
          <Link
            href="/admin/image"
            onClick={() => alert("Redirection vers le formulaire de création...")}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
          >
            <PlusCircle size={18} />
            Nouveau post
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* LISTE */}
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

        {/* DETAILS */}
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
              src={selectedBlog?.imageUrl }
              alt={selectedBlog?.title || "Image de blog"}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />

            <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
              {selectedBlog.content}
            </p>

            <div className="flex items-center justify-between mt-4 mb-6">
              <LikeButton
                postId={selectedBlog._id}
                likesCount={selectedBlog.likes}
                onLikeSuccess={() => refreshPost(selectedBlog._id)}
              />

              <button
                onClick={() => handleDeletePost(selectedBlog._id)}
                className="text-sm bg-red-600 text-white hover:bg-red-500 flex items-center gap-1 py-1 px-2 rounded"
              >
                <Trash2 size={16} />
                Supprimer
              </button>
            </div>

            <CommentPage selectedBlog={selectedBlog} />

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Commentaires</h2>

              {Array.isArray(selectedBlog?.comments) && selectedBlog.comments.length > 0 ? (
                <div className="space-y-4">
                  {selectedBlog.comments.map((comment, index) => (
                    <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm relative">
                      <p className="text-sm font-semibold text-blue-700">{comment?.author || 'Auteur inconnu'}</p>
                      <p className="text-gray-700 mt-1 mb-4">{comment?.content}</p>
                      <button
                        className="text-red-500 text-xs absolute bottom-2 left-4 hover:underline mt-4"
                        onClick={() => handleDeleteComment(selectedBlog._id, comment._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Aucun commentaire pour le moment.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDashboard;
