// import React, {useEffect, useState} from 'react';
// import API from '../api/api';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// export default function Menu(){
//   const [items,setItems] = useState([]);
//   const [cart,setCart] = useState([]);
//   const [params] = useSearchParams();
//   const tableId = params.get('tableId') || 'unknown_table';
//   const nav = useNavigate();

//   useEffect(()=>{ (async()=>{
//     const res = await API.get('/menu');
//     setItems(res.data);
//   })(); }, []);

//   const addToCart = (item) => {
//     setCart(prev => {
//       const found = prev.find(p=>p._id===item._id);
//       if(found) return prev.map(p=>p._id===item._id ? {...p, qty: p.qty+1} : p);
//       return [...prev, {...item, qty:1}];
//     });
//   };

//   const goCart = () => {
//     localStorage.setItem('cart', JSON.stringify({ items: cart, tableId }));
//     nav('/cart');
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl">Menu — Table: {tableId}</h1>
//         <button onClick={goCart} className="bg-green-600 text-white px-3 py-1 rounded">Cart ({cart.length})</button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {items.map(it=>(
//           <div key={it._id} className="p-4 border rounded">
//             <h3 className="font-semibold">{it.name}</h3>
//             <p className="text-sm">{it.desc}</p>
//             <div className="mt-2 flex justify-between items-center">
//               <div>₹{it.price}</div>
//               <button onClick={()=>addToCart(it)} className="px-2 py-1 bg-blue-500 text-white rounded">Add</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, LogOut } from "lucide-react";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [params] = useSearchParams();
  const tableId = params.get('tableId') || 'unknown_table';
  const nav = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await API.get('/menu');
      setItems(res.data);
    })();
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(p => p._id === item._id);
      if (found) return prev.map(p => p._id === item._id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const goCart = () => {
    localStorage.setItem('cart', JSON.stringify({ items: cart, tableId }));
    nav('/cart');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white px-6 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 relative z-20">
        <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 drop-shadow-lg">
          Menu — Table {tableId}
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={goCart}
            className="relative px-5 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] 
                      hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></span>
            <span className="relative z-10">Cart ({cart.length})</span>
          </button>

          <button
            onClick={toggleProfile}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <User size={20} className="text-cyan-300" />
            <span className="text-sm font-semibold">
              {user ? user.name || "Profile" : "Guest"}
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute top-14 right-0 w-64 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl z-50">
            {user ? (
              <>
                <div className="pb-3 border-b border-white/10">
                  <p className="text-indigo-300 font-semibold">{user.name}</p>
                  <p className="text-gray-300 text-sm">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-300 mb-3 text-sm">
                  You’re not logged in
                </p>
                <a
                  href="/login"
                  className="block text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Login
                </a>
              </>
            )}
          </div>
        )}
      </div>

      {/* Menu Items Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(it => (
          <div
            key={it._id}
            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 
                       shadow-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] 
                       hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex flex-col gap-2">
              {it.image && (
                <img
                  src={it.image}
                  alt={it.name}
                  className="rounded-xl w-full h-48 object-cover mb-2"
                />
              )}

              <h3 className="text-xl font-bold text-cyan-300">{it.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{it.description}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-semibold text-pink-400">₹{it.price}</span>
                <button
                  onClick={() => addToCart(it)}
                  className="px-3 py-1.5 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 
                             hover:from-pink-500 hover:to-blue-600 
                             shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] 
                             transition-all duration-300"
                >
                  Add
                </button>
              </div>

              <div className="flex justify-between mt-1 text-gray-400 text-xs">
                {it.rating && <span>⭐ {it.rating}</span>}
                {it.reviews && <span>{it.reviews} reviews</span>}
                {it.prepTime && <span>{it.prepTime}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-300 animate-pulse">
          Loading Menu...
        </div>
      )}
    </div>
  );
}
