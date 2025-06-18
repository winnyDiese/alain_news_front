import Link from "next/link";

export const metadata = {
    title:"Admin"
}

export default function BlogLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">

        {/* Header / Navigation */}
        <header className="bg-white shadow fixed top-0 left-0 right-0 z-50 ">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-900">
                <Link href="/blog/">ALINO Nzungu</Link>
                </h1>              
                
                <nav className="space-x-4">
                  <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                     Connection
                  </Link>
                </nav>
            </div>
            </header>

            {children}

    </div>
  );
}
