// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Cart(){
//   const data = JSON.parse(localStorage.getItem('cart') || '{}');
//   const nav = useNavigate();
//   const total = (data.items || []).reduce((s,i)=>s + (i.qty * i.price), 0);
//   const checkout = () => nav('/payment');

//   return (
//     <div className="p-4">
//       <h2 className="text-xl mb-3">Cart</h2>
//       {(data.items || []).map(it=>(
//         <div key={it._id} className="flex justify-between py-2 border-b">
//           <div>{it.name} x {it.qty}</div>
//           <div>₹{it.qty*it.price}</div>
//         </div>
//       ))}
//       <div className="mt-4">Total: ₹{total}</div>
//       <button onClick={checkout} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">Request Bill / Pay</button>
//     </div>
//   )
// }

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const data = JSON.parse(localStorage.getItem("cart") || "{}");
  const nav = useNavigate();
  const total = (data.items || []).reduce((s, i) => s + i.qty * i.price, 0);
  const checkout = () => nav("/payment");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-950 via-purple-900 to-indigo-800 text-white flex justify-center items-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-200">
          Your Cart
        </h2>

        <div className="space-y-4">
          {(data.items || []).map((it) => (
            <div
              key={it._id}
              className="flex justify-between py-2 border-b border-gray-600"
            >
              <div className="text-indigo-100">
                {it.name} × {it.qty}
              </div>
              <div className="font-semibold text-indigo-300">
                ₹{it.qty * it.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-lg font-semibold text-indigo-100">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={checkout}
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-lg font-semibold
          hover:shadow-pink-500/50 hover:-translate-y-1 transform transition duration-300"
        >
          Request Bill / Pay
        </button>
      </div>
    </div>
  );
}
