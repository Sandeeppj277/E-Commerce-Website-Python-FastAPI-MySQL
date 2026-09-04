"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.detail || "Failed to log in");
      }

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/checkout");
      } else {
        throw new Error("Invalid token received from server");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4 py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-sm">
          Please log in to complete your checkout.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-store-peach text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-store-peach text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-store-peach text-gray-900 text-lg font-bold py-4 rounded-xl hover:bg-[#e8a379] transition-all transform hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:transform-none"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-1">
          Test User Credentials:
        </p>
        <p>
          Email:{" "}
          <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-900">
            user@gmail.com
          </span>
        </p>
        <p className="mt-1">
          Password:{" "}
          <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-900">
            123
          </span>
        </p>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 font-medium">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-store-peach hover:underline font-bold"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}
