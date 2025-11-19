import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/RegistroUsuario.css';

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
    comuna: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es obligatorio.';
    }

    const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!formData.correo1 || formData.correo1.length > 100 || !emailPattern.test(formData.correo1)) {
      newErrors.correo1 = 'Correo inválido o no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com máximo 100 caracteres.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.correo1 === formData.correo1.trim())) {
      setErrors({ correo1: "El correo ya está registrado" });
      return;
    }

    usuarios.push({
      nombre: formData.nombre.trim(),
      correo1: formData.correo1.trim(),
      password1: formData.password1,
      region: formData.region,
      comuna: formData.comuna
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioNombre", formData.nombre.trim());

    alert("Registro exitoso. Serás redirigido a la página principal.");
    navigate("/");
  };

  return (
    <div className="registro-contenedor">
      <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
        <img src={`${process.env.PUBLIC_URL}/imagenes/logotienda.png`} alt="Logo Librería SciFiTerror" style={{ width: '250px', height: 'auto', marginBottom: '0.5rem' }} />
        <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#112d4e' }}>Librería SciFiTerror</div>
      </div>

      <div className="form-titulo">Registro de usuario</div>
      <form onSubmit={handleSubmit} noValidate>
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

        <div className="form-group">
          <label htmlFor="telefono">Teléfono <span style={{ fontWeight: 400, color: '#888' }}>(opcional)</span></label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Ej: +56912345678"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '1.2rem', marginBottom: '2.2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label htmlFor="region" style={{ marginBottom: '5px', display: 'block' }}>Región</label>
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
            <label htmlFor="comuna" style={{ marginBottom: '5px', display: 'block' }}>Comuna</label>
            <select
              id="comuna"
              name="comuna"
              value={formData.comuna}
              onChange={handleChange}
              style={{ width: '100%' }}
              className={errors.comuna ? 'is-invalid' : ''}
            >
              <option value="">Seleccione la comuna...</option>
              {/* Todas las comunas van aquí - por brevedad, incluyo solo Región Metropolitana */}
              <optgroup label="Región Metropolitana de Santiago">
                <option value="santiago">Santiago</option>
                <option value="cerrillos">Cerrillos</option>
                <option value="cerro_navia">Cerro Navia</option>
                <option value="conchali">Conchalí</option>
                <option value="el_bosque">El Bosque</option>
                <option value="estacion_central">Estación Central</option>
                <option value="huechuraba">Huechuraba</option>
                <option value="independencia">Independencia</option>
                <option value="la_cisterna">La Cisterna</option>
                <option value="la_floresta">La Florida</option>
                <option value="la_granja">La Granja</option>
                <option value="la_pintana">La Pintana</option>
                <option value="la_reina">La Reina</option>
                <option value="las_condes">Las Condes</option>
                <option value="lo_barnechea">Lo Barnechea</option>
                <option value="lo_prado">Lo Prado</option>
                <option value="macul">Macul</option>
                <option value="maipu">Maipú</option>
                <option value="nunoa">Ñuñoa</option>
                <option value="padre_hurtado">Padre Hurtado</option>
                <option value="pedro_aguirre">Pedro Aguirre Cerda</option>
                <option value="penalolen">Peñalolén</option>
                <option value="providencia">Providencia</option>
                <option value="pudahuel">Pudahuel</option>
                <option value="quilicura">Quilicura</option>
                <option value="recoleta">Recoleta</option>
                <option value="rinconada">Rinconada</option>
                <option value="san_borja">San Borja</option>
                <option value="san_jose_de_maipo">San José de Maipo</option>
                <option value="san_miguel">San Miguel</option>
                <option value="san_pedro">San Pedro</option>
                <option value="san_ramon">San Ramón</option>
                <option value="vitacura">Vitacura</option>
                <option value="puente_alto">Puente Alto</option>
              </optgroup>
            </select>
            {errors.comuna && <div className="error-msg">{errors.comuna}</div>}
          </div>
        </div>

        <button type="submit" className="boton">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
