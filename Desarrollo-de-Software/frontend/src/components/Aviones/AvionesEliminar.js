import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvionesListSeleccion from './AvionesListSeleccion.js';
import AvionFormFiltro from './AvionesFormFiltrar.js';

const EliminarAviones = ({onBackClick}) => {
  const [aviones, setAviones] = useState([]);
  const [fabricante, setFabricante] = useState('');
  const [avionSeleccionado, setAvionSeleccionado] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/aviones/');
    setAviones(response.data);
  };

  const handleBackClick = () => {
    // Llamar a la función de vuelta atrás del componente padre
    onBackClick();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fabricante === '') {
        alert('Ingresa un fabricante antes de hacer la búsqueda.');
        return;
      }
    const response = await axios.get(
      `http://localhost:3001/aviones/filtrar?fabricante=${fabricante}`
    );
    setAviones(response.data);
    setMostrarConfirmacion(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelection = (avion) => {
    setAvionSeleccionado(avion);
    setMostrarConfirmacion(true);
  };

  const handleDelete = (avion) => {
    axios
      .delete(`http://localhost:3001/aviones/${avion.ID}`)
      .then((response) => {
        setAviones(aviones.filter((a) => a.ID !== avion.ID));
        setAvionSeleccionado(null);
        setMostrarConfirmacion(false);
        fetchData()
      })
      .catch((error) => {
        alert(`Se produjo un error al eliminar el Avion, error: ${error.message}`);
      });
  };

  return (
    <div>
      <button className="back-button" onClick={handleBackClick}>
        Volver atrás
      </button>

      <AvionFormFiltro fabricante={fabricante}
      onFabricanteChange={(event) => setFabricante(event.target.value)}
      onSubmit={handleSubmit}
      onMostrarTodos={() => {fetchData();
                            setMostrarConfirmacion(false);}} />
      {mostrarConfirmacion && (
        <div>
          <p>¿Estás seguro de que quieres eliminar el siguiente avión?</p>
          <ul>
            <li>ID: {avionSeleccionado.ID}</li>
            <li>Modelo: {avionSeleccionado.Modelo}</li>
            <li>Fecha: {avionSeleccionado.Fecha}</li>
            <li>Capacidad de carga: {avionSeleccionado.CapacidadDeCarga}</li>
            <li>Capacidad de pasajeros: {avionSeleccionado.CapacidadDePasajeros}</li>
            <li>Fabricante: {avionSeleccionado.Fabricante}</li>
          </ul>
          <button className="aceptar-button" onClick={() => handleDelete(avionSeleccionado)}>Confirmar</button>
          <button className="cancelar-button" onClick={() => {fetchData()
        setMostrarConfirmacion(false)}}>Cancelar</button>
        </div>
      )}
      <AvionesListSeleccion lista={aviones} onSelect={handleSelection}/>
    </div>
  );
};

export default EliminarAviones;
