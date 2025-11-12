import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './estilos/App.css';
import './estilos/Header.css';
import './estilos/Footer.css';
import './estilos/Carrito.css';
import './estilos/Pages.css';
import './estilos/Formularios.css';
import './estilos/Botones.css';
import './estilos/Blogs.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Index from './componentes/index'; 
import Productos from './componentes/Productos';
import Carrito from './componentes/Carrito';
import Categorias from './componentes/Categorias';
import Blogs from './componentes/Blogs';
import Blog1 from './componentes/Blog1';
import Blog2 from './componentes/Blog2';
import Ofertas from './componentes/Ofertas';
import Contacto from './componentes/Contacto';
import IniciarSesion from './componentes/IniciarSesion';
import RegistroUsuario from './componentes/RegistroUsuario';
import Nosotros from './componentes/Nosotros';
import ProductoDetalle from './componentes/ProductoDetalle';
import Comprar from './componentes/Comprar';
import PagoConError from './componentes/PagoConError';
import PagoCorrecto from './componentes/PagoCorrecto';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Index />} />  {}
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog1" element={<Blog1 />} />
          <Route path="/blog2" element={<Blog2 />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/comprar" element={<Comprar />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/pago-correcto" element={<PagoCorrecto />} />
          <Route path="/pago-error" element={<PagoConError />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />

          
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
