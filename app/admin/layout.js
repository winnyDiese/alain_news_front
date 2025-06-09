               
export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <ul className="space-y-2">
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/posts">Posts</a></li>
          <li><a href="/admin/users">Users</a></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
