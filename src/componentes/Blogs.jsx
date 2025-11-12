import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Blogs.css';

export default function Blogs() {
  const navigate = useNavigate();

  // Datos de los blogs
  const blogs = [
    {
      id: 1,
      numero: '#1',
      titulo: 'CURIOSIDAD DE LA TIENDA',
      descripcion: '¿Sabías que "El arte de asustar" fue el libro más vendido en Puente Alto durante Halloween? Nuestra librería reúne los autores más inquietantes del género terror y ciencia ficción. ¡Descubre qué llevó a este título al número uno!',
      imagen: '/imagenes/el arte de asustar.png',
      imagenAlt: 'Portada El arte de asustar',
      ruta: '/blog1'
    },
    {
      id: 2,
      numero: '#2',
      titulo: 'CURIOSIDAD DE LA TIENDA',
      descripcion: 'Nuestro club de lectura "SciFiTerror" ha reunido más de 100 fans en reuniones presenciales en Santiago. La última sesión debatió sobre alienígenas y fantasmas en la literatura moderna. ¡Conoce los libros favoritos del grupo y cómo participar!',
      imagen: '/imagenes/reunion.png',
      imagenAlt: 'Reunión club SciFiTerror',
      ruta: '/blog2'
    }
  ];

  const handleVerBlog = (ruta) => {
    navigate(ruta);
  };

  return (
    <>
      {/* MAIN CONTENT SOLO */}
      <main>
        <h2 className="titulo-blogs" style={{ color: '#112d4e' }}>
          NOTICIAS IMPORTANTES
        </h2>

        {blogs.map((blog) => (
          <section key={blog.id} className="caso-blog">
            <div className="caso-detalle">
              <div className="caso-titulo">{blog.numero} {blog.titulo}</div>
              <div className="caso-desc">{blog.descripcion}</div>
              <button 
                className="caso-boton" 
                onClick={() => handleVerBlog(blog.ruta)}
              >
                VER
              </button>
            </div>
            <div className="caso-imagen">
              <img 
                src={blog.imagen} 
                alt={blog.imagenAlt}
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
