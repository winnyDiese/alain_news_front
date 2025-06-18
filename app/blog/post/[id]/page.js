"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api/posts"
    const defaultImageUrl = "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80";


    const fetchPost = async () => {
        try {
            const res = await fetch(`${API_URL}/${id}`)
            const text = await res.text()
            const data = JSON.parse(text)
            setPost(data)
        } catch (error) {
            console.error('Erreur lors du chargement du post :', error)
        }
    }

    const refreshPost = async () => {
        const updated = await fetch(`${API_URL}/${id}`).then(res => res.json())
        setPost(updated)
    }

    const handleLike = async () => {
        await fetch(`${API_URL}/${id}/like`, {
        method: 'POST'
        })
        refreshPost();
    }

    useEffect(() => {
        if (id) fetchPost()
    }, [id])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${API_URL}/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, content: comment }),
            })

            if (!res.ok) {
                const errorText = await res.text()
                console.error('Erreur ajout commentaire :', errorText)
                return
            }

            // Recharge les données à partir du backend (meilleure solution)
            await refreshPost()

            // Vider les champs APRÈS envoi
            setAuthor('')
            setComment('')

        } catch (error) {
            console.error('Erreur soumission commentaire :', error)
        }
    }



    if (!post) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="pt-20 max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
            {/* Colonne 1 : Post + Formulaire */}
            <div>
                <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>
                <img
                    src={post?.imageUrl || defaultImageUrl}
                    alt={post?.title}
                    className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="mb-6">{post?.content}</p>

                  <div className="flex items-center gap-2 mb-6 mt-3">
                        <button onClick={handleLike} className="text-red-500 text- hover:scale-110 transition">
                        ❤️
                        </button>
                        <span>{post?.likes} like{post?.likes !== 1 && 's'}</span>
                    </div>

                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3 border-t pt-4">
                    <h2 className="text-xl font-semibold">Add a Comment</h2>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="border p-2 rounded"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your comment"
                        className="border p-2 rounded"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                        Add Comment
                    </button>
                </form>
            </div>

            {/* Colonne 2 : Commentaires */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                {post?.comments.length === 0 ? (
                    <p className="text-gray-500 text-gray-400">No comments yet.</p>
                ) : (
                    post?.comments.map((c, i) => (
                        <div key={i} className="mb-4 text-sm text-gray-600">
                            <p className="font-semibold">{c?.author}</p>
                            <p>{c?.content}</p>
                            <hr className="mt-2"/>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}
