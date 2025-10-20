import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? styles.active : '';
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>RetroPixel Store</h1>
        </div>
        
        <nav>
          <ul className={styles.navList}>
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/productos" className={isActive('/productos')}>Juegos</Link></li>
            <li><Link to="/nosotros" className={isActive('/nosotros')}>Nosotros</Link></li>
            <li><Link to="/blogs" className={isActive('/blogs')}>Blog</Link></li>
            <li><Link to="/contacto" className={isActive('/contacto')}>Contacto</Link></li>
            <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
            <li><Link to="/registro" className={isActive('/registro')}>Registro</Link></li>
            <li><Link to="/carrito" className={isActive('/carrito')}>🛒</Link></li>
          </ul>
        </nav>
    
      </div>
    </header>
  );
}