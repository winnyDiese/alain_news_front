'use client'

import { useState, useEffect } from "react";
import Link from "next/link"
import { LayoutDashboard, FileText, Users, Store, LogOut, Menu } from "lucide-react"
import useAuth from "../hooks/useAuth";

export default function AdminLayout({ children }) {
  useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token") // ou sessionStorage selon ton usage
    window.location.href = "/login" // ou router.push("/") si tu utilises Next.js router
  }

  // Bloquer scroll du body quand menu mobile est ouvert
  useEffect(() => {
    if(mobileMenuOpen){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen])

  return (
    <body className="bg-gray-100 min-h-screen">
      <div className="flex">

        {/* Bouton menu hamburger (mobile only) */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-md shadow-lg"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar / menu */}
        <aside
          className={`
            fixed top-0 left-0 h-full bg-gray-900 text-white p-6 min-h-screen z-40 w-64
            transform transition-transform duration-300 ease-in-out

            md:relative md:translate-x-0
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Bouton fermer menu (mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden mb-6 text-white text-2xl font-bold"
            aria-label="Fermer le menu"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>

          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)} // ferme menu au clic
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blog"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="w-5 h-5" />
                <span>Posts</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex items-center space-x-3 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Store className="w-5 h-5" />
                <span>Site web</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 border border-orange-400 text-white hover:bg-orange-500 px-3 py-2 rounded-md transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </aside>

        {/* Overlay flou + sombre qui ferme le menu quand on clique dessus */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden"
            aria-hidden="true"
          />
        )}

        {/* Contenu principal */}
        <main className="flex-1 p-6 md:ml-64">
          {children}
        </main>
      </div>
    </body>
  )
}
