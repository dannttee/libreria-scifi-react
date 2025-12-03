import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../estilos/ProductoDetalle.css';

const API_BASE = 'http://localhost:8080/api/v1';

function ProductoDetalle() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

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

  // Cargar producto por ID y productos relacionados desde el backend
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setImageLoaded(false);
        setError(false);

        // 1) Producto por id
        const resProducto = await fetch(`${API_BASE}/productos/${id}`);
        if (!resProducto.ok) {
          setError(true);
          setProducto(null);
          return;
        }
        const p = await resProducto.json();

        const productoAdaptado = {
          id: p.id,
          nombre: p.titulo,
          autor: p.autor,
          precio: p.precio,
          descripcion: p.descripcion || '',
          img_delantera: p.imagen,
          img_trasera: p.imagenBack || p.imagen,
        };

        setProducto(productoAdaptado);
        setCurrentImageIndex(0);

        // 2) Lista de productos para "relacionados"
        const resLista = await fetch(`${API_BASE}/productos`);
        if (resLista.ok) {
          const listaJson = await resLista.json(); 
          if (Array.isArray(listaJson.data)) {
            const relacionadosAdaptados = listaJson.data
              .filter((prod) => prod.id !== p.id)
              .slice(0, 3)
              .map((prod) => ({
                id: prod.id,
                nombre: prod.titulo,
                autor: prod.autor,
                precio: prod.precio,
                img_delantera: prod.imagen,
              }));
            setRelacionados(relacionadosAdaptados);
          }
        }

        actualizarContador();
      } catch (e) {
        console.error('Error cargando producto por id:', e);
        setError(true);
      }
    };

    cargarDatos();
  }, [id, actualizarContador]);

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

  if (error) {
    return (
      <main>
        <div className="container my-5">
          <h2>Producto no encontrado</h2>
        </div>
      </main>
    );
  }

  if (!producto) {
    return (
      <main>
        <div className="container my-5">
          <h2>Cargando producto...</h2>
        </div>
      </main>
    );
  }

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

            <div
              className="miniatures-container"
              style={{ marginTop: '12px', display: 'flex', gap: '8px' }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${producto.img_delantera}`}
                alt="Portada"
                style={{
                  width: '56px',
                  height: '56px',
                  border:
                    currentImageIndex === 0 ? '3px solid #667eea' : '1px solid #ddd',
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
                  border:
                    currentImageIndex === 1 ? '3px solid #667eea' : '1px solid #ddd',
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
                  onChange={(e) =>
                    setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                  }
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
        <div
          className="productos-relacionados"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {relacionados.map((rel) => (
            <div key={rel.id} className="producto-item" style={{ textAlign: 'center' }}>
              <img
                src={`${process.env.PUBLIC_URL}/imagenes/${rel.img_delantera}`}
                alt={rel.nombre}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
              />
              <h6>{rel.nombre}</h6>
              <div className="text-muted small">{rel.autor}</div>
              <div
                className="text-primary"
                style={{ fontWeight: 'bold', marginBottom: '8px' }}
              >
                ${rel.precio.toLocaleString()}
              </div>
              <a
                href={`/producto/${rel.id}`}
                className="btn-ver-detalle"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
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
