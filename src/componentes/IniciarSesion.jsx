import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/IniciarSesion.css';
import { loginUsuario } from '../servicios/api.js';

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    correo: false,
    contrasena: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    correo: '',
    contrasena: '',
  });

  // Cargar datos guardados si "recordarme" está activo
  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      setFormData({
        correo: localStorage.getItem('correo') || '',
        contrasena: localStorage.getItem('contrasena') || '',
        rememberMe: true,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return emailPattern.test(email) && email.length <= 100;
  };

  const validatePassword = (password) => {
    return password.length >= 4 && password.length <= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { correo: false, contrasena: false };
    const newErrorMessages = { correo: '', contrasena: '' };

    // Validar correo
    const correo = formData.correo.trim();
    if (!correo || !validateEmail(correo)) {
      newErrors.correo = true;
      newErrorMessages.correo =
        'Por favor ingresa un correo válido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com y máximo 100 caracteres.';
      isValid = false;
    }

    // Validar contraseña
    if (!formData.contrasena || !validatePassword(formData.contrasena)) {
      newErrors.contrasena = true;
      newErrorMessages.contrasena =
        'La contraseña es obligatoria y debe tener entre 4 y 10 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    if (!isValid) {
      return;
    }

    try {
  // llamada al backend para iniciar sesión
  const usuarioBackend = await loginUsuario({
    email: correo,
    password: formData.contrasena,
  });

  console.log('Respuesta login:', usuarioBackend);

  // Ajustado a la respuesta real del API (/usuario/login)
  if (usuarioBackend && usuarioBackend.success) {
    const usuario = usuarioBackend.usuario || {};

    // Guardar datos si "recordarme" está activo
    if (formData.rememberMe) {
      localStorage.setItem('correo', correo);
      localStorage.setItem('contrasena', formData.contrasena);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('correo');
      localStorage.removeItem('contrasena');
      localStorage.setItem('rememberMe', 'false');
    }

    // Guardar info del usuario logueado
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem(
      'usuarioNombre',
      usuario.nombre || usuario.username || correo
    );

    alert(usuarioBackend.message || 'Inicio de sesión exitoso.');
    navigate('/'); // Ruta principal
  } else {
    alert(usuarioBackend.message || 'Correo o contraseña incorrectos.');
  }
} catch (error) {
  console.error('Error al iniciar sesión:', error);
  alert('Error al conectar con el servidor.');
}
  };

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

        <div className="form-titulo">Iniciar sesión</div>
        <form id="loginForm" onSubmit={handleSubmit} noValidate>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ingrese su email"
            maxLength="100"
            autoComplete="off"
            required
            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
            value={formData.correo}
            onChange={handleInputChange}
          />
          {errors.correo && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errorMessages.correo}
            </div>
          )}

          <label htmlFor="contrasena" className="mt-3">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            placeholder="Ingrese su contraseña"
            minLength="4"
            maxLength="10"
            required
            className={`form-control ${errors.contrasena ? 'is-invalid' : ''}`}
            value={formData.contrasena}
            onChange={handleInputChange}
          />
          {errors.contrasena && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errorMessages.contrasena}
            </div>
          )}

          <label className="mt-3">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            {' '}Recordarme
          </label>

          <button type="submit" className="boton mt-4">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
