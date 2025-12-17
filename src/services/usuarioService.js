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

export const usuarioService = {
  obtenerTodos: async () => {
    const response = await api.get('/usuarios/admin/todos');
    return response.data;
  },

  cambiarRol: async (id, nuevoRol) => {
    const response = await api.put(`/usuarios/admin/${id}/rol?nuevoRol=${nuevoRol}`);
    return response.data;
  },

  eliminarUsuario: async (id) => {
    const response = await api.delete(`/usuarios/admin/${id}`);
    return response.data;
  }
};