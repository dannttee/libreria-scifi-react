import React, { useState, useEffect } from 'react';
import '../estilos/Ofertas.css';

function Ofertas() {
  const [productosEnOferta] = useState([
    {
      id: 'dune',
      nombre: 'Dune',
      autor: 'Frank Herbert',
      categoria: 'Ciencia ficción',
      precioOriginal: 12990,
      precioOferta: 9092,
      descuento: 30,
      imagen: './imagenes/DUNE.jpg',
      stock: true,
      etiqueta: 'OFERTA'
    },
    {
      id: '1984',
      nombre: '1984',
      autor: 'George Orwell',
      categoria: 'Novelas',
      precioOriginal: 10990,
      precioOferta: 7692,
      descuento: 30,
      imagen: './imagenes/1984.jpg',
      stock: true,
      etiqueta: 'OFERTA'
    },
    {
      id: 'it',
      nombre: 'It',
      autor: 'Stephen King',
      categoria: 'Terror',
      precioOriginal: 11990,
      precioOferta: 7793,
      descuento: 35,
      imagen: './imagenes/it.jpg',
      stock: true,
      etiqueta: 'OFERTA'
    }
  ]);

  const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadTotal = carrito.reduce((total, p) => total + p.cantidad, 0);
    const contadorElement = document.getElementById('cart-count');
    if (contadorElement) {
      contadorElement.textContent = cantidadTotal;
    }
  };

  const agregarAlCarrito = (productoId) => {
    const producto = productosEnOferta.find(p => p.id === productoId);

    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        autor: producto.autor,
        precio: producto.precioOferta,
        precioOriginal: producto.precioOriginal,
        cantidad: 1,
        imagen: producto.imagen,
        descuento: producto.descuento
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    alert(`✅ ${producto.nombre} añadido al carrito!`);
  };

  useEffect(() => {
    actualizarContador();
  }, []);

  return (
    <section className="ofertas-section">
      <div className="ofertas-header">
        <h1>🎉 Ofertas Especiales</h1>
        <p>Descuentos increíbles en nuestros libros de ciencia ficción y terror</p>
      </div>

      <div id="ofertas-grid" className="ofertas-grid">
        {productosEnOferta.map((producto) => (
          <div key={producto.id} className="producto-card">
            <div className="producto-imagen">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                onError={(e) => (e.target.src = './imagenes/placeholder.jpg')}
              />
              {producto.etiqueta && (
                <span className="oferta-badge">{producto.etiqueta}</span>
              )}
            </div>
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p className="autor">Por: {producto.autor}</p>
              <p className="categoria">{producto.categoria}</p>
              <div className="precios">
                <span className="precio-oferta">
                  ${producto.precioOferta.toLocaleString()}
                </span>
                <span className="precio-original">
                  ${producto.precioOriginal.toLocaleString()}
                </span>
              </div>
              <div className="descuento-tag">
                <span className="descuento-porcentaje">-{producto.descuento}%</span>
              </div>
              <p className="stock">✅ Stock Disponible</p>
              <button
                className="btn-agregar"
                onClick={() => agregarAlCarrito(producto.id)}
              >
                🛒 Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="info-ofertas">
        <div className="info-box">
          <h3>⏰ Vigencia de Ofertas</h3>
          <p>Nuestras ofertas son válidas mientras dure el stock disponible. ¡No esperes más!</p>
        </div>
        <div className="info-box">
          <h3>🎁 Combina Ofertas</h3>
          <p>Compra 2 o más productos en oferta y obtén envío gratis a cualquier parte del país.</p>
        </div>
        <div className="info-box">
          <h3>💳 Formas de Pago</h3>
          <p>Aceptamos todas las tarjetas de crédito, débito y transferencia bancaria.</p>
        </div>
      </div>

      <div id="cart-count" style={{ display: 'none' }}>
        0
      </div>
    </section>
  );
}

export default Ofertas;
