import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FashonStore | Modern E-Commerce",
  description: "Built with Next.js and FastAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-store-cream text-gray-900 min-h-screen`}
      >
        <CartProvider>
          <header className="bg-store-blue shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              {/* Logo now links home */}
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
              >
                FashionStore
              </Link>

              {/* Navigation Links including Admin, Login, and Cart */}
              <div className="flex gap-6 text-gray-800 font-medium items-center">
                <Link
                  href="/"
                  className="hover:text-store-peach transition-colors"
                >
                  Shop
                </Link>

                {/* --- NEW ADMIN BUTTON ADDED HERE --- */}
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Admin
                </Link>
                {/* ----------------------------------- */}

                <Link
                  href="/login"
                  className="hover:text-store-peach transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/cart"
                  className="hover:text-store-peach transition-colors"
                >
                  Cart
                </Link>
              </div>
            </div>
          </header>

          <main className="min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
