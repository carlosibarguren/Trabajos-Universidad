import React, { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import "./GetPasajeros.css"
import ListadoPasajeros from './ListadoPasajeros.js';

const urlBack = 'http://localhost:3001/pasajeros/';

const PasajerosGet = ({onBackClick}) => {
  const { register, handleSubmit } = useForm();
  const [lista, setLista] = useState({ message: "Insertar filtro para buscar" });

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitObtener = async (data2) => {
    const { filtro } = data2;
    try {
      const respuestaBack = await axios.get(`${urlBack}?filtro=${filtro}`);
      const listaPasajeros = respuestaBack.data;
      setLista(listaPasajeros);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLista(error.response.data);
      } else {
        console.log("Hubo un error en la búsqueda", error);
      }
    }
  };

  return (
    <div className="pasajeros-consultar-container">
      <button className="pasajeros-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="pasajeros-consultar-title">Consultar pasajeros</h1>
      <h3 className="pasajeros-consultar-description">Para buscar Todos los registros no ingrese nada y seleccione "Buscar"</h3>
      <form className="pasajeros-consultar-form" onSubmit={handleSubmit(onSubmitObtener)}>
        <div className="pasajeros-consultar-input-group">
          <label className="pasajeros-consultar-label">Filtrar por nombre o apellido del pasajero:</label>
          <input type="text" className="pasajeros-consultar-input" {...register('filtro')} />
          <button type="submit" className="pasajeros-consultar-btn">Buscar</button>
        </div>
      </form>
      <ListadoPasajeros lista={lista} />
    </div>
  );
};

export default PasajerosGet;
