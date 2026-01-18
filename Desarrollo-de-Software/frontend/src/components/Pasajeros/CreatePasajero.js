import React, { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import "./CreatePasajeros.css"

const urlBase = 'http://localhost:3001/pasajeros/';

const PasajerosCreate = ({onBackClick}) => {
  const [noMostrarCrear, setNoMostrarCrear] = useState(false);
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const [creado, setCreado] = useState({});

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitCrear = async (data2) => {
    console.log(data2);
    try {
      const response = await axios.post(`${urlBase}`, data2);
      console.log(response);
      setCreado(response.data);
      setNoMostrarCrear({ message: `El Pasajero se ha registrado correctamente` });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNoMostrarCrear(error.response.data);
      } else {
        setNoMostrarCrear({ error: `Hubo un error en el registro del pasajero: ${error}` });
      }
    }
  };

  const reiniciarProceso = () => {
    setNoMostrarCrear(false);
    reset();
  };

  return (
    <div className="pasajeros-crear-container">
      <button className="pasajeros-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="pasajeros-crear-title">Crear un Pasajero</h1>
      {!noMostrarCrear && (
        <form className="pasajeros-crear-form" onSubmit={handleSubmit(onSubmitCrear)}>
          <div className="pasajeros-crear-input-group">
            <label className="pasajeros-crear-label"><strong>Nombre del Pasajero:</strong></label>
            <input className="pasajeros-crear-input" type="text" {...register('Nombre', {
                required: {value:true, message:"El nombre del pasajero es obligatorio"}})} />
            {errors.Nombre && errors.Nombre.message}

          </div>
          <div className="pasajeros-crear-input-group">
            <label className="pasajeros-crear-label"><strong>Apellido:</strong></label>
            <input className="pasajeros-crear-input" type="text" {...register('Apellido', {
                required: {value:true, message:"El apellido del pasajero es obligatorio"}})} />
            {errors.Apellido && errors.Apellido.message}

          </div>
          <div className="pasajeros-crear-input-group">
            <label className="pasajeros-crear-label"><strong>Fecha Nacimiento:</strong></label>
            <input className="pasajeros-crear-input" type="date" step="0.01" {...register('FechaNacimiento', {
                required: {value:true, message:"La fecha de nacimiento del pasajero es obligatoria"}})} />
            {errors.FechaNacimiento && errors.FechaNacimiento.message}
          </div>
          <div className="pasajeros-crear-input-group">
            <label className="pasajeros-crear-label"><strong>Id Vuelo:</strong></label>
            <input className="pasajeros-crear-input" type="number" {...register('IdVuelo', {
                required: {value:true, message:"El Id del vuelo es obligatorio"}})} />
            {errors.IdVuelo && errors.IdVuelo.message}
          </div>
          <button className="pasajeros-crear-btn" type="submit">Crear</button>
        </form>
      )}
      {noMostrarCrear && noMostrarCrear.message && (
        <div className="pasajeros-crear-message">
          <p><em>{noMostrarCrear.message}</em></p> <br />
          <ul className="pasajeros-crear-list"> 
            <li><strong>Id Pasajero:</strong> {creado.IdPasajero}</li>
            <li><strong>Nombre :</strong> {creado.Nombre}</li>
            <li><strong>Apellido:</strong> {creado.Apellido}</li>
            <li><strong>FechaNacimiento:</strong> {creado.FechaNacimiento}</li>
            <li><strong>Id del Vuelo:</strong> {creado.IdVuelo}</li>
          </ul>
          <button className="pasajeros-crear-btn-center" onClick={reiniciarProceso}>Registrar otro pasajero</button>
        </div>
      )}
      {noMostrarCrear && noMostrarCrear.error && (
        <div className="pasajeros-crear-message">
          <p>{noMostrarCrear.error}</p>
          <button className="pasajeros-crear-btn-center" onClick={reiniciarProceso}> Registrar otro pasajero</button>
        </div>
      )}
    </div>
  );
};

export default PasajerosCreate;
