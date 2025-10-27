import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ role = "admin", isOpen, onClose }) => {
  return (
    <>
      {/* Dim background for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* ✅ Sidebar - works for both mobile & desktop */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:z-auto`}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 mt-2">
          {role === "admin" ? "Admin Panel" : "Staff Panel"}
        </h2>

        <ul className="space-y-3">
          {role === "admin" ? (
            <>
              <li><Link to="/admin" onClick={onClose}>Dashboard</Link></li>
              <li><Link to="/menu" onClick={onClose}>Menu</Link></li>
              <li><Link to="/orders" onClick={onClose}>Orders</Link></li>
              <li><Link to="/qrcodes" onClick={onClose}>QR Codes</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/staff" onClick={onClose}>Dashboard</Link></li>
              <li><Link to="/tasks" onClick={onClose}>My Tasks</Link></li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
