import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListadoAeropuertos from './aeropuertosListado';

const AeropuertosCrear = ({ onBackClick }) => {
  // Estado para almacenar los datos del aeropuerto a crear
  const [aeropuerto, setAeropuerto] = useState({
    Nombre: '',
    Pais: '',
    Ciudad: '',
    FechaInauguracion: '',
    CodigoIATA: ''
  });

  // Maneja el cambio en los campos de entrada del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAeropuerto((prevAeropuerto) => ({
      ...prevAeropuerto,
      [name]: value
    }));
  };

  // Maneja el envío del formulario para crear un nuevo aeropuerto
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/aeropuertos', aeropuerto)
      .then((response) => {
        alert(`Se creó el aeropuerto con id ${response.data.IdAeropuerto}.`);
        setAeropuerto({
            Nombre: '',
            Pais: '',
            Ciudad: '',
            FechaInauguracion: '',
            CodigoIATA: ''
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Maneja el clic en el botón "Volver atrás"
  const handleBackClick = () => {
    onBackClick();
  };

  return (
    <div>
      <h1>Crear Aeropuerto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Nombre">Nombre:</label>
        <input
          id="Nombre"
          name="Nombre"
          type="text"
          value={aeropuerto.Nombre}
          onChange={handleChange}
          className="input"
        />
        <br />
        <label htmlFor="Ciudad">Ciudad:</label>
        <input
          id="Ciudad"
          name="Ciudad"
          type="text"
          value={aeropuerto.Ciudad}
          onChange={handleChange}
          className="input"
        />
        <br />
        <label htmlFor="FechaInauguracion">Fecha de Inauguracion:</label>
        <input
          id="FechaInauguracion"
          name="FechaInauguracion"
          type="date"
          value={aeropuerto.FechaInauguracion}
          onChange={handleChange}
          className="input"
        />
        <br />
        <label htmlFor="Pais">Pais:</label>
        <input
          id="Pais"
          name="Pais"
          type="text"
          value={aeropuerto.Pais}
          onChange={handleChange}
          className="input"
        />
        <br />
        <label htmlFor="CodigoIATA">Codigo IATA:</label>
        <input
          id="CodigoIATA"
          name="CodigoIATA"
          type="text"
          value={aeropuerto.CodigoIATA}
          onChange={handleChange}
          className="input"
        />
        <br />
        <button type="submit" className="aceptar-button">Aceptar</button>
      </form>
      <br />
      <button className="back-button" onClick={handleBackClick}>
        Volver atrás
      </button>
    </div>
  );
};

export default AeropuertosCrear;
