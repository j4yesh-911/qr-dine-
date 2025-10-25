import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    
    // Optional: Show confirmation
    console.log("✅ Logged out successfully");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors duration-200 font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
