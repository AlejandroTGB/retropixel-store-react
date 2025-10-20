import { useParams, Link } from "react-router-dom";
import blogs from "../../data/blogs.json";
import styles from "./DetalleBlog.module.css";

export default function DetalleBlog() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h2>Blog no encontrado</h2>
          <Link to="/blogs">← Volver a Blogs</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.navigation}>
        <div className={styles.container}>
          <Link to="/blogs" className={styles.btnBack}>
            ← Volver a Blogs
          </Link>
        </div>
      </section>
      <article className={styles.blogDetail}>
        <div className={styles.container}>
          <header className={styles.blogHeader}>
            <h1>{blog.titulo}</h1>
            <div className={styles.blogMeta}>
              <span>📅 {blog.fecha}</span>
              <span>✍️ Por {blog.autor}</span>
              <span>🏷️ {blog.categoria}</span>
            </div>
          </header>

          <div className={styles.blogImage}>
            <img src={blog.imagen} alt={blog.titulo} />
          </div>

          {blog.precioOffer && (
            <div className={styles.priceBox}>
                <span className={styles.priceOriginal}>${blog.precioOriginal?.toLocaleString()}</span>
                <span className={styles.priceOffer}>${blog.precioOffer.toLocaleString()}</span>
                <span className={styles.discount}>¡{blog.descuento} de descuento!</span>
            </div>
)}

          <div className={styles.blogContent}>
            {blog.contenido.split('\n\n').map((parrafo, index) => {
              if (parrafo.startsWith('##')) {
                return <h2 key={index}>{parrafo.replace('## ', '')}</h2>;
              }
              if (parrafo.startsWith('-')) {
                const items = parrafo.split('\n').map(item => item.replace('- ', ''));
                return (
                  <ul key={index}>
                    {items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                );
              }
              return <p key={index}>{parrafo}</p>;
            })}
          </div>

          <div className={styles.ctaSection}>
            <Link to="/productos" className={styles.btnPrimary}>
              Ver en Tienda
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}