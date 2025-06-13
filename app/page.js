"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoadingRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("./blog");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl mb-4 animate-bounce">⏳</div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Chargement...</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Redirection en cours vers la page blog.
        </p>
      </div>
    </div>
  );
};

export default LoadingRedirectPage;
