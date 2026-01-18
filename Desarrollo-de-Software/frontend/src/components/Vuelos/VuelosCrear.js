import React, { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import "./VuelosCrear.css"

const urlBase = 'http://localhost:3001/vuelos/';

const VuelosCrear = ({onBackClick}) => {

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
      setNoMostrarCrear({ message: `El Vuelo se ha creado correctamente` });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNoMostrarCrear(error.response.data);
      } else {
        setNoMostrarCrear({ error: `Hubo un error en la agregacion del vuelo: ${error}` });
      }
    }
  };

  const reiniciarProceso = () => {
    setNoMostrarCrear(false);
    reset();
  };

  return (
    <div className="vuelos-crear-container">
      <button className="vuelos-crear-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="vuelos-crear-title">Crear un Vuelo</h1>
      {!noMostrarCrear && (
        <form className="vuelos-crear-form" onSubmit={handleSubmit(onSubmitCrear)}>
          <div className="vuelos-crear-input-group">
            <label className="vuelos-crear-label"><strong>Nombre del Vuelo:</strong></label>
            <input className="vuelos-crear-input" type="text" {...register('NombreVuelo', {
                required: {value:true, message:"El nombre del vuelo es obligatorio"}})} />
            {errors.NombreVuelo && errors.NombreVuelo.message}

          </div>
          <div className="vuelos-crear-input-group">
            <label className="vuelos-crear-label"><strong>Fecha Despegue:</strong></label>
            <input className="vuelos-crear-input" type="date" {...register('FechaDespegue', {
                required: {value:true, message:"La fecha de despegue del vuelo es obligatorio"}})} />
            {errors.FechaDespegue && errors.FechaDespegue.message}

          </div>
          <div className="vuelos-crear-input-group">
            <label className="vuelos-crear-label"><strong>Precio:</strong></label>
            <input className="vuelos-crear-input" type="number" step="0.01" {...register('Precio', {
                required: {value:true, message:"El precio del vuelo es obligatorio"}})} />
            {errors.Precio && errors.Precio.message}
          </div>
          <div className="vuelos-crear-input-group">
            <label className="vuelos-crear-label"><strong>Id Avion:</strong></label>
            <input className="vuelos-crear-input" type="number" {...register('IdAvion', {
                required: {value:true, message:"El Id del avion es obligatorio"}})} />
            {errors.IdAvion && errors.IdAvion.message}
          </div>
          <div className="vuelos-crear-input-group">
            <label className="vuelos-crear-label"><strong>Id Aeropuerto Origen:</strong></label>
            <input className="vuelos-crear-input" type="number" {...register('IdAeropuertoOrigen', {
                required: {value:true, message:"El id del aeropuerto origen es obligatorio"}})} />
            {errors.IdAeropuertoOrigen && errors.IdAeropuertoOrigen.message}
          </div>
          <div className="vuelos-crear-input-group">
            <label className="vuelos-crear-label"><strong>Id Aeropuerto Destino:</strong></label>
            <input className="vuelos-crear-input" type="number" {...register('IdAeropuertoDestino', {
                required: {value:true, message:"El id del aeropuerto destino es obligatorio"}})} />
            {errors.IdAeropuertoDestino && errors.IdAeropuertoDestino.message}
          </div>
          <button className="vuelos-crear-btn" type="submit">Crear</button>
        </form>
      )}
      {noMostrarCrear && noMostrarCrear.message && (
        <div className="vuelos-crear-message">
          <p><em>{noMostrarCrear.message}</em></p> <br />
          <ul className="vuelos-crear-list">
            <li><strong>Id Vuelo:</strong> {creado.IdVuelo}</li>
            <li><strong>Nombre del Vuelo:</strong> {creado.NombreVuelo}</li>
            <li><strong>Fecha de Despegue:</strong> {creado.FechaDespegue}</li>
            <li><strong>Precio:</strong> {creado.Precio}</li>
            <li><strong>Id del Avion:</strong> {creado.IdAvion}</li>
            <li><strong>Id Aeropuerto Origen:</strong> {creado.IdAeropuertoOrigen}</li>
            <li><strong>Id Aeropuerto Destino:</strong> {creado.IdAeropuertoDestino}</li>
          </ul>
          <button className="vuelos-crear-btn-center" onClick={reiniciarProceso}>Crear otro vuelo</button>
        </div>
      )}
      {noMostrarCrear && noMostrarCrear.error && (
        <div className="vuelos-crear-message">
          <p>{noMostrarCrear.error}</p>
          <button className="vuelos-crear-btn-center" onClick={reiniciarProceso}>Crear otro vuelo</button>
        </div>
      )}
    </div>
  );
};

export default VuelosCrear;
