import React, { useState, useEffect } from 'react';

const AeropuertosForm = ({ aeropuerto, onSave }) => {
  const [Nombre, setNombre] = useState('');
  const [Ciudad, setCiudad] = useState('');
  const [FechaInauguracion, setFechaInauguracion] = useState('');
  const [Pais, setPais] = useState('');
  const [CodigoIATA, setCodigoIATA] = useState('');

  useEffect(() => {
    if (aeropuerto) {
      setNombre(aeropuerto.Nombre);
      setCiudad(aeropuerto.Ciudad);
      setFechaInauguracion(aeropuerto.FechaInauguracion);
      setPais(aeropuerto.Pais);
      setCodigoIATA(aeropuerto.CodigoIATA);
    }
  }, [aeropuerto]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Nombre && Ciudad && FechaInauguracion && Pais && CodigoIATA) {
      onSave({
        ...aeropuerto,
        Nombre: Nombre,
        Ciudad: Ciudad,
        FechaInauguracion: FechaInauguracion,
        Pais: Pais,
        CodigoIATA: CodigoIATA
      });
    } else {
      alert('Todos los campos deben estar completados para enviar.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="form-group">
          <label htmlFor="Nombre">Nombre:</label>
          <input
            id="Nombre"
            type="text"
            value={Nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Ciudad">Ciudad:</label>
          <input
            id="Ciudad"
            type="text"
            value={Ciudad}
            onChange={(event) => setCiudad(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="FechaInauguracion">Fecha de Inauguracion:</label>
          <input
            id="FechaInauguracion"
            type="date"
            value={FechaInauguracion}
            onChange={(event) => setFechaInauguracion(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Pais">Pais:</label>
          <input
            id="Pais"
            type="text"
            value={Pais}
            onChange={(event) => setPais(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="CodigoIATA">Codigo IATA:</label>
          <input
            id="CodigoIATA"
            type="text"
            value={CodigoIATA}
            onChange={(event) => setCodigoIATA(event.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="aceptar-button">Aceptar</button>
      </div>
    </form>
  );
};

export default AeropuertosForm;
