import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  registro: async (nombre, email, contraseña) => {
    const response = await api.post('/auth/registro', {
      nombre,
      email,
      contraseña
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (email, contraseña) => {
    const response = await api.post('/auth/login', {
      email,
      contraseña
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getMe: async () => {
    const token = authService.getToken();
    if (!token) return null;
    
    try {
      const apiMe = axios.create({
        baseURL: API_BASE_URL,
        headers: { 'Content-Type': 'application/json' }
      });
      apiMe.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      
      const response = await apiMe.get('/auth/me');
      return response.data;
    } catch (err) {
      console.error('Error getting user:', err);
      return null;
    }
  },

  isLoggedIn: () => {
    return !!authService.getToken();
  },

  decodeToken: () => {
    const token = authService.getToken();
    if (!token) return null;
    
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }
};
