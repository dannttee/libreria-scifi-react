import React, { useState, useEffect } from 'react';
import '../estilos/Categorias.css';

function Categorias() {
  const [categoriaActual, setCategoriaActual] = useState('Ciencia ficción');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Datos de productos
  const productosCategoria = {
    "Ciencia ficción": [
      {
        id: 'dune',
        nombre: 'Dune',
        autor: 'Frank Herbert',
        precio: 9092,
        imagen: './imagenes/DUNE.jpg'
      },
      {
        id: 'neuromante',
        nombre: 'Neuromante nº 01',
        autor: 'William Gibson',
        precio: 13990,
        imagen: './imagenes/NEUROMANTE.jpg'
      },
      {
        id: 'problema-tres-cuerpos',
        nombre: 'El problema de los tres cuerpos',
        autor: 'Cixin Liu',
        precio: 14990,
        imagen: './imagenes/El problema de los tres cuerpos.jpg'
      },
      {
        id: 'cronicas-marcianas',
        nombre: 'Crónicas Marcianas',
        autor: 'Ray Bradbury',
        precio: 12500,
        imagen: './imagenes/Crónicas Marcianas.jpg'
      },
      {
        id: 'fahrenheit-451',
        nombre: 'Fahrenheit 451',
        autor: 'Ray Bradbury',
        precio: 10990,
        imagen: './imagenes/Fahrenheit451.jpg'
      },
      {
        id: 'soy-leyenda',
        nombre: 'Soy Leyenda',
        autor: 'Richard Matheson',
        precio: 11800,
        imagen: './imagenes/SoyLeyenda.jpg'
      },
      {
        id: 'androide-ovejas-electricas',
        nombre: '¿Sueñan los androides con ovejas eléctricas?',
        autor: 'Philip K. Dick',
        precio: 13200,
        imagen: './imagenes/¿Sueñan los androides con ovejas eléctricas.jpg'
      },
      {
        id: 'metro-2033',
        nombre: 'Metro 2033',
        autor: 'Dmitry Glukhovsky',
        precio: 12800,
        imagen: './imagenes/Metro2033.jpg'
      },
      {
        id: 'hombre-ilustrado',
        nombre: 'El hombre ilustrado',
        autor: 'Ray Bradbury',
        precio: 13700,
        imagen: './imagenes/ElHombreIlustrado.jpg'
      },
      {
        id: 'hyperion',
        nombre: 'Hyperion',
        autor: 'Dan Simmons',
        precio: 14300,
        imagen: './imagenes/Hyperion.jpg'
      }
    ],
    "Terror": [
      {
        id: 'frankenstein',
        nombre: 'Frankenstein',
        autor: 'Mary Shelley',
        precio: 10500,
        imagen: './imagenes/FRANKENSTEIN.jpg'
      },
      {
        id: 'it',
        nombre: 'It',
        autor: 'Stephen King',
        precio: 7793,
        imagen: './imagenes/it.jpg'
      },
      {
        id: 'llamada-cthulhu',
        nombre: 'La llamada de Cthulhu',
        autor: 'H.P. Lovecraft',
        precio: 9990,
        imagen: './imagenes/La llamada de Cthulhu.jpg'
      },
      {
        id: 'exorcista',
        nombre: 'El Exorcista',
        autor: 'William Peter Blatty',
        precio: 11500,
        imagen: './imagenes/El Exorcista.jpg'
      },
      {
        id: 'noche-muertos-vivientes',
        nombre: 'La noche de los muertos vivientes',
        autor: 'John Russo',
        precio: 9990,
        imagen: './imagenes/La noche de los muertos vivientes.jpg'
      },
      {
        id: 'cementerio-animales',
        nombre: 'Cementerio de animales',
        autor: 'Stephen King',
        precio: 12000,
        imagen: './imagenes/CementerioAnimales.jpg'
      },
      {
        id: 'resplandor',
        nombre: 'El resplandor',
        autor: 'Stephen King',
        precio: 10900,
        imagen: './imagenes/ElResplandor.jpg'
      }
    ],
    "Novelas": [
      {
        id: '1984',
        nombre: '1984',
        autor: 'George Orwell',
        precio: 7692,
        imagen: './imagenes/1984.jpg'
      },
      {
        id: 'sombra-noche',
        nombre: 'La Sombra de la Noche / Shadow of Night',
        autor: 'Deborah Harkness',
        precio: 13500,
        imagen: './imagenes/La Sombra de la Noche.jpg'
      },
      {
        id: 'la-carretera',
        nombre: 'La Carretera',
        autor: 'Cormac McCarthy',
        precio: 10600,
        imagen: './imagenes/LaCarretera.jpg'
      }
    ]
  };

  // Actualizar contador del carrito
  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  };

  // Filtrar categoría
  const filtrarCategoria = (categoria) => {
    setCategoriaActual(categoria);
    const productos = productosCategoria[categoria] || [];
    setProductosFiltrados(productos);
  };

  // Agregar al carrito
  const agregarAlCarrito = (id, nombre, precio, imagen) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const productoExistente = carrito.find(p => p.id === id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`${nombre} agregado al carrito`);
  };

  // Cargar al montar
  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  // Filtrar cuando cambia categoría
  useEffect(() => {
    filtrarCategoria(categoriaActual);
  }, [categoriaActual, filtrarCategoria]);


  return (
    <div className="container">
      <div className="categories-header">
        <h1>Categorías de Productos</h1>
        <p>Descubre nuestras categorías de libros</p>
      </div>

      {/* Grid de categorías */}
      <div className="categories-grid">
        {Object.keys(productosCategoria).map((categoria) => {
          const iconos = {
            'Ciencia ficción': '🚀',
            'Terror': '👻',
            'Novelas': '📖'
          };

          const descripciones = {
            'Ciencia ficción': 'Viajes espaciales y futuros imaginarios',
            'Terror': 'Historias que helan la sangre',
            'Novelas': 'Obras literarias imprescindibles'
          };

          return (
            <div
              key={categoria}
              className="category-card"
              onClick={() => setCategoriaActual(categoria)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-icon">{iconos[categoria]}</div>
              <h3>{categoria}</h3>
              <p>{descripciones[categoria]}</p>
            </div>
          );
        })}
      </div>

      {/* Productos */}
      <div className="selected-category">
        <h2 id="categoryTitle">
          📚 Categoría: {categoriaActual} ({productosFiltrados.length} productos)
        </h2>
        
        <div className="products-grid" id="productsContainer">
          {productosFiltrados.length === 0 ? (
            <p>No hay productos en esta categoría</p>
          ) : (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="product-card">
                <div className="product-image">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    onError={(e) => (e.target.src = './imagenes/placeholder.jpg')}
                  />
                </div>
                <div className="product-info">
                  <h3>{producto.nombre}</h3>
                  <p className="autor">{producto.autor}</p>
                  <div className="product-footer">
                    <span className="price">
                      ${producto.precio.toLocaleString()}
                    </span>
                    <button
                      className="btn-add-cart"
                      onClick={() =>
                        agregarAlCarrito(
                          producto.id,
                          producto.nombre,
                          producto.precio,
                          producto.imagen
                        )
                      }
                    >
                      🛒 Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div id="cart-count" style={{ display: 'none' }}>0</div>
    </div>
  );
}

export default Categorias;
