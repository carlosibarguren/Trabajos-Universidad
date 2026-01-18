import React, { useState, useEffect } from "react";
import axios from "axios";
import ListadoAeropuertos from "./aeropuertosListado";

const AeropuertosEliminar = ({ onBackClick }) => {
  const [aeropuerto, setEliminar] = useState("");

  const [listaAeropuertos, setListaAeropuertos] = useState([]);
 
  useEffect(() => {
     obtenerAeropuertos();
   }, []);
 
   const obtenerAeropuertos = () => {
     axios
       .get("http://localhost:3001/aeropuertos/")
       .then((response) => {
         setListaAeropuertos(response.data);
       })
       .catch((error) => {
         alert(error.message);
       });
   };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (aeropuerto) {
      axios
        .delete(`http://localhost:3001/aeropuertos/${aeropuerto}`)
        .then((response) => {
          alert(`Se eliminó el aeropuerto con id ${aeropuerto}.`);
          obtenerAeropuertos();
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Por favor, ingresa el ID del aeropuerto a eliminar.");
    }
  };

  const handleBackClick = () => {
    onBackClick();
  };

  return (
    <div>
      <ListadoAeropuertos lista={listaAeropuertos} />
      <h1>Eliminar Aeropuerto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="IdAeropuerto">Identificador de aeropuerto:</label>
        <input
          id="aeropuerto"
          type="number"
          value={aeropuerto}
          onChange={(event) => setEliminar(event.target.value)}
          className="input"
        />
        <button type="submit" className="aceptar-button">Aceptar</button>
      </form>
      <br />
      <button className="back-button" onClick={handleBackClick}>
        Volver atrás
      </button>
  </div>
  );
};

export default AeropuertosEliminar;

