"use client";

import { useState } from "react";
import { ScrollText, MessageCircle, PlusCircle } from "lucide-react";
import Image from "next/image";

const initialBlogs = [
  {
    id: 1,
    title: "How to Improve Your Workflow",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80",
    content:
      "Improving your workflow is about optimizing your tools and habits. In this article, we explore key strategies for better efficiency...",
    comments: [
      {
        id: 1,
        author: "Alice",
        text: "Great tips, I applied them and saw instant results!",
      },
    ],
  },
  {
    id: 2,
    title: "Mastering React Components",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80",
    content:
      "React components are the building blocks of your UI. Learn how to structure and manage components like a pro.",
    comments: [],
  },
];

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState(initialBlogs[0]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: blogs.length + 1,
      title: formData.title,
      image: formData.image,
      content: formData.content,
      comments: [],
    };
    setBlogs([newBlog, ...blogs]);
    setSelectedBlog(newBlog);
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
            {blogs.map((blog) => (
              <li
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className={`p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 ${
                  selectedBlog?.id === blog.id
                    ? "bg-blue-100 text-blue-800 shadow-inner"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <p className="font-medium">{blog.title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Détails de l'article */}
        <div className="w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
          {/* Commentaires */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="text-green-500" />
              <h3 className="text-xl font-semibold text-gray-700">Commentaires</h3>
            </div>
            {selectedBlog?.comments.length > 0 ? (
              <ul className="space-y-3">
                {selectedBlog.comments.map((comment) => (
                  <li
                    key={comment.id}
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

          {/* Titre + image + contenu */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              {selectedBlog?.title}
            </h2>
            <Image
              src={selectedBlog?.image}
              alt={selectedBlog?.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />
            <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
              {selectedBlog?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
