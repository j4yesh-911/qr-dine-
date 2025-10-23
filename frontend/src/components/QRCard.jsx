import React from "react";

const QRCard = ({ order }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">Table {order.table}</h3>
      <p>Items: {order.items.join(", ")}</p>
      <p>Status: <span className="font-bold">{order.status}</span></p>
    </div>
  );
};

export default QRCard;
