import React, { useState, useEffect } from 'react';
import ListadoAviones from './AvionesListado.js';
import axios from 'axios';
import AvionFormFiltro from './AvionesFormFiltrar.js';

const BuscarAviones = ({onBackClick}) => {
    const [fabricante, setFabricante] = useState('');
    const [avionesFiltrados, setAvionesFiltrados] = useState([]);
  
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/aviones/');
      setAvionesFiltrados(response.data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (fabricante === '') {
        alert('Ingresa un fabricante antes de hacer la búsqueda.');
        return;
      }
      const response = await axios.get(
        `http://localhost:3001/aviones/filtrar?fabricante=${fabricante}`
      );
      setAvionesFiltrados(response.data);
    };
    const handleBackClick = () => {
      // Llamar a la función de vuelta atrás del componente padre
      onBackClick();
    };
  
    return (
      <>
        <button className="back-button" onClick={handleBackClick}>
          Volver atrás
        </button>
        <AvionFormFiltro fabricante={fabricante}
        onFabricanteChange={(event) => setFabricante(event.target.value)}
        onSubmit={handleSubmit}
        onMostrarTodos={fetchData} />
        <ListadoAviones lista={avionesFiltrados} />
      </>
    );
  };
  
  export default BuscarAviones;
  