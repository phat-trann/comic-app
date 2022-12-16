import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
