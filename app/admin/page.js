import { BarChart3, Users, DollarSign, FileText } from 'lucide-react';

const Dash = () => {
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
              <h2 className="text-2xl font-semibold">1,245</h2>
            </div>
            <Users className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h2 className="text-2xl font-semibold">$23,500</h2>
            </div>
            <DollarSign className="text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Invoices</p>
              <h2 className="text-2xl font-semibold">326</h2>
            </div>
            <FileText className="text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Visitors</p>
              <h2 className="text-2xl font-semibold">9,876</h2>
            </div>
            <BarChart3 className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Table / Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Action</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">John Doe</td>
              <td className="py-2">Created invoice</td>
              <td className="py-2">2025-06-09</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Jane Smith</td>
              <td className="py-2">Sent payment</td>
              <td className="py-2">2025-06-08</td>
            </tr>
            {/* ... */}
          </tbody>
        </table>
      </div>

       {/* Table / Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Action</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">John Doe</td>
              <td className="py-2">Created invoice</td>
              <td className="py-2">2025-06-09</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">Jane Smith</td>
              <td className="py-2">Sent payment</td>
              <td className="py-2">2025-06-08</td>
            </tr>
            {/* ... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dash;
