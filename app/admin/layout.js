'use client'

import Link from "next/link"
import { LayoutDashboard, FileText, Users, Store, LogOut } from "lucide-react"

export default function AdminLayout({ children }) {

  const handleLogout = () => {
    localStorage.removeItem("token") // ou sessionStorage selon ton usage
    window.location.href = "/blog" // ou router.push("/") si tu utilises Next.js router
  }

  return (
    <body className="bg-gray-100 min-h-screen">
      <div className="flex">
        <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
          <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blog"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Posts</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
              >
                <Store className="w-5 h-5" />
                <span>Site web</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </body>
  )
}
