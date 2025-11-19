import React, { useEffect } from 'react';
import '../estilos/Index.css'; 

export default function Index() {
  useEffect(() => {
    actualizarContador();
  }, []);

  const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.length;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = contador;
    }
  };

  const productos = [
    { id: 'dune', nombre: 'Dune', autor: 'Frank Herbert', precio: '$12.990', imagen: './imagenes/DUNE.jpg' },
    { id: 'frankenstein', nombre: 'Frankenstein', autor: 'Mary Shelley', precio: '$10.500', imagen: './imagenes/FRANKENSTEIN.jpg' },
    { id: 'it', nombre: 'It', autor: 'Stephen King', precio: '$11.990', imagen: './imagenes/it.jpg' },
    { id: 'neuromante', nombre: 'Neuromante nº 01', autor: 'William Gibson', precio: '$13.990', imagen: './imagenes/NEUROMANTE.jpg' },
    { id: 'problema tres cuerpos', nombre: 'El problema de los tres cuerpos', autor: 'Cixin Liu', precio: '$14.990', imagen: './imagenes/El problema de los tres cuerpos.jpg' },
    { id: 'llamada cthulhu', nombre: 'La llamada de Cthulhu', autor: 'H.P. Lovecraft', precio: '$9.990', imagen: './imagenes/La llamada de Cthulhu.jpg' },
    { id: '1984', nombre: '1984', autor: 'George Orwell', precio: '$10.990', imagen: './imagenes/1984.jpg' },
    { id: 'cronicas marcianas', nombre: 'Crónicas Marcianas', autor: 'Ray Bradbury', precio: '$12.500', imagen: './imagenes/Crónicas Marcianas.jpg' },
    { id: 'exorcista', nombre: 'El Exorcista', autor: 'William Peter Blatty', precio: '$11.500', imagen: './imagenes/El Exorcista.jpg' },
    { id: 'la noche de los muertos vivientes', nombre: 'La noche de los muertos vivientes', autor: 'John Russo', precio: '$9.990', imagen: './imagenes/La noche de los muertos vivientes.jpg' },
    { id: 'sombra noche', nombre: 'La Sombra de la Noche', autor: 'Deborah Harkness', precio: '$13.500', imagen: './imagenes/La Sombra de la Noche.jpg' },
    { id: 'hyperion', nombre: 'Hyperion', autor: 'Dan Simmons', precio: '$14.300', imagen: './imagenes/Hyperion.jpg' }
  ];

  return (
    <main>
      <section className="destacado">
        <div className="info-tienda">
          <h1>TIENDA DE LIBROS</h1>
          <p>
            Nuestra librería es experta en novelas, ciencia ficción y terror.<br />
            Explora nuestro catálogo, compra y disfruta lecturas inolvidables.
          </p>
          <a href="/productos" className="boton">
            <span>🛒</span> Ver productos
          </a>
        </div>
        <div className="foto-tienda">
          <img src="./imagenes/logotienda.png" alt="Interior de la librería SciFiTerror" style={{ maxWidth: '350px' }} />
        </div>
      </section>

      <section className="listado-productos">
        <h2>Productos Destacados</h2>
        <div className="grid-productos">
          {productos.map((producto) => (
            <article key={producto.id} className="producto">
              <img src={producto.imagen} alt={`Portada del libro ${producto.nombre}`} loading="lazy" />
              <a href={`/producto/${producto.id}`} className="titulo-producto">{producto.nombre}</a>
              <p className="atributos">Autor: {producto.autor}</p>
              <p className="precio">{producto.precio}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
