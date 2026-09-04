"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the secure token exists in the browser
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token and update the state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO SECTION */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter text-black"
            >
              FASHONSTORE
            </Link>
          </div>

          {/* CENTER NAVIGATION */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/collections/mens"
              className="text-gray-700 hover:text-black font-medium"
            >
              Men
            </Link>
            <Link
              href="/collections/womens"
              className="text-gray-700 hover:text-black font-medium"
            >
              Women
            </Link>
            <Link
              href="/collections/accessories"
              className="text-gray-700 hover:text-black font-medium"
            >
              Accessories
            </Link>
          </div>

          {/* RIGHT ACTIONS SECTION */}
          <div className="flex items-center space-x-6">
            {/* ADMIN BUTTON MOVED HERE */}
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
            >
              Admin
            </Link>

            {/* Dynamically show Log Out or Log In */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-black font-medium"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-black font-medium"
              >
                Log In
              </Link>
            )}

            <Link
              href="/cart"
              className="text-gray-700 hover:text-black flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
