"use client";

import { useState } from "react";

const LikeButton = ({ postId, likesCount, onLikeSuccess }) => {
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api"}/posts/${postId}/like`,
        {
          method: "POST",
        }
      );
      if (res.ok && typeof onLikeSuccess === "function") {
        onLikeSuccess(); // refresh le post
      }
    } catch (error) {
      console.error("Erreur lors du like :", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6 mt-3">
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="text-red-500 text-xs hover:scale-110 transition disabled:opacity-50"
      >
        ❤️
      </button>
      <span>{likesCount} like{likesCount !== 1 && 's'}</span>
    </div>
  );
};

export default LikeButton;
