import axios from "axios";
import nookies from "nookies";

const token = nookies.get().token;

const api = axios.create({
  baseURL: 'http://localhost:4000/api/products',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export default api;