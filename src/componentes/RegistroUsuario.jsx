import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/RegistroUsuario.css';
import { registrarUsuario } from '../servicios/api.js';

// === REGIONES Y COMUNAS (mismo mapa que en Comprar.jsx) ===
const REGIONES_COMUNAS = {
  arica_parinacota: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  tarapaca: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
  antofagasta: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'],
  atacama: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'],
  coquimbo: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paihuano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'],
  valparaiso: ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Limache', 'Olmué', 'Quillota', 'La Calera', 'Hijuelas', 'Nogales', 'La Cruz', 'San Antonio', 'Cartagena', 'El Quisco', 'El Tabo', 'Algarrobo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'Isla de Pascua'],
  ohiggins: ['Rancagua', 'Machalí', 'Graneros', 'Mostazal', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Requínoa', 'Rengo', 'San Vicente de Tagua Tagua', 'San Fernando', 'Chimbarongo', 'Nancagua', 'Placilla', 'Santa Cruz', 'Lolol', 'Palmilla', 'Peralillo', 'Pumanque', 'Chépica', 'Litueche', 'Navidad', 'Pichilemu', 'La Estrella', 'Marchigüe'],
  maule: ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas', 'Cauquenes', 'Pelluhue', 'Chanco'],
  nuble: ['Chillán', 'Chillán Viejo', 'Bulnes', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Portezuelo', 'Pemuco', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Trehuaco', 'Yungay'],
  biobio: ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualpén', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Tomé', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Lebu', 'Los Álamos', 'Tirúa', 'Angol'],
  araucania: ['Temuco', 'Padre Las Casas', 'Vilcún', 'Cunco', 'Melipeuco', 'Curacautín', 'Lonquimay', 'Lautaro', 'Perquenco', 'Galvarino', 'Cholchol', 'Carahue', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Villarrica', 'Freire', 'Gorbea', 'Lanco', 'Pitrufquén', 'Pucón'],
  los_rios: ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'],
  los_lagos: ['Ancud', 'Puerto Montt', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quemchi', 'Quellón', 'Quinchao', 'Calbuco', 'Cochamó', 'Chonchi', 'Curaco de Vélez', 'Fresia', 'Frutillar', 'Llanquihue', 'Maullín', 'Los Muermos', 'Puerto Varas', 'Castro', 'Osorno', 'Puerto Octay', 'Río Negro', 'Purranque', 'Puyehue', 'San Juan de la Costa', 'San Pablo'],
  aysen: ['Coihaique', 'Cisnes', 'Guaitecas', 'Cochrane', 'Aysén', 'Río Ibáñez', 'Tortel', 'Gonzalo Corvez'],
  magallanes: ['Punta Arenas', 'Puerto Natales', 'Torres del Paine', 'Porvenir', 'Primavera', 'Timaukel', 'Cabo de Hornos', 'Antártica Chilena'],
  metropolitana: [
    'Santiago',
    'Cerrillos',
    'Cerro Navia',
    'Conchalí',
    'El Bosque',
    'Estación Central',
    'Huechuraba',
    'Independencia',
    'La Cisterna',
    'La Florida',
    'La Granja',
    'La Pintana',
    'La Reina',
    'Las Condes',
    'Lo Barnechea',
    'Lo Prado',
    'Macul',
    'Maipú',
    'Ñuñoa',
    'Padre Hurtado',
    'Pedro Aguirre Cerda',
    'Peñalolén',
    'Providencia',
    'Pudahuel',
    'Quilicura',
    'Recoleta',
    'Rinconada',
    'San Borja',
    'San José de Maipo',
    'San Miguel',
    'San Pedro',
    'San Ramón',
    'Vitacura',
    'Puente Alto',
  ],
};

function RegistroUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo1: '',
    correo2: '',
    password1: '',
    password2: '',
    telefono: '',
    region: '',
    comuna: '',
  });

  const [errors, setErrors] = useState({});
  const [comunas, setComunas] = useState([]); // <-- NUEVO

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Si cambia la región, actualizar comunas disponibles
    if (name === 'region') {
      if (REGIONES_COMUNAS[value]) {
        setComunas(REGIONES_COMUNAS[value]);
      } else {
        setComunas([]);
      }
      // resetear comuna seleccionada
      setFormData((prev) => ({ ...prev, comuna: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es obligatorio.';
    }

    const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!formData.correo1 || formData.correo1.length > 100 || !emailPattern.test(formData.correo1)) {
      newErrors.correo1 =
        'Correo inválido o no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com máximo 100 caracteres.';
    }

    if (!formData.correo2 || formData.correo1 !== formData.correo2) {
      newErrors.correo2 = 'Los correos no coinciden.';
    }

    if (!formData.password1 || formData.password1.length < 4 || formData.password1.length > 10) {
      newErrors.password1 = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    if (!formData.password2 || formData.password1 !== formData.password2) {
      newErrors.password2 = 'Las contraseñas no coinciden.';
    }

    if (!formData.region) {
      newErrors.region = 'Por favor seleccione una región.';
    }

    if (!formData.comuna) {
      newErrors.comuna = 'Por favor seleccione una comuna.';
    }

    return newErrors;
  };
  //llamada al backend para registrar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
  nombre: formData.nombre.trim(),
  email: formData.correo1.trim(),
  password: formData.password1,
  telefono: formData.telefono || null,
  region: formData.region,
  comuna: formData.comuna,
};

console.log('Payload que se enviará:', payload);

const respuesta = await registrarUsuario(payload);
console.log('Respuesta JSON registro:', respuesta);

// Ajustado a la respuesta del backend
if (respuesta && respuesta.success) {
  localStorage.setItem('usuarioNombre', formData.nombre.trim());
  alert(respuesta.message || 'Registro exitoso. Ahora puedes iniciar sesión.');
  navigate('/iniciar-sesion');
} else if (respuesta && respuesta.message) {
  alert(respuesta.message);
} else {
  alert('No se pudo registrar el usuario.');
}
  };

  return (
    <div className="registro-contenedor">
      <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
        <img
          src={`${process.env.PUBLIC_URL}/imagenes/logotienda.png`}
          alt="Logo Librería SciFiTerror"
          style={{ width: '250px', height: 'auto', marginBottom: '0.5rem' }}
        />
        <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#112d4e' }}>Librería SciFiTerror</div>
      </div>

      <div className="form-titulo">Registro de usuario</div>
      <form onSubmit={handleSubmit} noValidate>
        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Su nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'is-invalid' : ''}
          />
          {errors.nombre && <div className="error-msg">{errors.nombre}</div>}
        </div>

        {/* Correo 1 */}
        <div className="form-group">
          <label htmlFor="correo1">Correo electrónico</label>
          <input
            type="email"
            id="correo1"
            name="correo1"
            placeholder="ejemplo@gmail.com"
            value={formData.correo1}
            onChange={handleChange}
            className={errors.correo1 ? 'is-invalid' : ''}
          />
          {errors.correo1 && <div className="error-msg">{errors.correo1}</div>}
        </div>

        {/* Correo 2 */}
        <div className="form-group">
          <label htmlFor="correo2">Confirmar correo electrónico</label>
          <input
            type="email"
            id="correo2"
            name="correo2"
            placeholder="Confirme su correo"
            value={formData.correo2}
            onChange={handleChange}
            className={errors.correo2 ? 'is-invalid' : ''}
          />
          {errors.correo2 && <div className="error-msg">{errors.correo2}</div>}
        </div>

        {/* Contraseña 1 */}
        <div className="form-group">
          <label htmlFor="password1">Contraseña</label>
          <input
            type="password"
            id="password1"
            name="password1"
            placeholder="Ingresa una contraseña"
            value={formData.password1}
            onChange={handleChange}
            className={errors.password1 ? 'is-invalid' : ''}
          />
          {errors.password1 && <div className="error-msg">{errors.password1}</div>}
        </div>

        {/* Contraseña 2 */}
        <div className="form-group">
          <label htmlFor="password2">Confirmar contraseña</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirme su contraseña"
            value={formData.password2}
            onChange={handleChange}
            className={errors.password2 ? 'is-invalid' : ''}
          />
          {errors.password2 && <div className="error-msg">{errors.password2}</div>}
        </div>

        {/* Teléfono */}
        <div className="form-group">
          <label htmlFor="telefono">
            Teléfono <span style={{ fontWeight: 400, color: '#888' }}>(opcional)</span>
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Ej: +56912345678"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        {/* Región y Comuna */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '1.2rem',
            marginBottom: '2.2rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label htmlFor="region" style={{ marginBottom: '5px', display: 'block' }}>
              Región
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              style={{ width: '100%' }}
              className={errors.region ? 'is-invalid' : ''}
            >
              <option value="">Seleccione la región...</option>
              <option value="arica_parinacota">Región de Arica y Parinacota</option>
              <option value="tarapaca">Región de Tarapacá</option>
              <option value="antofagasta">Región de Antofagasta</option>
              <option value="atacama">Región de Atacama</option>
              <option value="coquimbo">Región de Coquimbo</option>
              <option value="valparaiso">Región de Valparaíso</option>
              <option value="ohiggins">Región del Libertador General Bernardo O'Higgins</option>
              <option value="maule">Región del Maule</option>
              <option value="nuble">Región de Ñuble</option>
              <option value="biobio">Región del Biobío</option>
              <option value="araucania">Región de La Araucanía</option>
              <option value="los_rios">Región de Los Ríos</option>
              <option value="los_lagos">Región de Los Lagos</option>
              <option value="aysen">Región de Aysén</option>
              <option value="magallanes">Región de Magallanes y de la Antártica Chilena</option>
              <option value="metropolitana">Región Metropolitana de Santiago</option>
            </select>
            {errors.region && <div className="error-msg">{errors.region}</div>}
          </div>

          <div style={{ flex: 1, minWidth: '180px' }}>
            <label htmlFor="comuna" style={{ marginBottom: '5px', display: 'block' }}>
              Comuna
            </label>
            <select
              id="comuna"
              name="comuna"
              value={formData.comuna}
              onChange={handleChange}
              style={{ width: '100%' }}
              className={errors.comuna ? 'is-invalid' : ''}
            >
              <option value="">Seleccione la comuna...</option>
              {comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
            {errors.comuna && <div className="error-msg">{errors.comuna}</div>}
          </div>
        </div>

        <button type="submit" className="boton">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
