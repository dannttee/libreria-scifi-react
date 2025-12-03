import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/PagoCorrecto.css';
import { obtenerPagoPorPedido } from '../servicios/api.js';

export default function PagoCorrecto() {
  const navigate = useNavigate();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);

  // Info de pago del backend
  const [pago, setPago] = useState(null);
  const [loadingPago, setLoadingPago] = useState(false);
  const [errorPago, setErrorPago] = useState(null);

  useEffect(() => {
    const init = async () => {
      const compras = JSON.parse(localStorage.getItem('compras')) || [];

      if (compras.length === 0) {
        navigate('/');
        return;
      }

      const ultimaCompra = compras[compras.length - 1];
      setCompra(ultimaCompra);
      setLoading(false);

      // 1) Determinar el id de pedido que entiende el backend (DEBE ser numérico)
      //    Asegúrate de guardar el id del pedido del backend en alguno de estos campos
      const rawPedidoId =
        ultimaCompra.pedidoId ??
        ultimaCompra.backendId ??
        ultimaCompra.id;

      const pedidoIdBackend = Number(rawPedidoId);

      // Si no es un número válido, no llamamos al backend
      if (!Number.isFinite(pedidoIdBackend)) {
        console.warn(
          'pedidoIdBackend no es numérico. Valor recibido:',
          rawPedidoId
        );
        setErrorPago(
          'No se pudo obtener la información de pago: identificador de pedido no válido.'
        );
        setPago(null);
        return;
      }

      // 2) Llamada al backend para obtener info de pago por pedidoId numérico
      try {
        setLoadingPago(true);
        const pagoBackend = await obtenerPagoPorPedido(pedidoIdBackend);
        setPago(pagoBackend);
        setErrorPago(null);
      } catch (err) {
        console.error('Error obteniendo información de pago:', err);
        setErrorPago(
          'No se pudo obtener la información de pago desde el servidor.'
        );
        setPago(null);
      } finally {
        setLoadingPago(false);
      }
    };

    init();
  }, [navigate]);

  const irAlCarrito = () => {
    navigate('/carrito');
  };

  const irAlInicio = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Cargando...
      </div>
    );
  }

  if (!compra) {
    return null;
  }

  const [nombre, ...apellidos] = compra.cliente.split(' ');

  // Código de orden “bonito” para mostrar al usuario
  const codigoOrdenVisible = compra.codigoOrden ?? `ORD#${compra.id}`;

  return (
    <>
    
      <div className="container">
        {/* HEADER DE ÉXITO */}
        <div className="header success">
          <div className="check-icon">✅</div>
          <h1>Se ha realizado la compra</h1>
          <div className="order-number">
            Código orden: {codigoOrdenVisible}
          </div>
        </div>

        {/* INFORMACIÓN DEL CLIENTE */}
        <div className="section">
          <h3>Información cliente</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Nombre:</label>
              <p>{nombre || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Apellido:</label>
              <p>{apellidos.join(' ') || 'N/A'}</p>
            </div>
            <div className="info-item full-width">
              <label>Correo:</label>
              <p>{compra.email}</p>
            </div>
          </div>
        </div>

        {/* DIRECCIÓN DE ENTREGA */}
        <div className="section">
          <h3>Dirección de entrega de los productos</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Calle:</label>
              <p>{compra.direccion.calle || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Departamento:</label>
              <p>{compra.direccion.departamento || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Región:</label>
              <p>{compra.direccion.region || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Comuna:</label>
              <p>{compra.direccion.comuna || 'N/A'}</p>
            </div>
            <div className="info-item full-width">
              <label>Indicaciones:</label>
              <p>{compra.direccion.indicaciones || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* TABLA DE PRODUCTOS */}
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
              {compra.productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={`${process.env.PUBLIC_URL}/imagenes/${p.imagen}`}
                      alt={p.nombre}
                      style={{ width: '50px', height: 'auto' }}
                    />
                  </td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString()}</td>
                  <td>{p.cantidad}</td>
                  <td>${(p.precio * p.cantidad).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL PAGADO */}
        <div className="total-section">
          <h2>Total pagado:</h2>
          <p className="total-amount">
            ${compra.total.toLocaleString()}
          </p>
        </div>

        {/* INFO DE PAGO DESDE EL BACKEND */}
        <div className="section">
          <h3>Información de pago (backend)</h3>
          {loadingPago && <p>Cargando información de pago...</p>}
          {errorPago && <p className="error-msg">{errorPago}</p>}
          {pago && !errorPago && (
            <div className="info-grid">
              <div className="info-item">
                <label>ID Pago:</label>
                <p>{pago.id}</p>
              </div>
              <div className="info-item">
                <label>Estado:</label>
                <p>{pago.estado || 'APROBADO'}</p>
              </div>
              <div className="info-item full-width">
                <label>Fecha pago:</label>
                <p>{pago.fecha || pago.fechaPago || 'N/A'}</p>
              </div>
            </div>
          )}
        </div>

        {/* BOTONES */}
        <div className="buttons">
          <button className="btn-secondary" onClick={irAlCarrito}>
            Volver al carrito
          </button>
          <button className="btn-success" onClick={irAlInicio}>
            Volver al inicio
          </button>
        </div>
      </div>
    </>
  );
}
