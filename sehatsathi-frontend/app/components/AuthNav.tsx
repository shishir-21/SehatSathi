"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthNav() {
  const [isLogged, setIsLogged] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLogged(!!localStorage.getItem("access_token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login"; // Force reset and route
  };

  if (!mounted) return <div className="w-24"></div>;

  if (isLogged) {
    return (
      <button onClick={handleLogout} className="text-sm font-bold border-2 px-5 py-2 hover:bg-red-50 text-red-600 border-red-200 rounded-full transition">
        Logout
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 border-l pl-6 pt-2 pb-2 md:pt-0 md:pb-0 border-gray-200 mt-4 md:mt-0">
      <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition">Log In</Link>
      <Link href="/signup" className="text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-sm transition">Sign Up</Link>
    </div>
  );
}
