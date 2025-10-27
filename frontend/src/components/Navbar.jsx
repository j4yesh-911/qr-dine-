import React, { useState, useEffect } from "react";
import { User, LogOut, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar({ title, onMenuClick }) {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // 🔍 Get tableId from URL if present
  const params = new URLSearchParams(location.search);
  const tableId = params.get("tableId");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = () => {
    setShowProfile(false);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }, 200);
  };

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-800 text-white px-6 py-4 shadow-lg flex justify-between items-center border-b border-white/20">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-white hover:text-cyan-400 transition"
        >
          <Menu size={26} />
        </button>

        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
          {title || "QR Dine"}
          {tableId && (
            <span className="ml-2 text-sm text-gray-300 font-medium">
              — Table {tableId}
            </span>
          )}
        </h1>
      </div>

      {/* Right Section */}
      <div className="relative">
        <button
          onClick={toggleProfile}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
        >
          <User size={20} className="text-cyan-300" />
          <span className="text-sm font-semibold hidden sm:inline">
            {user ? user.name || "Profile" : "Guest"}
          </span>
        </button>

        <div
          className={`absolute right-0 mt-3 w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl profile-menu transform transition-all duration-300 origin-top-right ${
            showProfile
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          {user ? (
            <>
              <div className="pb-3 border-b border-white/10">
                <p className="text-indigo-300 font-semibold">{user.name}</p>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-300 mb-3 text-sm">
                You’re not logged in
              </p>
              <a
                href="/login"
                className="block text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-all"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
