import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Header.css';

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo-container">
          <img 
            src="/imagenes/logotienda.png" 
            alt="Logo Librería Sci-Fi Terror" 
            className="logo-img"
          />
          <span className="logo-text">Librería Sci-Fi Terror</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/categorias">Categorías</Link></li>
          <li><Link to="/ofertas">Ofertas</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/iniciar-sesion">Iniciar Sesión</Link></li>
          <li><Link to="/registro">Registro</Link></li>
          <li><Link to="/carrito" className="carrito-link">Carrito 🛒</Link></li>
        </ul>
      </nav>
    </header>
  );
}
