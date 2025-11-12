import React, { useState, useCallback, useMemo } from 'react';
import '../estilos/Contacto.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const MAX_LENGTHS = useMemo(() => ({
    nombre: 100,
    correo: 100,
    mensaje: 500,
  }), []);

  const validateEmail = useCallback((email) => {
    const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return emailPattern.test(email);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (value.length <= MAX_LENGTHS[name]) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    }
  }, [MAX_LENGTHS, errors]);

  const validateForm = useCallback(() => {
    let newErrors = {};
    let valid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
      valid = false;
    } else if (formData.nombre.trim().length > MAX_LENGTHS.nombre) {
      newErrors.nombre = 'El nombre no puede exceder 100 caracteres.';
      valid = false;
    }

    if (!formData.correo) {
      newErrors.correo = 'El correo es obligatorio.';
      valid = false;
    } else if (formData.correo.length > MAX_LENGTHS.correo) {
      newErrors.correo = 'El correo no puede exceder 100 caracteres.';
      valid = false;
    } else if (!validateEmail(formData.correo)) {
      newErrors.correo = 'Solo se permiten correos con dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.';
      valid = false;
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio.';
      valid = false;
    } else if (formData.mensaje.trim().length > MAX_LENGTHS.mensaje) {
      newErrors.mensaje = 'El mensaje no puede exceder 500 caracteres.';
      valid = false;
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [formData, MAX_LENGTHS, validateEmail]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Formulario válido. Datos:', formData);
      alert('✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!');
      
      setFormData({
        nombre: '',
        correo: '',
        mensaje: '',
      });
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);
    }
  }, [formData, validateForm]);

  return (
    <main>
      <div className="form-contenedor">
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <img
            src={`${process.env.PUBLIC_URL}/imagenes/logotienda.png`}
            alt="Logo Librería SciFiTerror"
            style={{ width: '250px', height: 'auto', marginBottom: '0.5rem' }}
          />
          <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#112d4e' }}>
            Librería SciFiTerror
          </div>
        </div>

        <div className="form-titulo">Contacto</div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={handleInputChange}
            maxLength={MAX_LENGTHS.nombre}
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            required
          />
          {errors.nombre && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.nombre}
            </div>
          )}

          <label htmlFor="correo" className="mt-3">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="ejemplo@gmail.com"
            value={formData.correo}
            onChange={handleInputChange}
            maxLength={MAX_LENGTHS.correo}
            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
            required
          />
          {errors.correo && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.correo}
            </div>
          )}

          <label htmlFor="mensaje" className="mt-3">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)"
            value={formData.mensaje}
            onChange={handleInputChange}
            maxLength={MAX_LENGTHS.mensaje}
            rows="4"
            className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
            required
          ></textarea>
          {errors.mensaje && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.mensaje}
            </div>
          )}

          <button
            type="submit"
            className="boton mt-4"
            style={{
              opacity: submitted ? 0.7 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            {submitted ? '✅ Enviado' : 'Enviar'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Contacto;
