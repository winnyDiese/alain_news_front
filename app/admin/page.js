import { useEffect, useState } from 'react';
import { BarChart3, Users, DollarSign, FileText } from 'lucide-react';

const Dash = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://alain-news-back.onrender.com/api/dashboard') // Mets ton URL backend ici
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Users</p>
              <h2 className="text-2xl font-semibold">{data.nbreUsers}</h2>
            </div>
            <Users className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Posts</p>
              <h2 className="text-2xl font-semibold">{data.nbrePosts}</h2>
            </div>
            <BarChart3 className="text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Comments</p>
              <h2 className="text-2xl font-semibold">{data.nbreComments}</h2>
            </div>
            <FileText className="text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Last Posts */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">ID</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.lastPosts.map((post) => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="py-2">{post.title}</td>
                <td className="py-2">{post._id.slice(0, 8)}...</td>
                <td className="py-2">{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Last Users */}
      <div className="bg-white p-6 rounded-2xl shadow mt-4">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Username</th>
              <th className="py-2">Email</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.lastUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2">{user.username}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dash;
