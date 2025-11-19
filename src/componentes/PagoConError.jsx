import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/PagoConError.css';

export function PagoConError() {
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [razonError, setRazonError] = useState('');

  useEffect(() => {
    cargarDatosCompraError();
    // eslint-disable-next-line
  }, []);

  // CARGAR DATOS DE LA COMPRA CON ERROR 
  const cargarDatosCompraError = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    const datosFormularioError = JSON.parse(localStorage.getItem('datosFormularioError')) || {};
    
    if (carritoGuardado.length === 0) {
      alert('No hay carrito registrado');
      navigate('/');
      return;
    }

    setCarrito(carritoGuardado);
    setDatosFormulario(datosFormularioError);
    
    const razon = datosFormularioError.razonError || '❌ Correo inválido o datos incompletos';
    setRazonError(razon);
  };

  // REINTENTAR COMPRA 
  const reintentar = () => {
    localStorage.setItem('datosCompraTemporal', JSON.stringify(datosFormulario));
    localStorage.removeItem('datosFormularioError');
    navigate('/comprar');
  };

  // IR AL CARRITO 
  const irAlCarrito = () => {
    navigate('/carrito');
  };

  // IR AL INICIO
  const irAlInicio = () => {
    localStorage.removeItem('datosFormularioError');
    navigate('/');
  };

  // CÁLCULOS 
  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio * producto.cantidad;
  });

  return (
    <main>
      <div className="container">
        <div className="header error">
          <div className="error-icon">❌</div>
          <h1>Error en la compra</h1>
          <p className="error-message">Lo sentimos, hubo un problema procesando tu compra</p>
        </div>

        {/* INFORMACIÓN DEL CLIENTE */}
        <div className="section">
          <h3>Información del cliente</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Nombre:</label>
              <p>{datosFormulario.nombre || ''}</p>
            </div>
            <div className="info-item">
              <label>Apellido:</label>
              <p>{datosFormulario.apellidos || ''}</p>
            </div>
            <div className="info-item full-width">
              <label>Correo:</label>
              <p>{datosFormulario.email || ''}</p>
            </div>
          </div>
        </div>

        {/* DIRECCIÓN DE ENTREGA */}
        <div className="section">
          <h3>Dirección de entrega de los productos</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Calle:</label>
              <p>{datosFormulario.calle || 'No especificado'}</p>
            </div>
            <div className="info-item">
              <label>Departamento:</label>
              <p>{datosFormulario.departamento || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Región:</label>
              <p>{datosFormulario.region || 'No especificado'}</p>
            </div>
            <div className="info-item">
              <label>Comuna:</label>
              <p>{datosFormulario.comuna || 'No especificado'}</p>
            </div>
            <div className="info-item full-width">
              <label>Indicaciones:</label>
              <p>{datosFormulario.indicaciones || 'Ninguna'}</p>
            </div>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="section">
          <h3>Productos</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.length > 0 ? (
                carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <img 
                        src={`./imagenes/${producto.imagen}`} 
                        alt={producto.nombre}
                        style={{ width: '60px', height: 'auto' }}
                      />
                    </td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toLocaleString()}</td>
                    <td>{producto.cantidad}</td>
                    <td>${(producto.precio * producto.cantidad).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No hay productos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* RAZÓN DEL ERROR */}
        <div className="error-section">
          <h2>Razón del error:</h2>
          <div className="error-details">
            <p>{razonError}</p>
          </div>
        </div>

        {/* TOTAL */}
        <div className="total-section">
          <h3>Total: ${total.toLocaleString()}</h3>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="buttons-container">
          <button className="btn btn-reintentar" onClick={reintentar}>
            🔄 Reintentar compra
          </button>
          <button className="btn btn-secondary" onClick={irAlCarrito}>
            Volver al carrito
          </button>
          <button className="btn btn-tertiary" onClick={irAlInicio}>
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}

export default PagoConError;
