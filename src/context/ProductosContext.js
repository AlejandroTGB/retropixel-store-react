import { createContext, useContext, useState } from 'react';
import productos from '../data/productos.json';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productosState, setProductosState] = useState(productos);

  const agregarProducto = (nuevoProducto) => {
    setProductosState([...productosState, nuevoProducto]);
  };

  const eliminarProducto = (id) => {
    setProductosState(productosState.filter(p => p.id !== id));
  };

  const actualizarProducto = (id, productoActualizado) => {
    setProductosState(productosState.map(p => 
      p.id === id ? { ...p, ...productoActualizado } : p
    ));
  };

  const value = {
    productos: productosState,
    setProductos: setProductosState,
    agregarProducto,
    eliminarProducto,
    actualizarProducto
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