// import React, {useState} from 'react';
// import API from '../api/api';
// import { useNavigate } from 'react-router-dom';

// export default function Payment(){
//   const data = JSON.parse(localStorage.getItem('cart') || '{}');
//   const token = localStorage.getItem('token');
//   const nav = useNavigate();
//   const [payQR, setPayQR] = useState(null);

//   const placeOrder = async () => {
//     try {
//       const items = (data.items || []).map(i=>({ itemId: i._id, qty: i.qty }));
//       const res = await API.post('/orders', { tableId: data.tableId, items }, { headers: { Authorization: `Bearer ${token}` }});
//       // get order id and total
//       const order = res.data;
//       // generate UPI payload (front-end can show a generated QR)
//       // We'll ask backend to return a UPI string using configured UPI_ID
//       const upiRes = await API.post('/admin/generate-upi', { amount: order.total }, { headers: { Authorization: `Bearer ${token}` }});
//       setPayQR(upiRes.data.upiString); // upiString = upi payload or QR data
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl">Payment</h2>
//       <div className="mt-3">Table: {data.tableId}</div>
//       <div className="mt-3">Items:</div>
//       {(data.items||[]).map(i=>(
//         <div key={i._id} className="flex justify-between">{i.name} x {i.qty} <span>₹{i.qty*i.price}</span></div>
//       ))}
//       <div className="mt-3">Total: ₹{(data.items||[]).reduce((s,i)=>s+i.qty*i.price,0)}</div>
//       <button onClick={placeOrder} className="mt-3 bg-green-600 text-white px-3 py-1 rounded">Place Order & Generate Bill</button>

//       {payQR && (
//         <div className="mt-6">
//           <h3>Scan to pay (UPI)</h3>
//           {/* payQR is a string — you can render it with a QR library on frontend */}
//           <pre className="bg-gray-100 p-3 rounded mt-2">{payQR}</pre>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const data = JSON.parse(localStorage.getItem("cart") || "{}");
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const [payQR, setPayQR] = useState(null);

  const placeOrder = async () => {
    try {
      const items = (data.items || []).map((i) => ({
        itemId: i._id,
        qty: i.qty,
      }));
      const res = await API.post(
        "/orders",
        { tableId: data.tableId, items },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const order = res.data;
      const upiRes = await API.post(
        "/admin/generate-upi",
        { amount: order.total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPayQR(upiRes.data.upiString);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const total = (data.items || []).reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0e0e10] via-[#1a1c1e] to-[#232526] text-gray-200 px-6 py-10">
      <div className="w-full max-w-md bg-[#1c1f23] border border-gray-700 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.7)] p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Payment Summary
        </h2>

        {/* Table Info */}
        <div className="text-sm text-gray-400 mb-4 text-center">
          <span className="font-medium text-gray-300">Table ID:</span>{" "}
          {data.tableId}
        </div>

        {/* Item List */}
        <div className="space-y-3 border-t border-gray-700 pt-4">
          {(data.items || []).map((i) => (
            <div
              key={i._id}
              className="flex justify-between text-sm text-gray-300"
            >
              <span>
                {i.name} × {i.qty}
              </span>
              <span className="font-semibold text-gray-100">
                ₹{i.qty * i.price}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-between text-lg font-semibold text-gray-100">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* Button */}
        <button
          onClick={placeOrder}
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500
                     hover:from-teal-500 hover:to-blue-600 text-white font-semibold rounded-lg 
                     shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]
                     transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
        >
          Place Order & Generate Bill
        </button>

        {/* QR Display */}
        {payQR && (
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Scan to Pay (UPI)
            </h3>
            <pre className="bg-[#111315] border border-gray-700 text-gray-300 p-4 rounded-lg text-sm overflow-x-auto shadow-inner">
              {payQR}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
