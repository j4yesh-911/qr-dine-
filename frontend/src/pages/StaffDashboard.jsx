// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const StaffDashboard = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/tasks")
//       .then((res) => res.json())
//       .then((data) => setTasks(data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <Sidebar role="staff" />
//       <div className="flex-1 flex flex-col">
//         <Navbar title="Staff Dashboard" />
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//           {tasks.map((task, i) => (
//             <div key={i} className="p-4 border rounded-lg shadow">
//               <h2 className="text-lg font-bold">{task.table}</h2>
//               <p>Status: {task.status}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QRCard from "../components/QRCard";
import API from "../api/api";

const StaffDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <Sidebar role="staff" />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar title="Staff Dashboard" />
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              No orders available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {orders.map((order, i) => (
                <QRCard key={i} order={order} isStaff={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

