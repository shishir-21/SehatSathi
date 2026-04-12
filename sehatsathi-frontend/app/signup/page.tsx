"use client";

import { useState } from "react";
import { signup } from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return alert("Fill all fields");
    
    try {
      setLoading(true);
      await signup(form);
      alert("Signup successful! You can now log in.");
      router.push("/login"); // Smooth redirect
    } catch (err) {
      alert("Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50">
      
      {/* Left side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join MediBrain</h2>
            <p className="text-gray-500 font-medium">Your personal, AI-driven healthcare ecosystem.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition shadow-sm"
                placeholder="John Doe"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition shadow-sm"
                placeholder="patient@example.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition shadow-sm"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-md disabled:bg-blue-400"
            >
              {loading ? "Creating Profile..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-bold transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right side Graphic */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-900 justify-center items-center overflow-hidden flex-col text-white p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10 text-center">
           <div className="text-6xl mb-6">🩺</div>
           <h1 className="text-5xl font-extrabold mb-4 leading-tight">Empowering your Health</h1>
           <p className="text-xl text-indigo-100 font-medium max-w-md mx-auto">Create an account securely to book specialized doctors, track prescriptions, and analyze symptoms with AI.</p>
        </div>
      </div>

    </div>
  );
}
