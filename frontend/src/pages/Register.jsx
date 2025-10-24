// import React, { useState } from "react";
// import API_URL from "../api/api";
// import { useNavigate, Link } from "react-router-dom";
// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "customer",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Registration successful!");
//         navigate("/login");
//       } else {
//         setError(data.message || "Registration failed");
//       }
//     } catch (err) {
//       setError("Server error. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0e0e10] via-[#1a1c1e] to-[#232526] text-gray-200 px-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1c1f23]/90 backdrop-blur-md border border-gray-700 shadow-[0_0_25px_rgba(0,0,0,0.6)] rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
//           Create Account
//         </h2>

//         {error && (
//           <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
//         )}

//         {/* Name */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-400 mb-1">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             onChange={handleChange}
//             value={formData.name}
//             className="w-full p-3 rounded-lg bg-[#111315] border border-gray-700 text-gray-200 placeholder-gray-500 
//                        focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-400 mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             onChange={handleChange}
//             value={formData.email}
//             className="w-full p-3 rounded-lg bg-[#111315] border border-gray-700 text-gray-200 placeholder-gray-500 
//                        focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block text-sm text-gray-400 mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             onChange={handleChange}
//             value={formData.password}
//             className="w-full p-3 rounded-lg bg-[#111315] border border-gray-700 text-gray-200 placeholder-gray-500 
//                        focus:ring-2 focus:ring-teal-500 outline-none transition-all duration-200"
//             required
//           />
//         </div>

//         {/* Role Select */}
//         {/* <div className="mb-6">
//           <label className="block text-sm text-gray-400 mb-1">Role</label>
//           <select
//             name="role"
//             onChange={handleChange}
//             value={formData.role}
//             className="w-full p-3 rounded-lg bg-[#111315] border border-gray-700 text-gray-200
//                        focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
//           >
//             <option value="customer">Customer</option>
//             <option value="staff">Staff</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div> */}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500
//                      hover:from-teal-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]
//                      hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
//         >
//           Sign Up
//         </button>

//         {/* Login Link */}
//         <p className="text-center text-sm text-gray-400 mt-4">
//           Already have an account?{" "}
//              <span
//             className="text-cyan-400 hover:text-pink-400 hover:underline cursor-pointer ml-1 transition"
//         onClick={()=>navigate("/")}
//             >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import API from "../api/api"; // make sure this is your Axios instance
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ Correct key
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ✅ Send correct keys to backend
      const res = await API.post("/auth/register", { name, email, password });
      alert("Registration successful! Please log in.");
      nav("/"); // redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]">
      <form
        onSubmit={handleRegister}
        className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] w-full max-w-md border border-[#2f4f6f] flex flex-col gap-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 drop-shadow-md">
          Create Account
        </h2>

        <p className="text-center text-gray-400 text-sm mb-4">
          Join us and start your journey!
        </p>

        <div className="flex flex-col">
          <label className="mb-1 text-blue-300 font-semibold">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="p-3 rounded-lg bg-[#0f1b2d] border border-[#2b3b55] text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition duration-300 outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-blue-300 font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            className="p-3 rounded-lg bg-[#0f1b2d] border border-[#2b3b55] text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition duration-300 outline-none"
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
                    bg-gradient-to-r from-[#00c6fb] to-[#005bea] 
                    shadow-lg hover:shadow-cyan-500/50 
                    hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-400 mt-3">
          Already have an account?
          <span
            className="text-cyan-400 hover:text-pink-400 hover:underline cursor-pointer ml-1 transition"
            onClick={() => nav("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
