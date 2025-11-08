import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useProductos } from '../context/ProductosContext';
import { authService } from '../services/authService';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito } = useCarrito();
  const { productos } = useProductos();
  const token = authService.getToken();
  
  let isAdmin = false;
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      isAdmin = decoded.rol === 'admin';
    } catch (err) {
      console.error('Error decodificando token:', err);
    }
  }
  
  const isActive = (path) => location.pathname === path ? styles.active : '';
  const cartCount = carrito.filter(item => productos.find(p => p.id === item.id)).reduce((sum, item) => sum + item.cantidad, 0);
  
  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };
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
            <li><Link to="/blogs" className={isActive('/blogs')}>Blog</Link></li>
            <li><Link to="/contacto" className={isActive('/contacto')}>Contacto</Link></li>
            {!token && (
              <>
                <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
                <li><Link to="/registro" className={isActive('/registro')}>Registro</Link></li>
              </>
            )}
            {token && (
              <>
                {isAdmin && <li><Link to="/admin" className={isActive('/admin')}>Admin</Link></li>}
                <li><button onClick={handleLogout} className={styles.logoutBtn}>Cerrar Sesión</button></li>
              </>
            )}
            <li><Link to="/carrito" className={isActive('/carrito')}>🛒 {cartCount}</Link></li>
          </ul>
        </nav>
    
      </div>
    </header>
  );
}