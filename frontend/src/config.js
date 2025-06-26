// src/config.js
// Reads the backend API URL from environment variable (Vite) or defaults to local
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export default {
  API_URL,
};
