// import React, { useState } from 'react';
// import API from '../api/api';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       nav('/menu');
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <form 
//         onSubmit={submit} 
//         className="relative bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm
//                    flex flex-col gap-6 border border-gray-200"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Welcome Back</h2>

//         <div className="flex flex-col">
//           <label className="mb-1 text-gray-600 font-medium">Email</label>
//           <input 
//             value={email} 
//             onChange={e => setEmail(e.target.value)} 
//             placeholder="Enter your email" 
//             className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400
//                        transition duration-300"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-gray-600 font-medium">Password</label>
//           <input 
//             value={password} 
//             onChange={e => setPassword(e.target.value)} 
//             placeholder="Enter your password" 
//             type="password" 
//             className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400
//                        transition duration-300"
//           />
//         </div>

//         <button 
//           type="submit"
//           className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg
//                      transition duration-300 transform hover:-translate-y-1"
//         >
//           Login
//         </button>

//         <p className="text-center text-gray-500 mt-3">
//           Don't have an account? 
//           <span className="text-indigo-600 hover:underline cursor-pointer ml-1" onClick={() => nav('/register')}>Sign Up</span>
//         </p>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"; // ✅ Use default import, not destructured
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // 🔹 Normal login
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") nav("/admin");
      else if (user.role === "staff") nav("/staff");
      else nav("/menu");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // 🔹 Google login
  const handleGoogleLogin = async (response) => {
    try {
      const res = await API.post("/auth/google", { token: response.credential });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") nav("/admin");
      else if (user.role === "staff") nav("/staff");
      else nav("/menu");
    } catch (err) {
      console.error("Google login failed:", err);
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]">
      <form
        onSubmit={submit}
        className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] w-full max-w-md border border-[#2f4f6f] flex flex-col gap-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-pink-400 drop-shadow-md">
          Welcome Back
        </h2>

        <p className="text-center text-gray-400 text-sm mb-4">
          Sign in to continue to your dashboard
        </p>

        <div className="flex flex-col">
          <label className="mb-1 text-blue-300 font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 rounded-lg bg-[#0f1b2d] border border-[#2b3b55] text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition duration-300 outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-blue-300 font-semibold">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
            className="p-3 rounded-lg bg-[#0f1b2d] border border-[#2b3b55] text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-pink-500 focus:border-pink-400 transition duration-300 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg 
                    bg-gradient-to-r from-[#005bea] to-[#00c6fb] 
                    shadow-lg hover:shadow-blue-500/50 
                    hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert("Google login failed")} />
        </div>

        <p className="text-center text-gray-400 mt-3">
          Don’t have an account?
          <span
            className="text-cyan-400 hover:text-pink-400 hover:underline cursor-pointer ml-1 transition"
            onClick={() => nav("/register")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}


