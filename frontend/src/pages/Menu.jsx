import React, {useEffect, useState} from 'react';
import API from '../api/api';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Menu(){
  const [items,setItems] = useState([]);
  const [cart,setCart] = useState([]);
  const [params] = useSearchParams();
  const tableId = params.get('tableId') || 'unknown_table';
  const nav = useNavigate();

  useEffect(()=>{ (async()=>{
    const res = await API.get('/menu');
    setItems(res.data);
  })(); }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(p=>p._id===item._id);
      if(found) return prev.map(p=>p._id===item._id ? {...p, qty: p.qty+1} : p);
      return [...prev, {...item, qty:1}];
    });
  };

  const goCart = () => {
    localStorage.setItem('cart', JSON.stringify({ items: cart, tableId }));
    nav('/cart');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Menu — Table: {tableId}</h1>
        <button onClick={goCart} className="bg-green-600 text-white px-3 py-1 rounded">Cart ({cart.length})</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it=>(
          <div key={it._id} className="p-4 border rounded">
            <h3 className="font-semibold">{it.name}</h3>
            <p className="text-sm">{it.desc}</p>
            <div className="mt-2 flex justify-between items-center">
              <div>₹{it.price}</div>
              <button onClick={()=>addToCart(it)} className="px-2 py-1 bg-blue-500 text-white rounded">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
