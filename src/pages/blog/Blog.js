import { Link } from "react-router-dom";
import blogs from "../../data/blogs.json";
import styles from "./Blog.module.css";

export default function Blog() {
  return (
    <main className={styles.main}>
      <section className={styles.heroBlog}>
        <div className={styles.container}>
          <h2>RetroPixel Blogs</h2>
          <p>Entérate de las últimas novedades, lanzamientos y eventos relacionados con tus juegos retro favoritos.</p>
        </div>
      </section>

      <section className={styles.blogsSection}>
        <div className={styles.container}>
          <h2>Últimos Artículos</h2>
          <div className={styles.blogsGrid}>
            {blogs.map(blog => (
              <article key={blog.id} className={styles.blogCard}>
                <img src={blog.imagen} alt={blog.titulo} />
                <h3>{blog.titulo}</h3>
                <p className={styles.fecha}>{blog.fecha}</p>
                <p className={styles.resumen}>{blog.resumen}</p>
                <Link 
                  to={`/blogs/${blog.id}`}
                  className={styles.btnSecondary}
                >
                  Leer Más
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}