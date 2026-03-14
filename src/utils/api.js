import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Har bir so'rovga tokenni avtomatik qo'shib yuborish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Backenddan kelgan javoblarni kuzatish (Avto-logout shu yerda bo'ladi)
api.interceptors.response.use(
  (response) => response, // Agar hammasi joyida bo'lsa (200 OK)
  (error) => {
    // Agar backend 401 (Unauthorized - token muddati tugagan yoki xato) qaytarsa
    if (error.response && error.response.status === 401) {
      console.warn("Token muddati tugadi, tizimdan chiqarilmoqda...");
      localStorage.removeItem('token'); // 1. Tokkenni xotiradan o'chiramiz
      window.location.href = '/login'; // 2. Foydalanuvchini login sahifasiga haydaymiz
    }
    return Promise.reject(error);
  }
);

export default api;