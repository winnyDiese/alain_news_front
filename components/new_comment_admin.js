"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

const New_comment_admin = ({ selectedBlog, author, setAuthor, comment, setComment, handleCommentSubmit }) => {
    return (
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default New_comment_admin;
