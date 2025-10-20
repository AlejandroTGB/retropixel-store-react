import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import Productos from './pages/productos/Productos';
import Nosotros from './pages/nosotros/Nosotros';
import Blog from './pages/blog/Blog';
import DetalleBlog from './pages/detalleBlog/DetalleBlog';
import Contacto from './pages/contacto/Contacto';

function App() {
  return (
  <ProductosProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<div>LOGIN - Por crear</div>} />
        <Route path="/registro" element={<div>REGISTRO - Por crear</div>} />
        <Route path="/carrito" element={<div>CARRITO - Por crear</div>} />
      </Routes>
      <Footer />
    </Router>
  </ProductosProvider>
  );
}

export default App;