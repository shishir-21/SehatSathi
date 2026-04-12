"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLinks() {
  const [isLogged, setIsLogged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setIsLogged(!!localStorage.getItem("access_token"));
  }, [pathname]); // Re-check on route change

  if (!mounted || !isLogged) return null;

  return (
    <div className="hidden md:flex gap-8 font-semibold text-gray-600 items-center">
      <Link href="/" className="hover:text-blue-600 transition">Find Doctors</Link>
      <Link href="/hospitals" className="hover:text-blue-600 transition">Find Hospitals</Link>
      <Link href="/ai-assistant" className="text-blue-700 bg-blue-50 px-4 py-1 rounded-full hover:bg-blue-100 transition flex items-center gap-2">
         🤖 AI Assistant
      </Link>
    </div>
  );
}
