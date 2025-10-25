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
import Register from "./pages/Register";
import QRGenerator from "./components/QRGenerator";
import ProtectedRoute from "./components/ProtectedRoute";
import UserOrders from "./pages/UserOrders"; // create this

import "./index.css";

function App() {
  return (
   <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/menu" element={
    <ProtectedRoute allowedRoles={['user', 'staff', 'admin']}>
      <Menu />
    </ProtectedRoute>
  } />

  <Route path="/cart" element={
    <ProtectedRoute allowedRoles={['user']}>
      <Cart />
    </ProtectedRoute>
  } />


   <Route path="/my-orders" element={
    <ProtectedRoute allowedRoles={['user']}>
    <UserOrders />
    </ProtectedRoute>
  } />

  <Route path="/payment" element={
    <ProtectedRoute allowedRoles={['user']}>
      <Payment />
    </ProtectedRoute>
  } />

  <Route path="/staff" element={
    <ProtectedRoute allowedRoles={['staff', 'admin']}>
      <StaffDashboard />
    </ProtectedRoute>
  } />

  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  } />

  <Route path="/qrcodes" element={
    <ProtectedRoute allowedRoles={['admin', 'staff']}>
      <QRGenerator />
    </ProtectedRoute>
  } />
</Routes>
  );
}

export default App;
