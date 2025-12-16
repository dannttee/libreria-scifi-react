// Comprar.jsx - COMPONENTE REACT
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Comprar.css';
import { procesarPago } from '../servicios/api.js';
import ClimaWidget from './ClimaWidget';

const REGIONES_COMUNAS = {
  "arica_parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "valparaiso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Quilpué", "Villa Alemana", "Limache", "Olmué", "Quillota", "La Calera", "Hijuelas", "Nogales", "La Cruz", "San Antonio", "Cartagena", "El Quisco", "El Tabo", "Algarrobo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "Isla de Pascua"],
  "ohiggins": ["Rancagua", "Machalí", "Graneros", "Mostazal", "Codegua", "Coinco", "Coltauco", "Doñihue", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Requínoa", "Rengo", "San Vicente de Tagua Tagua", "San Fernando", "Chimbarongo", "Nancagua", "Placilla", "Santa Cruz", "Lolol", "Palmilla", "Peralillo", "Pumanque", "Chépica", "Litueche", "Navidad", "Pichilemu", "La Estrella", "Marchigüe"],
  "maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas", "Cauquenes", "Pelluhue", "Chanco"],
  "nuble": ["Chillán", "Chillán Viejo", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Portezuelo", "Pemuco", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Trehuaco", "Yungay"],
  "biobio": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Tomé", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Angol"],
  "araucania": ["Temuco", "Padre Las Casas", "Vilcún", "Cunco", "Melipeuco", "Curacautín", "Lonquimay", "Lautaro", "Perquenco", "Galvarino", "Cholchol", "Carahue", "Saavedra", "Teodoro Schmidt", "Toltén", "Villarrica", "Freire", "Gorbea", "Lanco", "Pitrufquén", "Pucón"],
  "los_rios": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "los_lagos": ["Ancud", "Puerto Montt", "Dalcahue", "Puqueldón", "Queilén", "Quemchi", "Quellón", "Quinchao", "Calbuco", "Cochamó", "Chonchi", "Curaco de Vélez", "Fresia", "Frutillar", "Llanquihue", "Maullín", "Los Muermos", "Puerto Varas", "Castro", "Osorno", "Puerto Octay", "Río Negro", "Purranque", "Puyehue", "San Juan de la Costa", "San Pablo"],
  "aysen": ["Coihaique", "Cisnes", "Guaitecas", "Cochrane", "Aysén", "Río Ibáñez", "Tortel", "Gonzalo Corvez"],
  "magallanes": ["Punta Arenas", "Puerto Natales", "Torres del Paine", "Porvenir", "Primavera", "Timaukel", "Cabo de Hornos", "Antártica Chilena"],
  "metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Padre Hurtado", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Recoleta", "Rinconada", "San Borja", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Vitacura", "Puente Alto"]
};

export default function Comprar() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    indicaciones: '',
  });
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    cargarCarrito();
    cargarDatosGuardados();
  }, []);

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
    const totalCalculado = carritoGuardado.reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );
    setTotal(totalCalculado);
  };

  const cargarDatosGuardados = () => {
    const datosTemp = JSON.parse(localStorage.getItem('datosCompraTemporal'));
    if (datosTemp) {
      setFormData(datosTemp);
      if (datosTemp.region && REGIONES_COMUNAS[datosTemp.region]) {
        setComunas(REGIONES_COMUNAS[datosTemp.region]);
      }
      localStorage.removeItem('datosCompraTemporal');
    }
  };

  const validarCorreo = (email) => {
    const dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosValidos.some((dominio) =>
      email.toLowerCase().endsWith(dominio)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'region' && REGIONES_COMUNAS[value]) {
      setComunas(REGIONES_COMUNAS[value]);
      setFormData((prev) => ({ ...prev, comuna: '' }));
    }
  };

  const aplicarDescuento = () => {
    alert('Función de descuento disponible próximamente');
  };

  // INTEGRADO CON BACKEND 
  const procesarCompra = async (e) => {
    e.preventDefault();

    // VALIDACIÓN 1: Carrito vacío
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // VALIDACIÓN 2: Email inválido
    if (!validarCorreo(formData.email)) {
      localStorage.setItem(
        'datosFormularioError',
        JSON.stringify({
          ...formData,
          razonError:
            '❌ Correo inválido - Solo se aceptan dominios @duoc.cl, @profesor.duoc.cl o @gmail.com',
        })
      );
      navigate('/pago-error');
      return;
    }

    // VALIDACIÓN 3: Campos incompletos
    if (
      !formData.calle ||
      !formData.region ||
      !formData.comuna ||
      !formData.nombre ||
      !formData.apellidos
    ) {
      localStorage.setItem(
        'datosFormularioError',
        JSON.stringify({
          ...formData,
          razonError:
            '❌ Campos incompletos - Por favor completa todos los datos requeridos',
        })
      );
      navigate('/pago-error');
      return;
    }

    // ID de pedido que se usa en TODO el flujo (backend pagos + localStorage)
    const pedidoId = Date.now(); 

    // COMPRA EXITOSA (pedido local)
    const compra = {
      pedidoId, 
      codigoOrden: `ORD#${pedidoId}`, 
      id: pedidoId, 

      fecha: new Date().toLocaleDateString('es-ES'),
      cliente: `${formData.nombre} ${formData.apellidos}`,
      email: formData.email,
      direccion: {
        calle: formData.calle,
        departamento: formData.departamento,
        region: formData.region,
        comuna: formData.comuna,
        indicaciones: formData.indicaciones,
      },
      productos: carrito,
      total: total,
    };

    // Guardar compra en localStorage con pedidoId numérico
    let compras = JSON.parse(localStorage.getItem('compras')) || [];
    compras.push(compra);
    localStorage.setItem('compras', JSON.stringify(compras));
    localStorage.removeItem('carrito');
    localStorage.removeItem('datosFormularioError'); // ya es compra válida

    // llamar al microservicio de pagos
    try {
      
      const pagoRespuesta = await procesarPago(
        pedidoId,
        total,
        'TarjetaCredito'
      ); // POST /api/v1/pagos/procesar/{pedidoId}
      console.log('Pago procesado en backend:', pagoRespuesta);
    } catch (error) {
      console.error('Error al procesar el pago en el backend:', error);
    }


    navigate('/pago-correcto');
  };

  const scrollFormulario = () => {
    document
      .getElementById('formCheckout')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="checkout-container">
        <div className="checkout-grid">
          {/* LADO IZQUIERDO */}
          <div className="checkout-left">
            <h2>Carrito de compra</h2>
            <p className="checkout-subtitle">
              Completa la siguiente información
            </p>

            <table className="tabla-checkout">
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
                {carrito.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#999',
                      }}
                    >
                      El carrito está vacío
                    </td>
                  </tr>
                ) : (
                  carrito.map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <img
                          src={`/imagenes/${producto.imagen}`}
                          alt={producto.nombre}
                          style={{ width: '50px', height: 'auto' }}
                        />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString()}</td>
                      <td>{producto.cantidad}</td>
                      <td>
                        $
                        {(
                          producto.precio * producto.cantidad
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="descuento-section">
              <input
                type="text"
                placeholder="Ingrese código de descuento"
                className="input-descuento"
              />
              <button
                type="button"
                className="btn-aplicar"
                onClick={aplicarDescuento}
              >
                Aplicar
              </button>
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className="resumen-box">
            <div style={{ marginBottom: '20px' }}>
                <ClimaWidget />
            </div>
            <h3>Total</h3>
            <p className="total-price">${total.toLocaleString()}</p>

            <button
              type="button"
              className="btn-comprar-visible"
              onClick={scrollFormulario}
            >
              Comprar ahora ${total.toLocaleString()}
            </button>

            <form id="formCheckout" onSubmit={procesarCompra}>
              <h3>Información del cliente</h3>
              <p className="form-subtitle">
                Completa la siguiente información
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label>Nombre*</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellidos*</label>
                  <input
                    type="text"
                    name="apellidos"
                    placeholder="García"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Correo*{' '}
                  <small style={{ color: '#999' }}>
                    (Dominio: @duoc.cl, @profesor.duoc.cl o @gmail.com)
                  </small>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@duoc.cl"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <h3 className="form-title">
                Dirección de entrega de los productos
              </h3>
              <p className="form-subtitle">
                Ingrese dirección de forma ordenada
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label>Calle*</label>
                  <input
                    type="text"
                    name="calle"
                    placeholder="Calle"
                    value={formData.calle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Departamento (opcional)</label>
                  <input
                    type="text"
                    name="departamento"
                    placeholder="Ej: 405"
                    value={formData.departamento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label
                    htmlFor="region"
                    style={{ marginBottom: '5px', display: 'block' }}
                  >
                    Región*
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%' }}
                  >
                    <option value="">Seleccione la región...</option>
                    <option value="arica_parinacota">
                      Región de Arica y Parinacota
                    </option>
                    <option value="tarapaca">Región de Tarapacá</option>
                    <option value="antofagasta">
                      Región de Antofagasta
                    </option>
                    <option value="atacama">Región de Atacama</option>
                    <option value="coquimbo">Región de Coquimbo</option>
                    <option value="valparaiso">Región de Valparaíso</option>
                    <option value="ohiggins">
                      Región del Libertador General Bernardo O'Higgins
                    </option>
                    <option value="maule">Región del Maule</option>
                    <option value="nuble">Región de Ñuble</option>
                    <option value="biobio">Región del Biobío</option>
                    <option value="araucania">Región de La Araucanía</option>
                    <option value="los_rios">Región de Los Ríos</option>
                    <option value="los_lagos">Región de Los Lagos</option>
                    <option value="aysen">Región de Aysén</option>
                    <option value="magallanes">
                      Región de Magallanes y de la Antártica Chilena
                    </option>
                    <option value="metropolitana">
                      Región Metropolitana de Santiago
                    </option>
                  </select>
                </div>

                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label
                    htmlFor="comuna"
                    style={{ marginBottom: '5px', display: 'block' }}
                  >
                    Comuna*
                  </label>
                  <select
                    id="comuna"
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%' }}
                  >
                    <option value="">Seleccione la comuna...</option>
                    {comunas.map((comuna) => (
                      <option
                        key={comuna}
                        value={comuna.toLowerCase().replace(/\s+/g, '_')}
                      >
                        {comuna}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Indicaciones para la entrega (opcional)</label>
                <textarea
                  name="indicaciones"
                  placeholder="Ej: Entre calle, color del edificio, no tiene timbre..."
                  value={formData.indicaciones}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn-pagar-checkout">
                💳 Pagar ahora ${total.toLocaleString()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
