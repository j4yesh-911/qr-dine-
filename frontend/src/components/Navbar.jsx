import React from "react";

const Navbar = ({ title }) => {
  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <button className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </div>
  );
};

export default Navbar;
