import React, { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./VuelosActualizar.css"

const urlBack = 'http://localhost:3001/vuelos/';

const VuelosActualizar = ({onBackClick}) => {

  const { register, handleSubmit, setValue } = useForm();
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [actualizado, setActualizado] = useState(null);
  const [vuelo, setVuelo] = useState({});

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitConsultar = async (data2) => {
    const { IdVuelo } = data2;

    try {
      const respuestaBack = await axios.get(`${urlBack}${IdVuelo}`);
      const informacion = respuestaBack.data;
      setMostrarEditar(true);
      setVuelo(informacion);
      setActualizado(null);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response.data);
        setActualizado(error.response.data);
        setMostrarEditar(false);
      } else {
        setActualizado(`Hubo un error en la búsqueda ${error}`);
        setMostrarEditar(false);
      }
    }
  };

  const onSubmitActualizar = async (data3) => {
    try {
      await axios.put(`${urlBack}${data3.IdVuelo}`, data3);
      setActualizado({
        message: `Vuelo ${data3.IdVuelo} actualizado correctamente`,
      });
      setMostrarEditar(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setActualizado(error.response.data);
        setMostrarEditar(false);
      } else {
        setActualizado(`Hubo un error en la actualización ${error}`);
        setMostrarEditar(false);
      }
    }
  };

  useEffect(() => {
    if (mostrarEditar) {
      setValue('NombreVuelo', vuelo.NombreVuelo);
      setValue('FechaDespegue', vuelo.FechaDespegue);
      setValue('Precio', vuelo.Precio);
      setValue('IdAvion', vuelo.IdAvion);
      setValue('IdAeropuertoOrigen', vuelo.IdAeropuertoOrigen);
      setValue('IdAeropuertoDestino', vuelo.IdAeropuertoDestino);
    }
  }, [mostrarEditar, vuelo, setValue]);

  return (
    <div>
      <button className="vuelos-actualizar-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="vuelos-actualizar-title">Actualizar un Vuelo</h1>
      <div className="vuelos-actualizar-form">
        <form onSubmit={handleSubmit(onSubmitConsultar)}>
          <label>Insertar id para editar información:</label>
          <input type="text" {...register('IdVuelo')} />
          <button type="submit">Buscar Vuelo</button>
        </form>
      </div>
      <div className="vuelos-actualizar-form">
        {mostrarEditar && (
          <form onSubmit={handleSubmit(onSubmitActualizar)}>
            <label>Nombre del Vuelo:</label>
            <input type="text" {...register('NombreVuelo', {required:true})} /> <br />
            <label>Fecha Despegue:</label>
            <input type="date" {...register('FechaDespegue', {required:true})} /> <br />
            <label>Precio:</label>
            <input type="number" step="0.01" {...register('Precio', {required:true})} /> <br />
            <label>Id Avion:</label>
            <input type="number" {...register('IdAvion', {required:true})} /> <br />
            <label>Id Aeropuerto Origen:</label>
            <input type="number" {...register('IdAeropuertoOrigen', {required:true})} /> <br />
            <label>Id Aeropuerto Destino:</label>
            <input type="number" {...register('IdAeropuertoDestino', {required:true})} /> <br />
            <button type="submit">Actualizar</button>
          </form>
        )}
        {actualizado && actualizado.message && (
          <p className="vuelos-actualizar-message">{actualizado.message}</p>
        )}
        {actualizado && actualizado.error && (
          <p className="vuelos-actualizar-error">{actualizado.error}</p>
        )}
      </div>
    </div>
  );
};

export default VuelosActualizar;
