"use client";

import { useState } from "react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url?: string;
  };
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url?: string;
  quantity: number;
}

export default function AddToCartButton({ product }: ProductProps) {
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

    // Check if item is already in cart
    const existingIndex = existingCart.findIndex(
      (item) => item.id === product.id,
    );

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity =
        (existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show the floating success message
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000); // Hides after 2 seconds
  };

  return (
    <div className="relative w-full">
      {/* Floating Toast Notification */}
      {showToast && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap animate-fade-in z-10">
          Added to cart! ✨
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-store-apricot hover:bg-[#e6c2a8] text-gray-900 font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm cursor-pointer text-sm"
      >
        Add to Bag
      </button>
    </div>
  );
}
