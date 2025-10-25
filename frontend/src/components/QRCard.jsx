import React, { useState } from "react";
import API from "../api/api";

const QRCard = ({ order, isStaff }) => {
  const tableId = order.tableId || "Unknown";
  const itemsList = order.items?.length > 0
    ? order.items.map(i => `${i.item?.name || "Unknown"} x${i.qty}`)
    : ["No items"];
  const userEmail = order.placedBy?.email || "Unknown";
  const firstImage = order.items?.[0]?.item?.image || "https://via.placeholder.com/150";

  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      const token = localStorage.getItem("token");
      await API.patch(`/orders/${order._id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
      setStatus(order.status); // revert
    }
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full">
      {/* Image */}
      <div className="w-full h-44 rounded-xl overflow-hidden mb-4 shadow-sm">
        <img src={firstImage} alt="Order" className="w-full h-full object-cover" />
      </div>

      <h3 className="font-semibold text-xl mb-2 text-white">Table {tableId}</h3>

      <p className="text-sm mb-1 text-gray-200">
        <span className="font-medium">Items:</span> {itemsList.join(", ")}
      </p>

      {/* Status: Dropdown for staff, text for others */}
      <p className="text-sm mb-1 text-gray-200">
        <span className="font-medium">Status:</span>{" "}
        {isStaff ? (
          <select
            value={status}
            onChange={handleStatusChange}
            className="ml-2 px-2 py-1 rounded bg-gray-800 text-white outline-none"
          >
            {['placed','preparing','ready','served','billed','cancelled'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <span className="font-semibold">{status}</span>
        )}
      </p>

      {/* User Email */}
      <p className="text-sm mt-2 text-gray-300 break-words">
        <span className="font-medium">User:</span> {userEmail}
      </p>
    </div>
  );
};

export default QRCard;


