import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<div>PRODUCTOS - Por crear</div>} />
        <Route path="/nosotros" element={<div>NOSOTROS - Por crear</div>} />
        <Route path="/blogs" element={<div>BLOGS - Por crear</div>} />
        <Route path="/contacto" element={<div>CONTACTO - Por crear</div>} />
        <Route path="/login" element={<div>LOGIN - Por crear</div>} />
        <Route path="/registro" element={<div>REGISTRO - Por crear</div>} />
        <Route path="/carrito" element={<div>CARRITO - Por crear</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;