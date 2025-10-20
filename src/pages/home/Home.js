import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useProductos } from "../../context/ProductosContext";

export default function Home() {
    const { productos } = useProductos();
    const productosDestacados = productos.slice(0, 3);

    const handleAgregarCarrito = (producto) => {
        alert(`${producto.nombre} agregado al carrito!`);
    };

    return (
        <main className={styles.main}>
            <section className={styles.heroHomepage}>
                <div className={styles.container}>
                    <h2>Revive la magia de los videojuegos clásicos</h2>
                    <p>Descubre nuestra colección de consolas retro, juegos legendarios y accesorios vintage. ¡La nostalgia gaming te espera!</p>
                    <Link to="/productos" className={styles.btnPrimary}>Ver Juegos</Link>
                    </div>
            </section>

            <section className={styles.productosDestacados}>
                <div className={styles.container}>
                    <h2>Productos Destacados</h2>
                    <div className={styles.productosGrid}>
                    {productosDestacados.map(producto => (
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
    )
}