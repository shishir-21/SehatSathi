"use client";

import { useState } from "react";
import { login } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the login API helper
    const data = await login({ email, password });

    if (data.access_token) {
      // Save token to localStorage for later use in booking
      localStorage.setItem("token", data.access_token);
      alert("Login Successful!");
      router.push("/"); // Send user back to home page
    } else {
      alert("Login Failed: Check your credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Login to SehatSathi</h1>
        
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
