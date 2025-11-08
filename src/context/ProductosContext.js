import { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productosState, setProductosState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        const productosDelBackend = await productService.obtenerProductos();
        setProductosState(productosDelBackend);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const productoCreado = await productService.crearProducto(nuevoProducto);
      setProductosState([...productosState, productoCreado]);
    } catch (err) {
      console.error('Error al crear producto:', err);
      throw err;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await productService.eliminarProducto(id);
      setProductosState(productosState.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      throw err;
    }
  };

  const actualizarProducto = async (id, productoActualizado) => {
    try {
      const productoActualizadoDelBackend = await productService.actualizarProducto(id, productoActualizado);
      setProductosState(productosState.map(p => 
        p.id === id ? productoActualizadoDelBackend : p
      ));
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      throw err;
    }
  };

  const value = {
    productos: productosState,
    setProductos: setProductosState,
    agregarProducto,
    eliminarProducto,
    actualizarProducto,
    loading,
    error
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider');
  }
  return context;
}