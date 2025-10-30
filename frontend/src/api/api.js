import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL|| "http://localhost:4000/api",
  withCredentials: true, // ✅ must be separate property
});

export default API;
