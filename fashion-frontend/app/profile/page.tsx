"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      // 1. Get the auth token to prove the user is logged in
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect to login if they aren't authenticated
        router.push("/login");
        return;
      }

      try {
        // 2. Fetch the user's specific orders from the backend
        const res = await fetch("http://127.0.0.1:8000/api/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch your order history.");
        }

        const data = await res.json();
        setOrders(data);
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

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <p className="text-gray-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {orders.length === 0 && !error ? (
        <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
          <p className="text-gray-500 font-medium mb-4">
            You haven@aps;t placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
            >
              <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-lg text-gray-900">
                    ${order.total_amount.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status.toLowerCase() === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status.toLowerCase() === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.product_name}{" "}
                      <span className="text-gray-400">x {item.quantity}</span>
                    </span>
                    <span className="text-gray-900 font-bold">
                      ${(item.price_at_purchase * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
