import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListadoAeropuertos from './aeropuertosListado';

const AeropuertosBuscar = ({ onTableSelect, onBackClick }) => {
  const [filtro, setFiltro] = useState('');
  
  const [listaFiltrada, setListaFiltrada] = useState([]);
  
  const [error, setError] = useState('');

  
  const handleInputChange = (event) => {
    setFiltro(event.target.value);
  };

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/aeropuertos/');
    setListaFiltrada(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleBuscarClick = async () => {
    try {
      
      const response = await axios.get(`http://localhost:3001/aeropuertos/filtrar?CodigoIATA=${filtro}`);

      if (response.status === 200) {
        
        setListaFiltrada(response.data);
        setError('');
        onTableSelect('Aeropuertos'); 
      } else {
        
        setListaFiltrada([]);
        setError(response.data.error || 'Error al realizar la búsqueda');
      }
    } catch (error) {
      
      setListaFiltrada([]);
      setError('Error al realizar la búsqueda');
    }
  };

  
  const handleBackClick = () => {
    onTableSelect(''); 
    onBackClick(); 
  };

  return (
    <div>
      <ListadoAeropuertos lista={listaFiltrada} />
      <div className="buscar-aeropuertos-container">
        <h1>Buscar Aeropuertos</h1>
        <label htmlFor="CodigoIATA">Codigo IATA del aeropuerto:</label>
        <input
          type="text"
          value={filtro}
          onChange={handleInputChange}
          className="input"
        />
        <button onClick={handleBuscarClick} className="aceptar-button">
          Aceptar
        </button>
      </div>
      {error && <p>{error}</p>}
      <br />
      <button className="back-button" onClick={handleBackClick}>
        Volver atrás
      </button>
    </div>
  );
};

export default AeropuertosBuscar;
