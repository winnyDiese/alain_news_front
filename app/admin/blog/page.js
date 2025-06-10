"use client";

import { useEffect, useState } from "react";
import { ScrollText, MessageCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";



const BlogDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [posts, setPosts] = useState([]);

    const [formData, setFormData] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();

    
    // commentaires
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');


    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api/posts"

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    useEffect(() => {
        fetch(`${API_URL}`)
        .then(res => res.json())
        .then(data => {
          console.log("Posts récupérés :", data)
          // On filtre les posts valides avec un titre
          const cleanedData = Array.isArray(data)
            ? data.filter(p => p && typeof p.title === "string")
            : []
          setPosts(cleanedData)
        })
        .catch(err => {
          console.error("Erreur de récupération :", err)
          setPosts([]) // En cas d'erreur, on vide les posts pour éviter les plantages
        })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: formData.title, content: formData.content }),
            });

            if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Une erreur est survenue.');
            }

            setSuccess('Article publié avec succès.');
            setFormData({ title: '', content: '' });
            
            //  router.refresh(); // décommenter si tu veux rediriger
            //  window.location.reload();

             window.location.href = window.location.href;

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


   const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBlog?._id) {
            console.error("Aucun article sélectionné pour commenter.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/${selectedBlog._id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, content: comment }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Erreur ajout commentaire :', errorText);
                return;
            }

            // IMPORTANT: vider les champs immédiatement
            setAuthor('');
            setComment('');

            // Attendre que React applique les changements, puis recharger
            setTimeout(() => {
                console.log("Rechargement forcé...");
                window.location.reload(); // Mieux que href ici
            }, 200); // 200ms pour laisser le temps à React

        } catch (error) {
            console.error('Erreur soumission commentaire :', error);
        }
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
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-800">Publier un nouvel article</h2>

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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Publication en cours...' : 'Publier'}
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

            {selectedBlog ? (
                // S'il y a un article sélectionné
                <div className="w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
                    {/* Titre + image + contenu */}
                    <div>
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
                    </p>
                    </div>

                    {/* Commentaires */}
                    <div>
                    <div className="flex items-center gap-2 mb-2 mt-6">
                        <MessageCircle className="text-green-500" />
                        <h3 className="text-xl font-semibold text-gray-700">Commentaires</h3>
                    </div>

                    <form onSubmit={handleCommentSubmit} className="space-y-4 mb-3">
                        <input
                        type="text"
                        name="author"
                        placeholder="Votre nom"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <textarea
                        name="comment"
                        placeholder="Votre commentaire"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                        Publier le commentaire
                        </button>
                    </form>

                    {selectedBlog?.comments ? (
                        selectedBlog.comments.length > 0 ? (
                            <ul className="space-y-3">
                            {selectedBlog.comments.map((comment) => (
                                <li key={comment._id} className="bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm">
                                <p className="text-gray-800 font-medium">{comment.author}</p>
                                <p className="text-gray-600 text-sm">{comment.content}</p>
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic p-3">Aucun commentaire pour cet article.</p>
                        )
                        ) : (
                        <p className="text-gray-400">Chargement des commentaires...</p>
                    )}


                    </div>
                </div>
                ) : (
                // S'il n'y a pas d'article sélectionné
                <div className="w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
                    <p className="text-gray-500 italic text-lg">
                    Aucun article sélectionné.
                    </p>
                </div>
                )}



            </div>
        </div>
    );
};

export default BlogDashboard;
