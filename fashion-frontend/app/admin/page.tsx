"use client";

import { useState, useEffect } from "react";
import ManageProducts from "../../components/ManageProducts";
import OrdersPage from "../../components/OrdersPage";
import CustomersPage from "../../components/CustomersPage";

export default function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [activeView, setActiveView] = useState<
    "dashboard" | "products" | "orders" | "customers"
  >("dashboard");

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 0);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Invalid admin credentials. Access denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setUsername("");
    setPassword("");
    setActiveView("dashboard");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 px-4 py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Admin Access
          </h1>
          <p className="text-gray-500 text-sm">Authorized personnel only.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-gray-900 text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-md"
          >
            Enter Dashboard
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-sm text-gray-600">
          <p className="font-semibold text-gray-800 mb-1">
            Test Admin Credentials:
          </p>
          <p>
            Username:{" "}
            <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-900">
              admin
            </span>
          </p>
          <p className="mt-1">
            Password:{" "}
            <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-900">
              admin123
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Admin Control Panel
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors"
        >
          Lock Dashboard
        </button>
      </div>

      {activeView === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Products</h2>
            <p className="text-gray-500 mb-4">Manage your store inventory.</p>
            <button
              onClick={() => setActiveView("products")}
              className="text-sm font-bold text-store-peach hover:underline"
            >
              Manage Products &rarr;
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Orders</h2>
            <p className="text-gray-500 mb-4">View incoming customer orders.</p>
            <button
              onClick={() => setActiveView("orders")}
              className="text-sm font-bold text-store-peach hover:underline"
            >
              View Orders &rarr;
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Customers</h2>
            <p className="text-gray-500 mb-4">View registered users.</p>
            <button
              onClick={() => setActiveView("customers")}
              className="text-sm font-bold text-store-peach hover:underline"
            >
              View Users &rarr;
            </button>
          </div>
        </div>
      )}

      {activeView === "products" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Management
            </h2>
            <button
              onClick={() => setActiveView("dashboard")}
              className="text-sm font-bold text-gray-500 hover:text-gray-900"
            >
              &larr; Back to Dashboard
            </button>
          </div>

          <div className="mt-4">
            <ManageProducts />
          </div>
        </div>
      )}

      {activeView === "orders" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <button
              onClick={() => setActiveView("dashboard")}
              className="text-sm font-bold text-gray-500 hover:text-gray-900"
            >
              &larr; Back to Dashboard
            </button>
          </div>
          <div className="mt-4">
            <OrdersPage />
          </div>
        </div>
      )}

      {activeView === "customers" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Directory
            </h2>
            <button
              onClick={() => setActiveView("dashboard")}
              className="text-sm font-bold text-gray-500 hover:text-gray-900"
            >
              &larr; Back to Dashboard
            </button>
          </div>
          <div className="mt-4">
            <CustomersPage />
          </div>
        </div>
      )}
    </div>
  );
}
