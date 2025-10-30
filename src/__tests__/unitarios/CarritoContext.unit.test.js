import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../../context/CarritoContext";

describe('CarritoContext', () => {
  test('agrega un producto al carrito', () => {
    const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;
    const { result } = renderHook(() => useCarrito(), { wrapper });

    const producto = { id: 1, nombre: 'Producto Test', precio: 100 };

    act(() => {
      result.current.agregarProducto(producto);
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0]).toMatchObject({ id: 1, cantidad: 1 });
  });
});