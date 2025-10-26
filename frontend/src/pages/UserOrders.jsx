import React, { useEffect, useState } from "react";
import QRCard from "../components/QRCard";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 p-8 text-white relative">
        {/* ✅ Back button positioned relative to this container */}
        <button
          onClick={() => nav("/cart")}
          className="absolute top-5 left-5 flex items-center gap-2 text-indigo-300 hover:text-pink-400 transition duration-300 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center mt-12">My Orders</h1>

        {loading ? (
          <div>Loading...</div>
        ) : orders.length === 0 ? (
          <div>No orders yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {orders.map((order) => (
              <QRCard key={order._id} order={order} hideUserEmail />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
