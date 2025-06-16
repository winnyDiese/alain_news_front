"use client";

import React, { useState } from 'react';
import New_comment_admin from "@/components/new_comment_admin";

const CommentPage = ({ selectedBlog }) => {
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://alain-news-back.onrender.com/api";

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBlog?._id) {
            console.error("Aucun article sélectionné pour commenter.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/posts/${selectedBlog._id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, content: comment }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Erreur ajout commentaire :', errorText);
                return;
            }

            setAuthor('');
            setComment('');

            setTimeout(() => {
                console.log("Rechargement forcé...");
                window.location.reload();
            }, 200);

        } catch (error) {
            console.error('Erreur soumission commentaire :', error);
        }
    };

    return (
        <New_comment_admin
            selectedBlog={selectedBlog}
            author={author}
            setAuthor={setAuthor}
            comment={comment}
            setComment={setComment}
            handleCommentSubmit={handleCommentSubmit}
        />
    );
};

export default CommentPage;
