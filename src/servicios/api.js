const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

// ========= USUARIO =========
export const registrarUsuario = async (userData) => {
  console.log('>>> Llamando backend /usuario/registro con:', userData);
  const res = await fetch(`${API_URL}/usuario/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  console.log('>>> Respuesta HTTP registro:', res.status, res.ok);
  return res.json();
};

export const loginUsuario = async (credentials) => {
  const res = await fetch(`${API_URL}/usuario/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const obtenerPerfil = async (id) => {
  const res = await fetch(`${API_URL}/usuario/perfil/${id}`);
  return res.json();
};

// ========= PRODUCTOS =========
export const obtenerProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const obtenerProductoPorId = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`);
  return res.json();
};

export const buscarProductos = async (titulo) => {
  const res = await fetch(`${API_URL}/productos/buscar/${titulo}`);
  return res.json();
};

// ========= PAGOS =========
export const procesarPago = async (pedidoId, monto, metodoPago) => {
  const params = new URLSearchParams({
    monto: monto.toString(),
    metodoPago: metodoPago,
  });

  const res = await fetch(
    `http://localhost:8080/api/v1/pagos/procesar/${pedidoId}?${params.toString()}`,
    {
      method: 'POST',
    }
  );

  if (!res.ok) {
    throw new Error('Error al procesar pago');
  }

  return res.json(); // aquí recibirías el { success, pago, message, ... }
};
export const obtenerPagoPorPedido = async (pedidoId) => {
  const res = await fetch(`${API_URL}/pagos/pedido/${pedidoId}`);
  return res.json();
};