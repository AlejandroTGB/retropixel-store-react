import { createContext, useContext, useState } from 'react';
import productos from '../data/productos.json';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productosState, setProductosState] = useState(productos);

  const value = {
    productos: productosState,
    setProductos: setProductosState,
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