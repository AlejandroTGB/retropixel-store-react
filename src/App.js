import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import Productos from './pages/productos/Productos';
import Nosotros from './pages/nosotros/Nosotros';
import Blog from './pages/blog/Blog';
import DetalleBlog from './pages/detalleBlog/DetalleBlog';
import Contacto from './pages/contacto/Contacto';
import Login from './pages/login/Login';
import Registro from './pages/registro/Registro';
import Carrito from './pages/carrito/Carrito';
import Admin from './pages/admin/Admin';

function App() {
  return (
<ProductosProvider>
  <CarritoProvider>
    <Router basename="/retropixel-store-react">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </Router>
  </CarritoProvider>
</ProductosProvider>
  );
}

export default App;