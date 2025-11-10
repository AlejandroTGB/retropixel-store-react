import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { carritoService } from '../services/carritoService';

const CarritoContext = createContext();
const CARRITO_INVITADO_KEY = 'carritoInvitado';

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const inicializarCarrito = async () => {
      try {
        const loggedIn = authService.isLoggedIn();
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
          const user = await authService.getMe();
          setCurrentUser(user);
          
          try {
            const carritoDelBackend = await carritoService.obtenerCarrito();
            console.log('Carrito del backend:', carritoDelBackend);
            
            if (Array.isArray(carritoDelBackend)) {
              setCarrito(carritoDelBackend);
            } else if (carritoDelBackend && typeof carritoDelBackend === 'object') {
              const items = carritoDelBackend.items || [];
              console.log('Items del carrito:', items);
              setCarrito(Array.isArray(items) ? items : []);
            } else {
              setCarrito([]);
            }
          } catch (err) {
            console.error('Error al cargar carrito del backend:', err);
            setCarrito([]);
          }
        } else {
          const carritoLocal = localStorage.getItem(CARRITO_INVITADO_KEY);
          setCarrito(carritoLocal ? JSON.parse(carritoLocal) : []);
        }
      } catch (err) {
        console.error('Error inicializando carrito:', err);
        setCarrito([]);
      } finally {
        setLoading(false);
      }
    };

    inicializarCarrito();
  }, []);

  const agregarProducto = async (producto) => {
    const productoId = producto.id;
    const existe = carrito.find(item => (item.id || item.productoId) === productoId);
    let nuevoCarrito;
    let cantidadAEnviar = 1;

    if (existe) {
      nuevoCarrito = carrito.map(item =>
        (item.id || item.productoId) === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      cantidadAEnviar = existe.cantidad + 1;
    } else {
      nuevoCarrito = [...carrito, { 
        productoId: productoId,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1 
      }];
      cantidadAEnviar = 1;
    }

    setCarrito(nuevoCarrito);

    if (isLoggedIn) {
      try {
        await carritoService.agregarProducto(productoId, cantidadAEnviar);
      } catch (err) {
        console.error('Error al agregar producto:', err);
      }
    } else {
      localStorage.setItem(CARRITO_INVITADO_KEY, JSON.stringify(nuevoCarrito));
    }
  };

  const eliminarProducto = async (id) => {
    const nuevoCarrito = carrito.filter(item => (item.id || item.productoId) !== id);

    if (isLoggedIn) {
      try {
        await carritoService.eliminarProducto(id);
        setCarrito(nuevoCarrito);
      } catch (err) {
        console.error('Error al eliminar producto:', err);
      }
    } else {
      setCarrito(nuevoCarrito);
      localStorage.setItem(CARRITO_INVITADO_KEY, JSON.stringify(nuevoCarrito));
    }
  };

  const actualizarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(id);
      return;
    }

    const nuevoCarrito = carrito.map(item =>
      (item.id || item.productoId) === id ? { ...item, cantidad: nuevaCantidad } : item
    );

    setCarrito(nuevoCarrito);

    if (isLoggedIn) {
      try {
        await carritoService.actualizarProducto(id, nuevaCantidad);
      } catch (err) {
        console.error('Error al actualizar cantidad:', err);
      }
    } else {
      localStorage.setItem(CARRITO_INVITADO_KEY, JSON.stringify(nuevoCarrito));
    }
  };

  const vaciarCarrito = async () => {
    if (isLoggedIn) {
      try {
        await carritoService.vaciarCarrito();
        setCarrito([]);
      } catch (err) {
        console.error('Error al vaciar carrito:', err);
      }
    } else {
      setCarrito([]);
      localStorage.removeItem(CARRITO_INVITADO_KEY);
    }
  };

  const descargarCarritoInvitado = () => {
    localStorage.removeItem(CARRITO_INVITADO_KEY);
    setCarrito([]);
  };

  const getTotalItems = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider value={{ 
      carrito,
      isLoggedIn,
      currentUser,
      loading,
      agregarProducto, 
      eliminarProducto, 
      actualizarCantidad,
      vaciarCarrito,
      descargarCarritoInvitado,
      getTotalItems
    }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}