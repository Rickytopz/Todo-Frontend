import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ Correct
});

export default api;

