import React, { useEffect } from 'react';
import '../estilos/Nosotros.css';

const Nosotros = () => {
  useEffect(() => {
    // Actualizar contador del carrito al cargar
    actualizarContador();
  }, []);

  const actualizarContador = () => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  };

  const teamMembers = [
    {
      name: 'Dante Muñoz',
      role: 'Desarrollador principal, liderazgo y diseño general del proyecto.'
    },
    {
      name: 'Juan Pérez',
      role: 'Desarrollador frontend y diseñador UX/UI.'
    },
    {
      name: 'María González',
      role: 'Desarrolladora backend y especialista en bases de datos.'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Coordinador de proyecto y encargado de marketing digital.'
    },
    {
      name: 'Andrea López',
      role: 'Especialista en experiencia de usuario y accesibilidad.'
    },
    {
      name: 'Felipe Díaz',
      role: 'Desarrollador full stack y soporte técnico.'
    }
  ];

  return (
    <div className="nosotros-page">
      <main>
        <section className="info-tienda">
          <h1>Nosotros</h1>
          
          <p className="intro-text">
            Bienvenidos a Librería SciFiTerror, tu tienda de confianza especializada en literatura de novelas, ciencia ficción y terror. Nuestro compromiso es ofrecer una amplia selección de títulos para todos los amantes de estos géneros, con un servicio cercano y personalizado.
          </p>

          <h2>Sobre la empresa</h2>
          <p>
            Somos un equipo apasionado que cree en la magia de las historias que nos transportan a mundos nuevos y oscuros. Nuestra misión es crear un espacio donde lectores y lectoras puedan encontrar sus próximas aventuras literarias de forma cómoda y segura.
          </p>

          <h2>Equipo de desarrollo</h2>
          <p>
            Este sitio web ha sido desarrollado por un equipo de profesionales comprometidos con la calidad y la experiencia del usuario. Nuestro equipo está formado por:
          </p>
          
          <ul className="team-list">
            {teamMembers.map((member, index) => (
              <li key={index}>
                <strong>{member.name}:</strong> {member.role}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Nosotros;
