import React, { useState } from 'react';
import axios from 'axios';

const ClimaWidget = () => {
  const [direccion, setDireccion] = useState('');
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const consultarClima = async () => {
    if (!direccion) return;
    setLoading(true);
    setError('');
    setClima(null);

    try {
      const response = await axios.get(`https://libreriascifiterror-backend.onrender.com/api/v1/integracion/clima?direccion=${direccion}`);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setClima(response.data);
      }
    } catch (err) {
      setError("Error conectando con el servidor");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="card mt-4 p-3 shadow-sm" style={{ border: '2px solid #007bff' }}>
      <h5 className="card-title text-center mb-3">🌤️ Consulta el Clima de Envío</h5>
      
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Ingresa tu ciudad (Ej: Puente Alto)" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <button className="btn btn-primary" onClick={consultarClima} disabled={loading}>
          {loading ? 'Buscando...' : 'Ver Clima'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {clima && (
        <div className="text-center bg-light p-3 rounded">
          <h4 className="text-primary">{clima.ciudad}</h4>
          <h2 className="display-4">{clima.temperatura}°C</h2>
          <p>💨 Viento: {clima.viento} km/h</p>
          <small className="text-muted">Datos procesados vía API Externa</small>
        </div>
      )}
    </div>
  );
};

export default ClimaWidget;
