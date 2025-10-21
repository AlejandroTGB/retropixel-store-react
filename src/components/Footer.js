import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const handleEasterEgg = (e) => {
    e.preventDefault();
    alert('🎉 ¡WAOS! 🎉\n¡Encontraste el easter egg secreto de RetroPixel Store!\n🎮 Los verdaderos gamers siempre exploran cada rincón 🕹️');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>🕹️ RetroPixel Store</h3>
            <p>Tu destino favorito para revivir la magia de los videojuegos clásicos.</p>
          </div>

          <div className={styles.footerSection}>
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><Link to="/productos">Juegos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><a href="#" onClick={handleEasterEgg}>🎭 APRETAME SI TE ATREVES</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Contacto</h3>
            <p>📧 info@retropixelstore.com</p>
            <p>📞 +56 9 8765 4321</p>
            <p>📍 Santiago, Chile</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 RetroPixel Store. DuocUC.</p>
        </div>
      </div>
    </footer>
  );
}