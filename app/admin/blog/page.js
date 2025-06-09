"use client"

import { useState } from "react";

const mockBlogs = [
  {
    id: 1,
    title: "How to Improve Your Workflow",
    image: "https://source.unsplash.com/random/800x400?workflow",
    content:
      "Improving your workflow is about optimizing your tools and habits. In this article, we explore key strategies for better efficiency...",
  },
  {
    id: 2,
    title: "Mastering React Components",
    image: "https://source.unsplash.com/random/800x400?react",
    content:
      "React components are the building blocks of your UI. Learn how to structure and manage components like a pro.",
  },
  {
    id: 3,
    title: "The Future of Web Design",
    image: "https://source.unsplash.com/random/800x400?webdesign",
    content:
      "Web design is rapidly evolving. From minimalism to AI-powered UX, discover what's next in the design world.",
  },
];

const BlogDashboard = () => {
  const [selectedBlog, setSelectedBlog] = useState(mockBlogs[0]);

  return (
    <div className="min-h-screen flex bg-gray-100 p-4 gap-4">
      {/* Left Panel: Blog List */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow p-4 overflow-y-auto max-h-[calc(100vh-2rem)]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Blog List</h2>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left pb-2 border-b">Title</th>
            </tr>
          </thead>
          <tbody>
            {mockBlogs.map((blog) => (
              <tr
                key={blog.id}
                className={`cursor-pointer border-b hover:bg-gray-50 ${
                  selectedBlog.id === blog.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedBlog(blog)}
              >
                <td className="py-2">{blog.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Panel: Blog Detail */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {selectedBlog.title}
        </h2>
        <img
          src={selectedBlog.image}
          alt={selectedBlog.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <p className="text-gray-700 text-lg">{selectedBlog.content}</p>
      </div>
    </div>
  );
};

export default BlogDashboard;
