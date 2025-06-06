"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api/posts"

  const refreshPost = async () => {
    const updated = await fetch(`${API_URL}/${id}`).then(res => res.json())
    setPosts()
  }

  const handleLike = async () => {
    await fetch(`${API_URL}/${id}/like`, {
      method: 'POST'
    })
    refreshPost();
  }

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
  })


  return (
    <main className="pt-20 max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* Colonne gauche - Nouveaux articles sexy avec image en bas */}
      <aside className="hidden md:block md:col-span-1 space-y-5">
        <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          🆕 <span>Nouveaux articles</span>
        </h2>
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <Link
              key={post?._id}
              href={`/post/${post?._id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="p-4 text-sm text-gray-800 space-y-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-700 line-clamp-2">
                  {post?.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {post?.content}
                </p>
              </div>
              <div className="relative h-24">
                <Image
                  src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80"
                  alt="Post cover"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </aside>



      {/* Left Column - Featured News */}
      <section className="md:col-span-2 md:ordre-2 order-2">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📰 Actualités</h2>

        {/* Article principal */}
        {posts[0] && (
          <Link
            href={`/post/${posts[0]?._id}`}
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition mb-6"
          >
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80"
                alt="Post cover"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-800">{posts[0]?.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-4">{posts[0]?.content}</p>
              
              <div className="flex items-center gap-2 mb-6 mt-3">
                <button onClick={handleLike} className="text-red-500 text- hover:scale-110 transition">
                  ❤️
                </button>
                <span>{posts?.likes} like{posts?.likes !== 1 && 's'}</span>
              </div>

            </div>
          </Link>
        )}

        {/* Deux articles côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {posts.slice(1, 3).map((post) => (
            <Link
              key={post?._id}
              href={`/post/${post?._id}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80"
                  alt="Post cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{post?.title}</h3>
                <p className="text-gray-600 line-clamp-3 mt-2">{post?.content}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Liste normale des autres posts */}
        <div className="space-y-4">
          {posts.slice(3).map(post => (
            <Link
              key={post?._id}
              href={`/post/${post?._id}`}
              className="block bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80"
                  alt="Post cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{post?.title}</h3>
                <p className="text-gray-600 line-clamp-2 mt-1">{post?.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Right Column - Le Flash */}
      <aside className="order-1 md:order-3">
        <div className="bg-white rounded-lg shadow p-4 ">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Le Flash</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {posts.slice(0, 6).map((post, i) => (
              <li key={i} className="border-l-4 border-blue-600 pl-2 hover:underline">
                <Link href={`/post/${post._id}`}>
                  {post?.title.length > 70 ? post?.title.slice(0, 70) + "..." : post?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
