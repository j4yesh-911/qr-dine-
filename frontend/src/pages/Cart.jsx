import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart(){
  const data = JSON.parse(localStorage.getItem('cart') || '{}');
  const nav = useNavigate();
  const total = (data.items || []).reduce((s,i)=>s + (i.qty * i.price), 0);
  const checkout = () => nav('/payment');

  return (
    <div className="p-4">
      <h2 className="text-xl mb-3">Cart</h2>
      {(data.items || []).map(it=>(
        <div key={it._id} className="flex justify-between py-2 border-b">
          <div>{it.name} x {it.qty}</div>
          <div>₹{it.qty*it.price}</div>
        </div>
      ))}
      <div className="mt-4">Total: ₹{total}</div>
      <button onClick={checkout} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">Request Bill / Pay</button>
    </div>
  )
}
