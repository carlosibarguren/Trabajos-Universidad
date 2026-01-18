import React, { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./PasajerosEdit.css"

const urlBack = 'http://localhost:3001/pasajeros/';

const PasajerosActualizar = ({onBackClick}) => {
  const { register, handleSubmit, setValue } = useForm();
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [actualizado, setActualizado] = useState(null);
  const [pasajero, setPasajero] = useState({});

  const handleBackClick = () => {
    onBackClick();
  };

  const onSubmitConsultar = async (data2) => {
    const { IdPasajero } = data2;

    try {
      const respuestaBack = await axios.get(`${urlBack}${IdPasajero}`);
      const info = respuestaBack.data;
      setMostrarEditar(true);
      setPasajero(info);
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
      await axios.put(`${urlBack}${data3.IdPasajero}`, data3);
      setActualizado({
        message: `Pasajero ${data3.IdPasajero} actualizado correctamente`,
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
      setValue('Nombre', pasajero.Nombre);
      setValue('Apellido', pasajero.Apellido);
      setValue('FechaNacimiento', pasajero.FechaNacimiento);
      setValue('IdVuelo', pasajero.IdVuelo);
    }
  }, [mostrarEditar, pasajero, setValue]);

  return (
    <div>
      <button className="pasajeros-back-button" onClick={handleBackClick}>Volver atrás</button>
      <h1 className="pasajeros-actualizar-title">Actualizar un pasajero</h1>
      <div className="pasajeros-actualizar-form">
        <form onSubmit={handleSubmit(onSubmitConsultar)}>
          <label>Insertar id para editar información:</label>
          <input type="text" {...register('IdPasajero')} />
          <button type="submit">Buscar pasajero</button>
        </form>
      </div>
      <div className="pasajeros-actualizar-form">
        {mostrarEditar && (
          <form onSubmit={handleSubmit(onSubmitActualizar)}>
            <label>Nombre del pasajero:</label>
            <input type="text" {...register('Nombre', {required:true})} /> <br />
            <label>Apellido del pasajero:</label>
            <input type="text" {...register('Apellido', {required:true})} /> <br />
            <label>Fecha de nacimiento del pasasjero</label>
            <input type="date" step="0.01" {...register('FechaNacimiento', {required:true})} /> <br />
            <label>Id del Vuelo:</label>
            <input type="number" {...register('IdVuelo', {required:true})} /> <br />
            <button type="submit">Actualizar</button>
          </form>
        )}
        {actualizado && actualizado.message && (
          <p className="pasajeros-actualizar-message">{actualizado.message}</p>
        )}
        {actualizado && actualizado.error && (
          <p className="pasajeros-actualizar-error">{actualizado.error}</p>
        )}
      </div>
    </div>
  );
};

export default PasajerosActualizar;
