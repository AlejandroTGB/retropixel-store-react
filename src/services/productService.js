import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  obtenerProductos: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  obtenerProductoPorId: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  buscarPorNombre: async (nombre) => {
    const response = await api.get(`/productos/nombre/${nombre}`);
    return response.data;
  },

  crearProducto: async (producto) => {
    const response = await api.post('/productos/admin/crear', producto);
    return response.data;
  },

  actualizarProducto: async (id, producto) => {
    const response = await api.put(`/productos/admin/${id}`, producto);
    return response.data;
  },

  eliminarProducto: async (id) => {
    const response = await api.delete(`/productos/admin/${id}`);
    return response.data;
  }
};
