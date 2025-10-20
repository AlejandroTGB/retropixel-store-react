import { Link } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext";
import styles from "./Productos.module.css";

export default function Productos() {
  const { productos } = useProductos();

  const handleAgregarCarrito = (producto) => {
    alert(`${producto.nombre} agregado al carrito!`);
  };

  return (
    <main className={styles.main}>
      <section className={styles.heroProductos}>
        <div className={styles.container}>
          <h2>Catálogo de Juegos Retro</h2>
          <p>Descubre nuestra colección completa de clásicos atemporales. Desde arcade legendarios hasta RPGs épicos.</p>
        </div>
      </section>

      <section className={styles.productosSection}>
        <div className={styles.container}>
          <h2>Todos Nuestros Productos</h2>
          <div className={styles.productosGrid}>
            {productos.map(producto => (
              <article key={producto.id} className={styles.productoCard}>
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p className={styles.precio}>${producto.precio.toLocaleString()}</p>
                <p className={styles.descripcion}>{producto.descripcion}</p>
                <button
                  className={styles.btnSecondary}
                  onClick={() => handleAgregarCarrito(producto)}
                >
                  Agregar al Carrito
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}