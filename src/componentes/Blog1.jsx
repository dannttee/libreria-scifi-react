import React from 'react';
import '../estilos/Blogs.css';

export default function Blog1() {
  // Datos del blog
  const blogData = {
    titulo: 'CURIOSIDAD DE LA TIENDA',
    imagenAlt: 'Portada del libro El arte de asustar',
    imagen: '/images/el-arte-de-asustar.jpg',
    parrafos: [
      '¿Sabías que "El arte de asustar" fue el libro más vendido en Puente Alto durante Halloween? Nuestra librería reúne a los autores más inquietantes del género terror y ciencia ficción.',
      'Este singular fenómeno ocurrió gracias a una combinación única de factores: la creciente popularidad del género de terror, una campaña promocional especial en nuestras sucursales durante el mes de octubre, y por supuesto, el creciente interés de la comunidad local en relatos que exploran lo desconocido y lo oscuro.',
      '"El arte de asustar" capturó la atención de los lectores con su mezcla magistral de suspense y terror psicológico, con relatos escritos por autores reconocidos internacionalmente, muchos de ellos con presencia en eventos de terror que realizamos en la tienda.',
      'En Librería SciFiTerror nos enorgullece ser el epicentro cultural para los amantes de la literatura inquietante. Este éxito no solo refleja una tendencia global, sino que confirma el vínculo especial que hemos establecido con nuestra comunidad local, fomentando un espacio para el encuentro con los relatos que desafían lo ordinario.'
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
             src="imagenes/el arte de asustar.png" 
             alt="Reunión del club de lectura SciFiTerror" 
             loading="lazy"
            />
          </div>
        </article>
      </main>
    </>
  );
}
