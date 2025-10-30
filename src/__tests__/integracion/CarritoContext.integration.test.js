import { render, screen, fireEvent } from '@testing-library/react';
import { CarritoProvider, useCarrito } from '../../context/CarritoContext';
import React from 'react';

function ProductoEjemplo({ producto }) {
  const { agregarProducto } = useCarrito();
  return (
    <div>
      <span>{producto.nombre}</span>
      <button onClick={() => agregarProducto(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
}

function CarritoCantidad() {
  const { carrito } = useCarrito();
  return <span data-testid="carrito-cantidad">{carrito.length}</span>;
}

describe('Integración CarritoContext + Producto', () => {
  test('agrega producto al carrito al hacer clic en el botón', () => {
    const producto = { id: 2, nombre: 'Producto Integración', precio: 150 };

    render(
      <CarritoProvider>
        <ProductoEjemplo producto={producto} />
        <CarritoCantidad />
      </CarritoProvider>
    );

    fireEvent.click(screen.getByText(/agregar al carrito/i));

    expect(screen.getByTestId('carrito-cantidad').textContent).toBe('1');
  });
});
