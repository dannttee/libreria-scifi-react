import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../estilos/ProductoDetalle.css';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Base de datos de todos los productos
  const todosLosProductos = useMemo(() => [
    {
      id: 'dune',
      nombre: 'dune',
      autor: 'Frank Herbert',
      precio: 9092,
      descripcion: '"Dune" es una epopeya de ciencia ficción que se desarrolla en el árido planeta Arrakis, vital por su especia Melange. Paul Atreides, heredero de una casa noble, se enfrenta a traiciones, profecías y al choque de culturas y religiones.',
      img_delantera: 'DUNE.jpg',
      img_trasera: 'DUNE_back.jpg',
    },
    {
      id: 'frankenstein',
      nombre: 'Frankenstein',
      autor: 'Mary Shelley',
      precio: 10500,
      descripcion: 'La clásica novela gótica relata la obsesión del joven científico Victor Frankenstein por el límite entre la vida y la muerte.',
      img_delantera: 'FRANKENSTEIN.jpg',
      img_trasera: 'FRANKENSTEIN_back.jpg',
    },
    {
      id: 'it',
      nombre: 'It',
      autor: 'Stephen King',
      precio: 7793,
      descripcion: 'En "It", un grupo de amigos de la infancia se enfrenta a un mal ancestral que acecha el pueblo de Derry cada 27 años.',
      img_delantera: 'it.jpg',
      img_trasera: 'IT_back.jpg',
    },
    {
      id: 'neuromante',
      nombre: 'Neuromante nº 01',
      autor: 'William Gibson',
      precio: 13990,
      descripcion: 'Obra fundamental del cyberpunk, presenta un futuro dominado por corporaciones, hackers y la inteligencia artificial.',
      img_delantera: 'NEUROMANTE.jpg',
      img_trasera: 'NEUROMANTE_back.jpg',
    },
    {
      id: 'problema tres cuerpos',
      nombre: 'El problema de los tres cuerpos',
      autor: 'Cixin Liu',
      precio: 14990,
      descripcion: 'Esta novela china narra el primer contacto con una civilización alienígena y el impacto global que ello provoca.',
      img_delantera: 'El problema de los tres cuerpos.jpg',
      img_trasera: 'El problema de los tres cuerpos_back.jpg',
    },
    {
      id: 'llamada cthulhu',
      nombre: 'La llamada de Cthulhu',
      autor: 'H.P. Lovecraft',
      precio: 9990,
      descripcion: 'El relato que consolidó el mitológico universo de Lovecraft, donde un horror ancestral y cósmico se cierne sobre la humanidad.',
      img_delantera: 'La llamada de Cthulhu.jpg',
      img_trasera: 'La llamada de Cthulhu_back.jpg',
    },
    {
      id: '1984',
      nombre: '1984',
      autor: 'George Orwell',
      precio: 7692,
      descripcion: '"1984" es una visión estremecedora de un Estado totalitario, donde la vigilancia constante del Gran Hermano domina.',
      img_delantera: '1984.jpg',
      img_trasera: '1984_back.jpg',
    },
    {
      id: 'cronicas marcianas',
      nombre: 'Crónicas Marcianas',
      autor: 'Ray Bradbury',
      precio: 12500,
      descripcion: 'Una colección de relatos líricos y poéticos que narran la colonización de Marte.',
      img_delantera: 'Crónicas Marcianas.jpg',
      img_trasera: 'Crónicas Marcianas_back.jpg',
    },
    {
      id: 'exorcista',
      nombre: 'El Exorcista',
      autor: 'William Peter Blatty',
      precio: 11500,
      descripcion: 'Novela de horror sobrenatural basada en hechos reales.',
      img_delantera: 'El Exorcista.jpg',
      img_trasera: 'El Exorcista_back.jpg',
    },
    {
      id: 'la noche de los muertos vivientes',
      nombre: 'La noche de los muertos vivientes',
      autor: 'John Russo',
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
      descripcion: 'Segunda parte de la trilogía "All Souls".',
      img_delantera: 'La Sombra de la Noche.jpg',
      img_trasera: 'La Sombra de la Noche_back.jpg',
    },
    {
      id: 'fahrenheit 451',
      nombre: 'Fahrenheit 451',
      autor: 'Ray Bradbury',
      precio: 10990,
      descripcion: 'En una sociedad donde los libros están prohibidos y son incendiados.',
      img_delantera: 'Fahrenheit451.jpg',
      img_trasera: 'Fahrenheit451_back.jpg',
    },
    {
      id: 'soy leyenda',
      nombre: 'Soy Leyenda',
      autor: 'Richard Matheson',
      precio: 11800,
      descripcion: 'Una plaga convierte a la humanidad en criaturas vampíricas.',
      img_delantera: 'SoyLeyenda.jpg',
      img_trasera: 'SoyLeyenda_back.jpg',
    },
    {
      id: 'cementerio animales',
      nombre: 'Cementerio de animales',
      autor: 'Stephen King',
      precio: 12000,
      descripcion: 'Stephen King lleva el terror a la esfera familiar.',
      img_delantera: 'CementerioAnimales.jpg',
      img_trasera: 'CementerioAnimales_back.jpg',
    },
    {
      id: 'resplandor',
      nombre: 'El resplandor',
      autor: 'Stephen King',
      precio: 10900,
      descripcion: 'Jack Torrance acepta cuidar el Hotel Overlook durante el invierno.',
      img_delantera: 'ElResplandor.jpg',
      img_trasera: 'ElResplandor_back.jpg',
    },
    {
      id: 'androide ovejas electricas',
      nombre: '¿Sueñan los androides con ovejas eléctricas?',
      autor: 'Philip K. Dick',
      precio: 13200,
      descripcion: 'En un mundo devastado por la guerra, Rick Deckard debe "retirar" a unos androides.',
      img_delantera: '¿Sueñan los androides con ovejas eléctricas.jpg',
      img_trasera: '¿Sueñan los androides con ovejas eléctricas_back.jpg',
    },
    {
      id: 'la carretera',
      nombre: 'La Carretera',
      autor: 'Cormac McCarthy',
      precio: 10600,
      descripcion: 'Padre e hijo atraviesan paisajes devastados por una catástrofe desconocida.',
      img_delantera: 'LaCarretera.jpg',
      img_trasera: 'LaCarretera_back.jpg',
    },
    {
      id: 'metro 2033',
      nombre: 'Metro 2033',
      autor: 'Dmitry Glukhovsky',
      precio: 12800,
      descripcion: 'Tras una guerra nuclear, los supervivientes de Moscú viven bajo tierra.',
      img_delantera: 'Metro2033.jpg',
      img_trasera: 'Metro2033_back.jpg',
    },
    {
      id: 'hombre ilustrado',
      nombre: 'El hombre ilustrado',
      autor: 'Ray Bradbury',
      precio: 13700,
      descripcion: 'Colección de cuentos unificados por el enigma de un misterioso hombre.',
      img_delantera: 'ElHombreIlustrado.jpg',
      img_trasera: 'ElHombreIlustrado_back.jpg',
    },
    {
      id: 'hyperion',
      nombre: 'Hyperion',
      autor: 'Dan Simmons',
      precio: 14300,
      descripcion: 'Siete peregrinos cuentan sus historias en el camino hacia el misterioso planeta Hyperion.',
      img_delantera: 'Hyperion.jpg',
      img_trasera: 'Hyperion_back.jpg',
    },
  ], []);

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

  useEffect(() => {
    setImageLoaded(false);
    const prod = todosLosProductos.find((p) => p.id === id);
    setProducto(prod);
    setCurrentImageIndex(0);
    actualizarContador();
  }, [id, todosLosProductos, actualizarContador]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAgregarAlCarrito = (e) => {
    e.preventDefault();
    if (!producto) return;

    let carrito = obtenerCarrito();
    const index = carrito.findIndex((item) => item.id === producto.id);

    if (index >= 0) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        autor: producto.autor,
        precio: producto.precio,
        imagen: producto.img_delantera,
        cantidad: cantidad,
      });
    }

    guardarCarrito(carrito);
    actualizarContador();
    alert(`✅ ${cantidad} unidad(es) de ${producto.nombre} agregada(s) al carrito!`);
    setCantidad(1);
  };

  const cambiarImagen = (index) => {
    setImageLoaded(false);
    setCurrentImageIndex(index);
  };

  const irAnterior = () => {
    setImageLoaded(false);
    setCurrentImageIndex(currentImageIndex === 0 ? 1 : 0);
  };

  const irSiguiente = () => {
    setImageLoaded(false);
    setCurrentImageIndex(currentImageIndex === 1 ? 0 : 1);
  };

  if (!producto) {
    return (
      <main>
        <div className="container my-5">
          <h2>Producto no encontrado</h2>
        </div>
      </main>
    );
  }

  const relacionados = todosLosProductos
    .filter((p) => p.id !== producto.id)
    .slice(0, 3);

  const imagenActual =
    currentImageIndex === 0 ? producto.img_delantera : producto.img_trasera;

  return (
    <main>
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-7">
            <div className="image-slider-container" style={{ position: 'relative' }}>
              {!imageLoaded && (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '400px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    zIndex: 1,
                    fontSize: '14px',
                    color: '#666',
                  }}
                >
                  Cargando imagen...
                </div>
              )}

              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${imagenActual}`}
                alt={`${producto.nombre} - Imagen ${currentImageIndex + 1}`}
                onLoad={handleImageLoad}
                style={{
                  width: '100%',
                  height: 'auto',
                  opacity: imageLoaded ? 1 : 0.3,
                  transition: 'opacity 0.3s ease-in-out',
                  borderRadius: '8px',
                  display: 'block',
                }}
              />

              <div
                className="slider-arrow left-arrow"
                role="button"
                tabIndex="0"
                onClick={irAnterior}
              >
                &#10094;
              </div>

              <div
                className="slider-arrow right-arrow"
                role="button"
                tabIndex="0"
                onClick={irSiguiente}
              >
                &#10095;
              </div>
            </div>

            <div className="miniatures-container" style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${producto.img_delantera}`}
                alt="Portada"
                style={{
                  width: '56px',
                  height: '56px',
                  border: currentImageIndex === 0 ? '3px solid #667eea' : '1px solid #ddd',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onClick={() => cambiarImagen(0)}
              />
              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${producto.img_trasera}`}
                alt="Contraportada"
                style={{
                  width: '56px',
                  height: '56px',
                  border: currentImageIndex === 1 ? '3px solid #667eea' : '1px solid #ddd',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onClick={() => cambiarImagen(1)}
              />
            </div>
          </div>

          <div className="col-md-5">
            <h2 className="mb-0">{producto.nombre}</h2>
            <div className="text-muted mb-2">{producto.autor}</div>
            <h3 className="mb-3">${producto.precio.toLocaleString()}</h3>
            <p style={{ fontSize: '0.96rem' }}>{producto.descripcion}</p>

            <form onSubmit={handleAgregarAlCarrito}>
              <div className="mb-3">
                <label htmlFor="cantidad" className="form-label">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cantidad"
                  min="1"
                  max="99"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <button type="submit" className="btn-agregar w-100">
                Añadir al carrito
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-5 mb-4" />

        <h5 className="mb-3">Productos relacionados</h5>
        <div className="productos-relacionados" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {relacionados.map((rel) => (
            <div key={rel.id} className="producto-item" style={{ textAlign: 'center' }}>
              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${rel.img_delantera}`}
                alt={rel.nombre}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
              />
              <h6>{rel.nombre}</h6>
              <div className="text-muted small">{rel.autor}</div>
              <div className="text-primary" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                ${rel.precio.toLocaleString()}
              </div>
              <a href={`/producto/${rel.id}`} className="btn-ver-detalle" style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#667eea', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}>
                Ver detalle
              </a>
            </div>
          ))}
        </div>
      </div>

      <div id="cart-count" style={{ display: 'none' }}>
        0
      </div>
    </main>
  );
}

export default ProductoDetalle;
