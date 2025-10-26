import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // ✅ Nice back arrow icon
import Navbar from "../components/Navbar";

export default function Cart() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("cart") || "{}")
  );
  const items = data.items || [];
  const nav = useNavigate();

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const checkout = () => nav("/payment");

  // 🗑 Remove item
  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item._id !== id);
    const updatedCart = { ...data, items: updatedItems };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setData(updatedCart);
  };

  // 🔙 Back to Menu
  const goBack = () => nav("/menu");

  return (
    <div>
            <Navbar title="Our Delicious Menu" />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800 text-white flex justify-center items-center px-4">

      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-2xl">
        
        {/* 🔙 Back Button */}
        <button
          onClick={goBack}
          className="absolute top-5 left-5 flex items-center gap-2 text-indigo-300 hover:text-pink-400 transition duration-300 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </button>

        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Your Cart
        </h2>

        {items.length === 0 ? (
          <div className="text-center text-gray-300 mt-16">
            Your cart is empty 😔
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((it) => (
                <div
                  key={it._id}
                  className="flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/20 hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={it.image || "https://via.placeholder.com/80"}
                      alt={it.name}
                      className="w-20 h-20 object-cover rounded-xl border border-white/20"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-200">
                        {it.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Qty: {it.qty} × ₹{it.price}
                      </p>
                      <p className="text-indigo-300 mt-1 font-medium">
                        Subtotal: ₹{it.qty * it.price}
                      </p>
                    </div>
                  </div>

                  {/* 🗑 Remove Button */}
                  <button
                    onClick={() => removeItem(it._id)}
                    className="text-pink-400 hover:text-red-500 transition duration-300 text-sm font-semibold bg-white/10 px-3 py-2 rounded-lg border border-white/20 hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between text-xl font-semibold text-indigo-100 border-t border-white/20 pt-4">
              <span>Total:</span>
              <span className="text-pink-400">₹{total}</span>
            </div>


             <button
              onClick={()=>nav("/my-orders")}
              className="w-70 mr-9 mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/50 hover:-translate-y-1 transform transition-all duration-300"
            >
             My Orders
            </button>


            <button
              onClick={checkout}
              className="w-70 mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/50 hover:-translate-y-1 transform transition-all duration-300"
            >
              Request Bill / Pay
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}
