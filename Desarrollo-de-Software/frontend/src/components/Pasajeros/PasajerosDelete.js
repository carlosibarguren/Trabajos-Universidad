import React, { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import "./PasajerosDelete.css"

const urlBack = 'http://localhost:3001/pasajeros/';

const PasajerosDelete = ({onBackClick}) => {
  const [eliminado, setEliminado] = useState(null);
  const { register, handleSubmit } = useForm();

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitEliminar = async (data) => {
    try {
      const { IdPasajero } = data;
      await axios.delete(`${urlBack}${IdPasajero}`);
      setEliminado({ message: `Pasajero ${IdPasajero} eliminado correctamente` });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEliminado(error.response.data);
      } else {
        setEliminado({ error: `Hubo un error en la eliminación ${error}` });
      }
    }
  };

  return (
    <div className="pasajeros-eliminar-container">
      <button className="pasajeros-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="pasajeros-eliminar-title">Eliminar un Pasajero</h1>
      <form className="pasajeros-eliminar-form" onSubmit={handleSubmit(onSubmitEliminar)}>
        <label className="pasajeros-eliminar-label">Ingresar Id del Pasajero:</label><br />
        <input type="number" {...register('IdPasajero', {required:true})} className="pasajeros-eliminar-input" />
        <button type="submit" className="pasajeros-eliminar-btn">Eliminar</button>
      </form>
      {eliminado && (eliminado.message ? (<p className="pasajeros-eliminar-message">{eliminado.message}</p>) : (<p className="pasajeros-eliminar-message">{eliminado.error}</p>))}
    </div>
  );
};

export default PasajerosDelete;
