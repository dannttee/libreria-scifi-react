import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Productos.css';

function Productos() {
  const [productos] = useState([
    {
      id: 'dune',
      nombre: 'Dune',
      autor: 'Frank Herbert',
      precio: 9092,
      descuento: 30,
      precioOriginal: 12990,
      categoria: 'Ciencia ficción',
      descripcion: '"Dune" es una epopeya de ciencia ficción que se desarrolla en el árido planeta Arrakis, vital por su especia Melange.',
      img_delantera: 'DUNE.jpg',
      img_trasera: 'DUNE_back.jpg',
    },
    {
      id: 'frankenstein',
      nombre: 'Frankenstein',
      autor: 'Mary Shelley',
      precio: 10500,
      categoria: 'Terror',
      descripcion: 'La clásica novela gótica relata la obsesión del joven científico Victor Frankenstein por el límite entre la vida y la muerte.',
      img_delantera: 'FRANKENSTEIN.jpg',
      img_trasera: 'FRANKENSTEIN_back.jpg',
    },
    {
      id: 'it',
      nombre: 'It',
      autor: 'Stephen King',
      precio: 7793,
      descuento: 35,
      precioOriginal: 11990,
      categoria: 'Terror',
      descripcion: 'En "It", un grupo de amigos de la infancia se enfrenta a un mal ancestral que acecha el pueblo de Derry.',
      img_delantera: 'it.jpg',
      img_trasera: 'IT_back.jpg',
    },
    {
      id: 'neuromante',
      nombre: 'Neuromante nº 01',
      autor: 'William Gibson',
      precio: 13990,
      categoria: 'Ciencia ficción',
      descripcion: 'Obra fundamental del cyberpunk, presenta un futuro dominado por corporaciones, hackers y la inteligencia artificial.',
      img_delantera: 'NEUROMANTE.jpg',
      img_trasera: 'NEUROMANTE_back.jpg',
    },
    {
      id: 'problema tres cuerpos',
      nombre: 'El problema de los tres cuerpos',
      autor: 'Cixin Liu',
      precio: 14990,
      categoria: 'Ciencia ficción',
      descripcion: 'Esta novela china narra el primer contacto con una civilización alienígena.',
      img_delantera: 'El problema de los tres cuerpos.jpg',
      img_trasera: 'El problema de los tres cuerpos_back.jpg',
    },
    {
      id: 'llamada cthulhu',
      nombre: 'La llamada de Cthulhu',
      autor: 'H.P. Lovecraft',
      precio: 9990,
      categoria: 'Terror',
      descripcion: 'El relato que consolidó el mitológico universo de Lovecraft.',
      img_delantera: 'La llamada de Cthulhu.jpg',
      img_trasera: 'La llamada de Cthulhu_back.jpg',
    },
    {
      id: '1984',
      nombre: '1984',
      autor: 'George Orwell',
      precio: 7692,
      descuento: 30,
      precioOriginal: 10990,
      categoria: 'Novelas',
      descripcion: '"1984" es una visión estremecedora de un Estado totalitario.',
      img_delantera: '1984.jpg',
      img_trasera: '1984_back.jpg',
    },
    {
      id: 'cronicas marcianas',
      nombre: 'Crónicas Marcianas',
      autor: 'Ray Bradbury',
      precio: 12500,
      categoria: 'Ciencia ficción',
      descripcion: 'Una colección de relatos líricos y poéticos que narran la colonización de Marte.',
      img_delantera: 'Crónicas Marcianas.jpg',
      img_trasera: 'Crónicas Marcianas_back.jpg',
    },
    {
      id: 'exorcista',
      nombre: 'El Exorcista',
      autor: 'William Peter Blatty',
      precio: 11500,
      categoria: 'Terror',
      descripcion: 'Novela de horror sobrenatural basada en hechos reales.',
      img_delantera: 'El Exorcista.jpg',
      img_trasera: 'El Exorcista_back.jpg',
    },
    {
      id: 'la noche de los muertos vivientes',
      nombre: 'La noche de los muertos vivientes',
      autor: 'John Russo',
      categoria: 'Terror',
      precio: 9990,
      descripcion: 'Libro y película pioneros del género zombie.',
      img_delantera: 'La noche de los muertos vivientes.jpg',
      img_trasera: 'La noche de los muertos vivientes_back.jpg',
    },
    {
      id: 'sombra noche',
      nombre: 'La Sombra de la Noche / Shadow of Night',
      autor: 'Deborah Harkness',
      precio: 13500,
      categoria: 'Novelas',
      descripcion: 'Segunda parte de la trilogía "All Souls".',
      img_delantera: 'La Sombra de la Noche.jpg',
      img_trasera: 'La Sombra de la Noche_back.jpg',
    },
    {
      id: 'fahrenheit 451',
      nombre: 'Fahrenheit 451',
      autor: 'Ray Bradbury',
      precio: 10990,
      categoria: 'Ciencia ficción',
      descripcion: 'En una sociedad donde los libros están prohibidos y son incendiados.',
      img_delantera: 'Fahrenheit451.jpg',
      img_trasera: 'Fahrenheit451_back.jpg',
    },
    {
      id: 'soy leyenda',
      nombre: 'Soy Leyenda',
      autor: 'Richard Matheson',
      precio: 11800,
      categoria: 'Ciencia ficción',
      descripcion: 'Una plaga convierte a la humanidad en criaturas vampíricas.',
      img_delantera: 'SoyLeyenda.jpg',
      img_trasera: 'SoyLeyenda_back.jpg',
    },
    {
      id: 'cementerio animales',
      nombre: 'Cementerio de animales',
      autor: 'Stephen King',
      precio: 12000,
      categoria: 'Terror',
      descripcion: 'Stephen King lleva el terror a la esfera familiar.',
      img_delantera: 'CementerioAnimales.jpg',
      img_trasera: 'CementerioAnimales_back.jpg',
    },
    {
      id: 'resplandor',
      nombre: 'El resplandor',
      autor: 'Stephen King',
      precio: 10900,
      categoria: 'Terror',
      descripcion: 'Jack Torrance acepta cuidar el Hotel Overlook durante el invierno.',
      img_delantera: 'ElResplandor.jpg',
      img_trasera: 'ElResplandor_back.jpg',
    },
    {
      id: 'androide ovejas electricas',
      nombre: '¿Sueñan los androides con ovejas eléctricas?',
      autor: 'Philip K. Dick',
      precio: 13200,
      categoria: 'Ciencia ficción',
      descripcion: 'En un mundo devastado por la guerra, Rick Deckard debe "retirar" a unos androides.',
      img_delantera: '¿Sueñan los androides con ovejas eléctricas.jpg',
      img_trasera: '¿Sueñan los androides con ovejas eléctricas_back.jpg',
    },
    {
      id: 'la-carretera',
      nombre: 'La Carretera',
      autor: 'Cormac McCarthy',
      precio: 10600,
      categoria: 'Novelas',
      descripcion: 'Padre e hijo atraviesan paisajes devastados.',
      img_delantera: 'LaCarretera.jpg',
      img_trasera: 'LaCarretera_back.jpg',
    },
    {
      id: 'metro 2033',
      nombre: 'Metro 2033',
      autor: 'Dmitry Glukhovsky',
      precio: 12800,
      categoria: 'Ciencia ficción',
      descripcion: 'Tras una guerra nuclear, los supervivientes de Moscú viven bajo tierra.',
      img_delantera: 'Metro2033.jpg',
      img_trasera: 'Metro2033_back.jpg',
    },
    {
      id: 'hombre ilustrado',
      nombre: 'El hombre ilustrado',
      autor: 'Ray Bradbury',
      precio: 13700,
      categoria: 'Ciencia ficción',
      descripcion: 'Colección de cuentos unificados por el enigma de un misterioso hombre.',
      img_delantera: 'ElHombreIlustrado.jpg',
      img_trasera: 'ElHombreIlustrado_back.jpg',
    },
    {
      id: 'hyperion',
      nombre: 'Hyperion',
      autor: 'Dan Simmons',
      precio: 14300,
      categoria: 'Ciencia ficción',
      descripcion: 'Siete peregrinos cuentan sus historias en el camino hacia Hyperion.',
      img_delantera: 'Hyperion.jpg',
      img_trasera: 'Hyperion_back.jpg',
    },
  ]);

  const MAX_CANTIDAD = 99;

  const obtenerCarrito = useCallback(() => {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }, []);

  const guardarCarrito = useCallback((carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, []);

  const actualizarContador = useCallback(() => {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const span = document.getElementById('cart-count');
    if (span) span.textContent = total;
  }, [obtenerCarrito]);

  const agregarAlCarrito = (producto) => {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex((item) => item.id === producto.id);

    if (index >= 0) {
      let nuevaCantidad = carrito[index].cantidad + 1;
      if (nuevaCantidad > MAX_CANTIDAD) {
        alert(`No puede tener más de ${MAX_CANTIDAD} unidades del mismo producto.`);
        return;
      }
      carrito[index].cantidad = nuevaCantidad;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        autor: producto.autor,
        precio: producto.precio,
        imagen: producto.img_delantera,
        cantidad: 1,
      });
    }

    guardarCarrito(carrito);
    actualizarContador();
    alert(`✅ ${producto.nombre} agregado al carrito!`);
  };

  useEffect(() => {
    actualizarContador();
  }, [actualizarContador]);

  return (
    <main>
      <h1 className="form-titulo">PRODUCTOS</h1>
      <section className="listado-productos">
        <div className="grid-productos" id="productos-lista">
          {productos.map((prod) => (
            <article key={prod.id} className="producto">
              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${prod.img_delantera}`}
                alt={`Portada del libro ${prod.nombre}`}
                onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/imagenes/placeholder.jpg`)}
              />
              <Link to={`/producto/${prod.id}`} className="titulo-producto">
                {prod.nombre}
              </Link>
              <span className="atributos">Autor: {prod.autor}</span>
              <span className="precio">${prod.precio.toLocaleString()}</span>
              <button
                className="boton añadir-carrito"
                aria-label={`Añadir ${prod.nombre} al carrito`}
                type="button"
                onClick={() => agregarAlCarrito(prod)}
              >
                Añadir
              </button>
            </article>
          ))}
        </div>
      </section>

      <div id="cart-count" style={{ display: 'none' }}>
        0
      </div>
    </main>
  );
}

export default Productos;
