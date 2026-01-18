import React, { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import "./VuelosConsultar.css"
import ListadoVuelos from './ListadoVuelos';

const urlBack = 'http://localhost:3001/vuelos/';

const VuelosConsultar = ({onBackClick}) => {

  const { register, handleSubmit } = useForm();
  const [lista, setLista] = useState({ message: "Insertar filtro para buscar" });

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitObtener = async (data2) => {
    const { filtro } = data2;
    try {
      const respuestaBack = await axios.get(`${urlBack}?filtro=${filtro}`);
      const listaVuelos = respuestaBack.data;
      setLista(listaVuelos);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLista(error.response.data);
      } else {
        console.log("Hubo un error en la búsqueda", error);
      }
    }
  };

  return (
    <div className="vuelos-consultar-container">
      <button className="vuelos-consultar-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="vuelos-consultar-title">Consultar Vuelos</h1>
      <h3 className="vuelos-consultar-description">Buscar "Todos" para obtener todos los registros</h3>
      <form className="vuelos-consultar-form" onSubmit={handleSubmit(onSubmitObtener)}>
        <div className="vuelos-consultar-input-group">
          <label className="vuelos-consultar-label">Filtrar por nombre de vuelo:</label>
          <input type="text" className="vuelos-consultar-input" {...register('filtro', {required:true})} />
          <button type="submit" className="vuelos-consultar-btn">Buscar</button>
        </div>
      </form>
      <ListadoVuelos lista={lista} />
    </div>
  );
};

export default VuelosConsultar;
