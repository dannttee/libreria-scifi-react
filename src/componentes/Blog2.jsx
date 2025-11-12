import React, { useState, useEffect } from 'react';
import '../estilos/Blogs.css';

export default function Blog2() {
  // Datos del blog
  const blogData = {
    titulo: 'CURIOSIDAD DE LA TIENDA',
    imagenAlt: 'Reunión del club de lectura SciFiTerror',
    imagen: '/images/reunion.jpg',
    parrafos: [
      'Nuestro club de lectura "SciFiTerror" ha reunido a más de 100 apasionados fans del género terror y ciencia ficción en reuniones presenciales en Santiago. Estas sesiones se han convertido en un espacio clave para el intercambio de ideas, debate y descubrimiento literario.',
      'En la última sesión, los participantes exploraron temas fascinantes como la presencia de alienígenas y fantasmas en la literatura moderna, desde clásicos hasta las obras más contemporáneas. Esta diversidad mantiene a la comunidad constantemente intrigada y expectante por la próxima lectura.',
      'Además, el club cuenta con una selección especial de los libros favoritos del grupo, disponibles en nuestra tienda, para que nuevos miembros puedan iniciar su viaje en este apasionante universo literario.',
      '¿Quieres ser parte de este espacio? Consulta y suscribete solamente añadiendo tu correo electronico en el sitio web para conocer fechas, horarios y cómo unirte a las futuras reuniones del club de lectura "SciFiTerror".'
    ]
  };

  return (
    <>
      {/* MAIN CONTENT SOLO */}
      <main>
        <article className="caso-blog">
          <div className="caso-detalle">
            <h2 className="caso-titulo">{blogData.titulo}</h2>
            {blogData.parrafos.map((parrafo, index) => (
              <p key={index} className="caso-desc">
                {parrafo}
              </p>
            ))}
          </div>
          <div className="caso-imagen">
            <img 
             src="imagenes/reunion.png" 
             alt="Reunión del club de lectura SciFiTerror" 
             loading="lazy"
            />
          </div>
        </article>
      </main>
    </>
  );
}
