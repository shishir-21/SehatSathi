"use client";

import { useState } from "react";
import { login } from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    try {
      setLoading(true);
      const data = await login({ email, password });
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        // Force full page reload or layout re-trigger to reflect auth state across app securely.
        window.location.href = "/";
      } else {
        alert("Login Failed: Invalid credentials");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Left side Graphic */}
      <div className="hidden lg:flex w-1/2 relative bg-blue-900 justify-center items-center overflow-hidden flex-col text-white p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 text-center">
           <div className="text-6xl mb-6">🧠</div>
           <h1 className="text-5xl font-extrabold mb-4 leading-tight">Welcome back to MediBrain</h1>
           <p className="text-xl text-blue-100 font-medium max-w-md mx-auto">Access your AI-powered health assistant and connect with top-tier specialists instantly.</p>
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-500 font-medium">Please enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition shadow-sm"
                placeholder="patient@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition shadow-sm"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-md disabled:bg-blue-400"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-bold transition">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
