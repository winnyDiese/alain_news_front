"use client";

import React from 'react';

const NewCommentAdmin = ({
    selectedBlog,
    author,
    setAuthor,
    comment,
    setComment,
    handleCommentSubmit
}) => {
    return (
        <form onSubmit={handleCommentSubmit} className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Ajouter un commentaire</h3>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Nom</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Commentaire</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={4}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
                Publier le commentaire
            </button>
        </form>
    );
};

export default NewCommentAdmin;
