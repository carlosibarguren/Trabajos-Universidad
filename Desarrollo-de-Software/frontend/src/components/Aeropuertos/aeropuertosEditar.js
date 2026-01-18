import React, { useState, useEffect } from "react";
import axios from "axios";
import AeropuertosForm from "./aeropuertosForm.js";

const AeropuertosEditar = ({ onBackClick }) => {
  // Estado para la lista de aeropuertos
  const [aeropuertos, setAeropuerto] = useState([]);
  // Estado para almacenar el aeropuerto seleccionado
  const [aeropuertoSeleccionado, setAeropuertoSeleccionado] = useState(null);

  // Obtiene la lista de aeropuertos al cargar el componente
  useEffect(() => {
    axios
      .get("http://localhost:3001/aeropuertos/")
      .then((response) => {
        setAeropuerto(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  // Maneja el clic en el botón "Editar" de un aeropuerto
  const handleEdit = (aeropuerto) => {
    setAeropuertoSeleccionado(aeropuerto);
  };

  // Maneja la actualización de un aeropuerto
  const handleUpdate = (aeropuerto) => {
    axios
      .put(`http://localhost:3001/aeropuertos/${aeropuerto.IdAeropuerto}`, aeropuerto)
      .then((response) => {
        setAeropuerto(aeropuertos.map((a) => (a.IdAeropuerto === aeropuerto.IdAeropuerto ? aeropuerto : a)));
        setAeropuertoSeleccionado(null);
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
    <div className="form">
      <h1>Listado de Aeropuertos</h1>
      <table>
        <thead>
          <tr>
            <th>IdAeropuerto</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>FechaInauguracion</th>
            <th>CodigoIATA</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aeropuertos.map((aeropuerto) => (
            <tr key={aeropuerto.IdAeropuerto}>
              <td>{aeropuerto.IdAeropuerto}</td>
              <td>{aeropuerto.Nombre}</td>
              <td>{aeropuerto.Ciudad}</td>
              <td>{aeropuerto.Pais}</td>
              <td>{aeropuerto.FechaInauguracion}</td>
              <td>{aeropuerto.CodigoIATA}</td>
              <td>
                <button onClick={() => handleEdit(aeropuerto)} className="editar-button">Editar</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {aeropuertoSeleccionado && (
        <>
          <h1>Editar Aeropuerto</h1>
          <AeropuertosForm aeropuerto={aeropuertoSeleccionado} onSave={handleUpdate} />
        </>
      )}

      <br />
      <button className="back-button" onClick={handleBackClick}>
        Volver atrás
      </button>
    </div>
  );
};

export default AeropuertosEditar;
