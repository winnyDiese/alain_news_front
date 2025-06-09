"use client";

import { useState } from "react";
import { ScrollText, MessageCircle } from "lucide-react";
import Image from "next/image";

const mockBlogs = [
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
      {
        id: 2,
        author: "Bob",
        text: "Loved the article, thanks for sharing!",
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
    comments: [
      {
        id: 1,
        author: "Charlie",
        text: "This really helped me refactor my codebase!",
      },
    ],
  },
  {
    id: 3,
    title: "The Future of Web Design",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80",
    content:
      "Web design is rapidly evolving. From minimalism to AI-powered UX, discover what's next in the design world.",
    comments: [],
  },
];

const BlogDashboard = () => {
  const [selectedBlog, setSelectedBlog] = useState(mockBlogs[0]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 gap-6">
      {/* Left Panel: Blog List */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 overflow-y-auto max-h-[calc(100vh-3rem)] border border-gray-200 custom-scroll">
        <div className="flex items-center gap-2 mb-4">
          <ScrollText className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-700">Blog List</h2>
        </div>

        <ul>
          {mockBlogs.map((blog) => (
            <li
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className={`p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 ${
                selectedBlog.id === blog.id
                  ? "bg-blue-100 text-blue-800 shadow-inner"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <p className="font-medium">{blog.title}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Blog Detail */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeIn space-y-6">

        {/* Blog Title + Content */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            {selectedBlog.title}
          </h2>
          <Image
            src={selectedBlog.image}
            alt={selectedBlog.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
          />
          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            {selectedBlog.content}
          </p>
        </div>

         {/* Comments Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="text-green-500" />
            <h3 className="text-xl font-semibold text-gray-700">
              Commentaires
            </h3>
          </div>
          {selectedBlog.comments.length > 0 ? (
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
            <p className="text-gray-500 italic">Aucun commentaire pour cet article.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default BlogDashboard;
