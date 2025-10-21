import styles from './Carrito.module.css';
import { useCarrito } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';

export default function Carrito() {
  const { carrito, eliminarProducto, actualizarCantidad, vaciarCarrito } = useCarrito();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const total = calcularTotal();

  const handleVaciar = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      vaciarCarrito();
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.carritoSection}>
        <div className={styles.container}>
          <h2>Mi Carrito</h2>

          {carrito.length === 0 ? (
            <div className={styles.carritoVacio}>
              <p>Tu carrito está vacío</p>
              <Link to="/productos" className={styles.btnVolver}>Ir a Productos</Link>
            </div>
          ) : (
            <div className={styles.carritoContent}>
              <div className={styles.productosCarrito}>
                <table className={styles.tablaCarrito}>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map(item => (
                      <tr key={item.id}>
                        <td className={styles.nombreProducto}>{item.nombre}</td>
                        <td>${item.precio.toLocaleString()}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value))}
                            className={styles.inputCantidad}
                          />
                        </td>
                        <td className={styles.subtotal}>
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </td>
                        <td>
                          <button
                            onClick={() => eliminarProducto(item.id)}
                            className={styles.btnEliminar}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.resumenCarrito}>
                <div className={styles.resumenBox}>
                  <h3>Resumen de Compra</h3>
                  
                  <div className={styles.resumenRow}>
                    <span>Subtotal:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>

                  <div className={styles.resumenRow}>
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>

                  <div className={styles.resumenRow}>
                    <span>Total Productos:</span>
                    <span>{carrito.reduce((sum, item) => sum + item.cantidad, 0)}</span>
                  </div>

                  <div className={styles.totalFinal}>
                    <span>Total:</span>
                    <span className={styles.precioTotal}>${total.toLocaleString()}</span>
                  </div>

                  <button className={styles.btnComprar}> Proceder al Pago</button>
                  <button onClick={handleVaciar} className={styles.btnVaciar}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}