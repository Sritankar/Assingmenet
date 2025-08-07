import axios from 'axios';
import { getToken, logout } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
};

export const slotsAPI = {
  getAvailableSlots: (from, to) => api.get(`/slots?from=${from}&to=${to}`),
};

export const bookingAPI = {
  bookSlot: (slotId) => api.post('/book', { slotId }),
  getMyBookings: () => api.get('/my-bookings'),
  getAllBookings: () => api.get('/all-bookings'),
};

export default api;
