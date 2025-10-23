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
    <div className="flex h-screen">
      <Sidebar role="staff" />
      <div className="flex-1 flex flex-col">
        <Navbar title="Staff Dashboard" />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task, i) => (
            <div key={i} className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-bold">{task.table}</h2>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
