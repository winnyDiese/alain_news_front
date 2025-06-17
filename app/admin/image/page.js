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

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
        const res = await fetch("https://alain-news-api.onrender.com/api/file", {
        method: "POST",
        body: formData,
        });

        const data = await res.json();
        console.log("✅ Réponse du serveur :", data);
    } catch (error) {
        console.error("❌ Erreur lors de l'upload :", error);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="content" onChange={(e) => setContent(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Publier</button>
    </form>
  );
};

export default NewPostForm;
