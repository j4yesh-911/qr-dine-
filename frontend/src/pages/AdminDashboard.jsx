// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import QRCard from "../components/QRCard";

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Example: fetch orders from MongoDB API
//     fetch("http://localhost:5000/api/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar title="Admin Dashboard" />
//         <div className="p-6">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {orders.map((order, i) => (
//                 <QRCard key={i} order={order} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QRCard from "../components/QRCard";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar title="Admin Dashboard" />
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {orders.map((order, i) => (
                <div
                  key={i}
                  className="transform hover:scale-105 transition duration-300"
                >
                  <QRCard order={order} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
