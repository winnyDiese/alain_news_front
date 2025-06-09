import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex mt-20">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <ul className="space-y-2">
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/posts">Posts</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
