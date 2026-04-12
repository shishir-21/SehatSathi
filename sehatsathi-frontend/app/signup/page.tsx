"use client";

import { useState } from "react";
import { signup, generateOtp } from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone) return alert("Fill all fields");
    
    try {
      setLoading(true);
      await generateOtp(form.phone);
      setStep(2); // Move to OTP visual step
    } catch (err: any) {
      alert("Failed to send OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.otp) return alert("Please enter the OTP verification code");

    try {
      setLoading(true);
      await signup(form);
      alert("Verification successful! You can now log in.");
      router.push("/login"); // Smooth redirect
    } catch (err: any) {
      alert("Verification Failed: " + err.message);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{step === 1 ? 'Join MediBrain' : 'Secure Verification'}</h2>
            <p className="text-gray-500 font-medium">
               {step === 1 ? 'Your personal, AI-driven healthcare ecosystem.' : 'We sent a 6-digit code to your phone. (Mock: 123456)'}
            </p>
          </div>

          {step === 1 ? (
             <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    placeholder="John Doe"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    placeholder="+91 9876543210"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    placeholder="patient@example.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    placeholder="••••••••"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-md disabled:bg-blue-400 mt-2"
                >
                  {loading ? "Sending Code..." : "Send Verification Code"}
                </button>
             </form>
          ) : (
             <form onSubmit={handleVerifySubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-center text-gray-700 mb-4">Enter 6-Digit OTP</label>
                  <div className="flex justify-center">
                     <input
                       type="text"
                       required
                       maxLength={6}
                       className="w-48 text-center text-3xl font-bold tracking-[0.5em] px-5 py-4 rounded-xl bg-gray-50 border-2 border-blue-200 text-blue-900 focus:outline-none focus:border-blue-500 transition shadow-sm"
                       placeholder="------"
                       onChange={(e) => setForm({ ...form, otp: e.target.value })}
                     />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                   <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-md disabled:bg-blue-400"
                   >
                     {loading ? "Verifying..." : "Verify & Create Account"}
                   </button>
                   <button
                     type="button"
                     onClick={() => setStep(1)}
                     disabled={loading}
                     className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-4 rounded-xl transition disabled:opacity-50"
                   >
                     Back to Edit Details
                   </button>
                </div>
             </form>
          )}

          {step === 1 && (
             <p className="mt-8 text-center text-gray-600 font-medium">
               Already have an account?{" "}
               <Link href="/login" className="text-blue-600 hover:text-blue-800 font-bold transition">
                 Sign In
               </Link>
             </p>
          )}
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
