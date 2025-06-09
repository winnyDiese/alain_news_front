"use client";

import { useEffect, useState } from "react";
import { ScrollText, MessageCircle, PlusCircle } from "lucide-react";
import Image from "next/image";

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://alain-news-back.onrender.com/api/posts";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const cleanedData = Array.isArray(data)
          ? data.filter((p) => p && typeof p.title === "string")
          : [];
        setPosts(cleanedData);
        if (cleanedData.length > 0) {
          setSelectedBlog(cleanedData[0]);
        }
      })
      .catch((err) => {
        console.error("Erreur de récupération :", err);
        setPosts([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      _id: Date.now().toString(), // fake ID
      title: formData.title,
      image: formData.image,
      content: formData.content,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setSelectedBlog(newPost);
    setFormData({ title: "", image: "", content: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 space-y-6">
      {/* Formulaire de création */}
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

      <div className="flex w-full gap-6">
        {/* Liste des blogs */}
        <div className="w-1/3 bg-white rounded-2xl shadow-lg p-4 max-h-[calc(100vh-3rem)] overflow-y-auto border border-gray-200 custom-scroll">
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-700">Blog List</h2>
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

        {/* Détails de l'article */}
        <div className="w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
          {selectedBlog && (
            <>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                  {selectedBlog.title}
                </h2>
                <Image
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
                />
                <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
                  {selectedBlog.content}
                </p>
              </div>

              {/* Commentaires */}
              <div>
                <div className="flex items-center gap-2 mb-2 mt-6">
                  <MessageCircle className="text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-700">Commentaires</h3>
                </div>

                <form className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                      Commentaire
                    </label>
                    <textarea
                      name="text"
                      id="text"
                      rows={3}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Poster le commentaire
                  </button>
                </form>

                {selectedBlog.comments?.length > 0 ? (
                  <ul className="space-y-3">
                    {selectedBlog.comments.map((comment) => (
                      <li
                        key={comment._id || comment.id}
                        className="bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
                      >
                        <p className="text-gray-800 font-medium">{comment.author}</p>
                        <p className="text-gray-600 text-sm">{comment.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">
                    Aucun commentaire pour cet article.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
