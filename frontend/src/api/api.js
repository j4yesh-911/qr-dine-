import axios from "axios";

const API = axios.create({
  baseURL:  "http://localhost:4000/api",
  withCredentials: true, // ✅ must be separate property
});

export default API;
