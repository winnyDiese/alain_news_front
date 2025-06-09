import Link from "next/link";

export const metadata = {
    title:"Admin"
}

export default function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 min-h-screen">
        <div className="flex">
          <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
            <h2 className="text-xl font-bold mb-8">Admin</h2>
            <ul className="space-y-2">
              <li><Link href="/admin">Dashboard</Link></li>
              <li><Link href="/admin/posts">Posts</Link></li>
              <li><Link href="/admin/users">Users</Link></li>
            </ul>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
