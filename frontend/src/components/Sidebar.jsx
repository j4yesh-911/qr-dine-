import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ role = "admin" }) => {
  return (
    <div className="w-64 bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-semibold mb-6">{role === "admin" ? "Admin" : "Staff"}</h2>
      <ul className="space-y-3">
        {role === "admin" ? (
          <>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/staff">Dashboard</Link></li>
            <li><Link to="/tasks">My Tasks</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
