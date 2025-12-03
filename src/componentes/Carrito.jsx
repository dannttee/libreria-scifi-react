import React, { useState, useEffect } from 'react';
import '../estilos/Carrito.css';
import { obtenerProductos } from '../servicios/api.js';

// ===== CONSTANTES =====
const MAX_CANTIDAD = 99;
const IMG_PATH = './imagenes/';
const cupones = {
  SCI10: 0.10,
  TERROR20: 0.20,
  OFERTA5: 0.05,
};

// ===== PRODUCTOS INICIALES (FALLBACK LOCAL) =====
const PRODUCTOS_INICIALES = [
  {
    id: 'dune',
    nombre: 'Dune',
    autor: 'Frank Herbert',
    precio: 9092,
    categoria: 'Ciencia ficción',
    img_delantera: 'DUNE.jpg',
  },
  {
    id: 'frankenstein',
    nombre: 'Frankenstein',
    autor: 'Mary Shelley',
    precio: 10500,
    categoria: 'Terror',
    img_delantera: 'FRANKENSTEIN.jpg',
  },
  {
    id: 'it',
    nombre: 'It',
    autor: 'Stephen King',
    precio: 7793,
    categoria: 'Terror',
    img_delantera: 'it.jpg',
  },
  {
    id: 'neuromante',
    nombre: 'Neuromante nº 01',
    autor: 'William Gibson',
    precio: 13990,
    categoria: 'Ciencia ficción',
    img_delantera: 'NEUROMANTE.jpg',
  },
  {
    id: 'problema-tres-cuerpos',
    nombre: 'El problema de los tres cuerpos',
    autor: 'Cixin Liu',
    precio: 14990,
    categoria: 'Ciencia ficción',
    img_delantera: 'El problema de los tres cuerpos.jpg',
  },
  {
    id: 'llamada-cthulhu',
    nombre: 'La llamada de Cthulhu',
    autor: 'H.P. Lovecraft',
    precio: 9990,
    categoria: 'Terror',
    img_delantera: 'La llamada de Cthulhu.jpg',
  },
  {
    id: '1984',
    nombre: '1984',
    autor: 'George Orwell',
    precio: 7692,
    categoria: 'Novelas',
    img_delantera: '1984.jpg',
  },
  {
    id: 'fahrenheit-451',
    nombre: 'Fahrenheit 451',
    autor: 'Ray Bradbury',
    precio: 10990,
    categoria: 'Ciencia ficción',
    img_delantera: 'Fahrenheit451.jpg',
  },
];

// ===== FUNCIÓN AUXILIAR PARA NORMALIZAR RUTAS =====
const normalizarNombreImagen = (rutaImagen) => {
  // Extrae solo el nombre del archivo, sin rutas
  if (!rutaImagen) return '';
  return rutaImagen.split('/').pop().split('\\').pop();
};


export function Carrito() {
  // ===== ESTADO =====
  const [carrito, setCarrito] = useState([]);
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);

  // ===== EFECTOS =====
  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      const carritoParsed = JSON.parse(carritoGuardado);
      const carritoNormalizado = carritoParsed.map((item) => ({
        ...item,
        imagen: normalizarNombreImagen(item.imagen),
      }));
      setCarrito(carritoNormalizado);
    }
  }, []);

  // Cargar productos desde el backend (microservicio productos)
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos(); // GET /api/v1/productos
        const adaptados = data.map((p) => ({
          id: p.id,
          nombre: p.nombre || p.titulo,
          autor: p.autor,
          precio: p.precio,
          categoria: p.categoria || 'Sin categoría',
          img_delantera:
            normalizarNombreImagen(p.imgDelantera || p.imagenPortada || 'placeholder.jpg'),
        }));
        setProductos(adaptados);
      } catch (error) {
        console.error('Error cargando productos para el carrito:', error);
      }
    };

    cargarProductos();
  }, []);

  // ===== FUNCIONES AUXILIARES =====
  const obtenerCarrito = () => {
    const carritoJSON = localStorage.getItem('carrito');
    return carritoJSON ? JSON.parse(carritoJSON) : [];
  };

  const guardarCarrito = (nuevoCarrito) => {
    const carritoNormalizado = nuevoCarrito.map((item) => ({
      ...item,
      imagen: normalizarNombreImagen(item.imagen),
    }));
    localStorage.setItem('carrito', JSON.stringify(carritoNormalizado));
    setCarrito(carritoNormalizado);
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
  };

  // ===== AGREGAR AL CARRITO =====
  const agregarAlCarrito = (producto, cantidad = 1) => {
    if (cantidad < 1) {
      alert('Debe agregar al menos 1 unidad.');
      return;
    }
    if (cantidad > MAX_CANTIDAD) {
      alert(`No puede agregar más de ${MAX_CANTIDAD} unidades.`);
      return;
    }

    let carritoActual = obtenerCarrito();
    const index = carritoActual.findIndex((item) => item.id === producto.id);

    if (index >= 0) {
      let nuevaCantidad = carritoActual[index].cantidad + cantidad;
      if (nuevaCantidad > MAX_CANTIDAD) {
        alert(`No puede tener más de ${MAX_CANTIDAD} unidades del mismo producto.`);
        return;
      }
      carritoActual[index].cantidad = nuevaCantidad;
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        autor: producto.autor,
        precio: producto.precio,
        imagen: normalizarNombreImagen(producto.img_delantera),
        cantidad,
      });
    }

    guardarCarrito(carritoActual);
    alert(`Se añadió ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
  };

  // ===== MODIFICAR CANTIDAD =====
  const modificarCantidad = (id, cantidad) => {
    let carritoActual = obtenerCarrito();
    const index = carritoActual.findIndex((item) => item.id === id);

    if (index >= 0) {
      if (cantidad < 1) {
        eliminarDelCarrito(id);
        return;
      }
      if (cantidad > MAX_CANTIDAD) {
        alert(`No puede tener más de ${MAX_CANTIDAD} unidades por producto.`);
        return;
      }
      carritoActual[index].cantidad = cantidad;
      guardarCarrito(carritoActual);
    }
  };

  // ===== ELIMINAR DEL CARRITO =====
  const eliminarDelCarrito = (id) => {
    let carritoActual = obtenerCarrito();
    carritoActual = carritoActual.filter((item) => item.id !== id);
    guardarCarrito(carritoActual);
  };

  // ===== APLICAR CUPÓN =====
  const aplicarCupon = () => {
    const codigo = couponCode.toUpperCase().trim();
    if (cupones.hasOwnProperty(codigo)) {
      const descuento = cupones[codigo];
      setDescuentoAplicado(descuento);
      alert(`Cupón aplicado! Tienes un ${descuento * 100}% de descuento.`);
    } else {
      alert('Código de descuento inválido o no reconocido.');
      setDescuentoAplicado(0);
    }
  };

  // ===== LIMPIAR CARRITO =====
  const limpiarCarrito = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
      localStorage.removeItem('carrito');
      setCarrito([]);
      setDescuentoAplicado(0);
      setCouponCode('');
    }
  };

  // ===== IR A COMPRA (mantienes tu flujo actual) =====
  const irACompra = () => {
    if (!carrito || carrito.length === 0) {
      alert('❌ El carrito está vacío. Añade productos antes de ir a pago.');
      return;
    }
    alert('✅ Procediendo al comprar...');
    window.location.href = 'Comprar';
  };

  // ===== CÁLCULOS =====
  const totalOriginal = calcularTotal();
  const totalConDescuento = totalOriginal * (1 - descuentoAplicado);

  // ===== RENDER =====
  return (
    <main>
      <section className="compra-layout">
        {/* PRODUCTOS DISPONIBLES */}
        <div className="compra-productos">
          <h3>Lista de productos</h3>
          <div className="productos-grid">
            {productos.map((prod) => (
              <div key={prod.id} className="producto-compra">
                <img
                  src={`${IMG_PATH}${prod.img_delantera}`}
                  alt={`Portada del libro ${prod.nombre}`}
                />
                <p className="producto-nombre">{prod.nombre}</p>
                <span className="producto-categoria">{prod.categoria}</span>
                <p className="producto-precio">${prod.precio.toLocaleString()}</p>
                <p className="producto-stock">Stock Disponible</p>
                <button
                  className="btn-agregar-compra"
                  onClick={() => agregarAlCarrito(prod, 1)}
                >
                  Añadir
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CARRITO DE COMPRA */}
        <div className="carrito-compra-box">
          <h3>Carrito de Compras</h3>

          {/* TABLA DEL CARRITO */}
          <table className="carrito-tabla-compra">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: 'center',
                      color: '#777',
                      fontSize: '1.1rem',
                      padding: '40px 0',
                    }}
                  >
                    El carrito está vacío.
                  </td>
                </tr>
              ) : (
                carrito.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={`${IMG_PATH}${item.imagen}`}
                        alt={`Portada de ${item.nombre}`}
                        className="tabla-img"
                        onError={(e) => {
                          e.target.src = IMG_PATH + 'placeholder.jpg';
                        }}
                      />
                    </td>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>
                      <input
                        type="number"
                        value={item.cantidad}
                        min="1"
                        max={MAX_CANTIDAD}
                        className="cantidad-input"
                        onChange={(e) =>
                          modificarCantidad(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                    </td>
                    <td>${(item.cantidad * item.precio).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn-eliminar-tabla"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* SECCIÓN DE DESCUENTO */}
          <div className="descuento-section">
            <input
              type="text"
              className="input-descuento"
              placeholder="Ingrese código de descuento"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn-aplicar-descuento" onClick={aplicarCupon}>
              Aplicar
            </button>
          </div>

          {/* TOTAL */}
          <div className="total-row">
            <strong>Total</strong>
            <strong>
              $
              {totalConDescuento.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </strong>
          </div>

          {/* ACCIONES */}
          <div className="carrito-acciones">
            <button className="btn-limpiar-carrito" onClick={limpiarCarrito}>
              Limpiar
            </button>
            <button className="btn-comprar-ahora" onClick={irACompra}>
              Comprar ahora
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Carrito;

