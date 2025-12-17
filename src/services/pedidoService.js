import axios from "axios";
import { authService } from "./authService";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const pedidoService = {
  crearPedido: async (email, nombre, metodoPago) => {
    const response = await api.post("/pedidos/crear", {
      email,
      nombre,
      metodoPago,
      estado: "pagado",
    });
    return response.data;
  },

  obtenerMisPedidos: async () => {
    const response = await api.get("/pedidos/mis-pedidos");
    return response.data;
  },

  obtenerTodos: async () => {
    const response = await api.get("/pedidos/admin/todos");
    return response.data;
  },

  actualizarEstado: async (id, estado) => {
    const response = await api.put(`/pedidos/admin/${id}/estado`, { estado });
    return response.data;
  },
};
