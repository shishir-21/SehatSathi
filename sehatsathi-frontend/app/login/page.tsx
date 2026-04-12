"use client";

import { useState } from "react";
import { login } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent empty inputs
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Call backend API
      const data = await login({ email, password });

      if (data.access_token) {
        // Save token in localStorage
        localStorage.setItem("access_token", data.access_token);

        alert("Login Successful!");

        // Redirect to home page
        router.push("/");
      } else {
        alert("Login Failed: Invalid credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <form
        onSubmit={handleLogin}
        className="p-8 border rounded shadow-md w-96 bg-white"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Login to MediBrain
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
