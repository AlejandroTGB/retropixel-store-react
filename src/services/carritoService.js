import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL;

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

export const carritoService = {
  obtenerCarrito: async () => {
    const response = await api.get('/carrito/mi-carrito');
    return response.data;
  },

  agregarProducto: async (productoId, cantidad) => {
    const response = await api.post('/carrito/agregar', {
      productoId,
      cantidad
    });
    return response.data;
  },

  actualizarProducto: async (productoId, cantidad) => {
    const response = await api.put(`/carrito/actualizar/${productoId}`, {
      cantidad
    });
    return response.data;
  },

  eliminarProducto: async (productoId) => {
    const response = await api.delete(`/carrito/eliminar/${productoId}`);
    return response.data;
  },

  vaciarCarrito: async () => {
    const response = await api.delete('/carrito/vaciar');
    return response.data;
  }
};
