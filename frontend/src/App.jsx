// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/AdminDashboard";
// import StaffDashboard from "./pages/StaffDashboard";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/staff"
//           element={
//             <ProtectedRoute>
//               <StaffDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css"


function App() {
  console.log("hello bhai")
  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />             {/* Home/Login */}
        <Route path="/menu" element={<Menu />} />          {/* Menu Page */}
        <Route path="/cart" element={<Cart />} />          {/* Cart Page */}
        <Route path="/payment" element={<Payment />} />    {/* Payment Page */}
        <Route path="/staff" element={<StaffDashboard />} />{/* Staff Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />{/* Admin Dashboard */}
      </Routes>
    </>
  );
}

export default App;
