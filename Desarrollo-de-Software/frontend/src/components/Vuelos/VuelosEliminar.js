import React, { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import "./VuelosEliminar.css"

const urlBack = 'http://localhost:3001/vuelos/';

const VuelosEliminar = ({onBackClick}) => {

  const [eliminado, setEliminado] = useState(null);
  const { register, handleSubmit } = useForm();

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitEliminar = async (data) => {
    try {
      const { idVuelo } = data;
      await axios.delete(`${urlBack}${idVuelo}`);
      setEliminado({ message: `Vuelo ${idVuelo} eliminado correctamente` });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEliminado(error.response.data);
      } else {
        setEliminado({ error: `Hubo un error en la eliminación ${error}` });
      }
    }
  };

  return (
    <div className="vuelos-eliminar-container">
      <button className="vuelos-eliminar-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="vuelos-eliminar-title">Eliminar un Vuelo</h1>
      <form className="vuelos-eliminar-form" onSubmit={handleSubmit(onSubmitEliminar)}>
        <label className="vuelos-eliminar-label">Ingresar Id del vuelo:</label><br />
        <input type="number" {...register('idVuelo', {required:true})} className="vuelos-eliminar-input" />
        <button type="submit" className="vuelos-eliminar-btn">Eliminar</button>
      </form>
      {eliminado && (eliminado.message ? (<p className="vuelos-eliminar-message">{eliminado.message}</p>) : (<p className="vuelos-eliminar-message">{eliminado.error}</p>))}
    </div>
  );
};

export default VuelosEliminar;
