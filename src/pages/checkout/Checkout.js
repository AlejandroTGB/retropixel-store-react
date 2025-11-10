import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { useCarrito } from '../../context/CarritoContext';
import { pedidoService } from '../../services/pedidoService';

export default function Checkout() {
  const navigate = useNavigate();
  const { carrito, isLoggedIn, currentUser, vaciarCarrito } = useCarrito();
  
  const [cargandoPedido, setCargandoPedido] = useState(false);
  const [errorPedido, setErrorPedido] = useState(null);
  const [formCheckout, setFormCheckout] = useState({
    nombre: '',
    email: '',
    metodoPago: 'tarjeta'
  });

  useEffect(() => {
    if (carrito.length === 0) {
      navigate('/carrito');
      return;
    }

    if (currentUser) {
      setFormCheckout({
        nombre: currentUser.nombre || '',
        email: currentUser.email || '',
        metodoPago: 'tarjeta'
      });
    }
  }, [currentUser, carrito.length, navigate]);

  const carritoConDetalles = carrito.map(item => {
    return {
      id: item.productoId || item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad
    };
  }).filter(item => item.nombre);

  const calcularTotal = () => {
    return carritoConDetalles.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const handleChangeCheckout = (e) => {
    const { name, value } = e.target;
    setFormCheckout({
      ...formCheckout,
      [name]: value
    });
  };

  const handleConfirmarPedido = async (e) => {
    e.preventDefault();
    setCargandoPedido(true);
    setErrorPedido(null);

    try {
      if (!isLoggedIn) {
        if (!formCheckout.nombre || !formCheckout.email) {
          setErrorPedido('Nombre y email son requeridos');
          setCargandoPedido(false);
          return;
        }
      }

      await pedidoService.crearPedido(
        formCheckout.email,
        formCheckout.nombre,
        formCheckout.metodoPago
      );

      await vaciarCarrito();
      alert('Pedido creado exitosamente');
      navigate('/');
    } catch (err) {
      setErrorPedido(err.response?.data?.mensaje || 'Error al crear el pedido');
      console.error('Error:', err);
    } finally {
      setCargandoPedido(false);
    }
  };

  const total = calcularTotal();

  return (
    <main className={styles.main}>
      <section className={styles.checkoutSection}>
        <div className={styles.container}>
          <h2>Checkout</h2>

          <div className={styles.checkoutContent}>
            <div className={styles.resumenPedido}>
              <h3>Resumen del Pedido</h3>
              
              <div className={styles.productosCheckout}>
                {carritoConDetalles.map(item => (
                  <div key={item.id} className={styles.itemCheckout}>
                    <div className={styles.infoProducto}>
                      <p className={styles.nombreProducto}>{item.nombre}</p>
                      <p className={styles.cantidadProducto}>Cantidad: {item.cantidad}</p>
                    </div>
                    <p className={styles.precioProducto}>
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className={styles.detallesTotal}>
                <div className={styles.fila}>
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={styles.formularioPago}>
              <h3>{isLoggedIn ? 'Método de Pago' : 'Datos de Contacto y Pago'}</h3>
              
              {errorPedido && (
                <div className={styles.mensajeError}>
                  {errorPedido}
                </div>
              )}

              <form onSubmit={handleConfirmarPedido}>
                {!isLoggedIn && (
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formCheckout.email}
                      onChange={handleChangeCheckout}
                      placeholder="tu-email@ejemplo.com"
                      required
                    />
                  </div>
                )}

                {!isLoggedIn && (
                  <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formCheckout.nombre}
                      onChange={handleChangeCheckout}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                )}

                {isLoggedIn && (
                  <div className={styles.formGroup}>
                    <label>Nombre</label>
                    <div className={styles.displayField}>{formCheckout.nombre}</div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="metodoPago">Método de Pago</label>
                  <select
                    id="metodoPago"
                    name="metodoPago"
                    value={formCheckout.metodoPago}
                    onChange={handleChangeCheckout}
                  >
                    <option value="tarjeta">Tarjeta de Crédito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className={styles.btnConfirmar} 
                  disabled={cargandoPedido}
                >
                  {cargandoPedido ? 'Procesando...' : 'Confirmar Pedido'}
                </button>
              </form>

              <button 
                onClick={() => navigate('/carrito')} 
                className={styles.btnVolver}
              >
                Volver al Carrito
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
