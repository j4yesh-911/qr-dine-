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

const StaffDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0e0e10] via-[#1a1c1e] to-[#232526] text-gray-100">
      {/* Sidebar */}
      <Sidebar role="staff" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar title="Staff Dashboard" />

        {/* Tasks Section */}
        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-6 text-white">
            Active Tasks
          </h1>

          {tasks.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 animate-pulse">
              Loading tasks...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="p-6 bg-[#1c1f23] border border-gray-700 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.4)]
                             hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-indigo-400">
                      Table {task.table}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        task.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : task.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {task.details || "No additional details provided."}
                  </p>

                  <button
                    className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500
                               hover:from-teal-500 hover:to-blue-600 text-white text-sm font-semibold rounded-md
                               shadow-[0_0_10px_rgba(37,99,235,0.3)] hover:shadow-[0_0_15px_rgba(20,184,166,0.5)]
                               transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
