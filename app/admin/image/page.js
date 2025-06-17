"use client";


// import { CldImage } from 'next-cloudinary';

// // By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
// export default function Page() {
//   return (
//     <CldImage
//       src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
//       width="500" // Transform the image: auto-crop to square aspect_ratio
//       height="500"
//       crop={{
//         type: 'auto',
//         source: true
//       }}
//     />
//   );
// }


import { useState } from "react";
import { CldImage } from "next-cloudinary";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Veuillez sélectionner une image.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await fetch("https://alain-news-api.onrender.com/api/file/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("✅ Réponse du serveur :", data);

      // Si l'API renvoie un public_id Cloudinary
      if (data?.public_id) {
        setCloudinaryPublicId(data.public_id);
      }

      setTitle("");
      setContent("");
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("❌ Erreur lors de l'upload :", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Créer un nouveau post 📝</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <textarea
            placeholder="Contenu du post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600"
          />

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Aperçu :</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-60 rounded-lg border shadow-md mx-auto"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Publier
          </button>
        </form>

        {cloudinaryPublicId && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">Image hébergée sur Cloudinary :</p>
            <CldImage
              src={cloudinaryPublicId}
              width="400"
              height="400"
              alt="Image postée"
              crop={{ type: "auto", source: true }}
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPostForm;

