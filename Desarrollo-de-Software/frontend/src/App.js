import React, { useState } from 'react';
import logo from './images/logo192.png';
import './App.css';

import PilotosEliminar from './components/Pilotos/PilotosEliminar';
import PilotosEditar from './components/Pilotos/PilotosEditar';
import PilotosCrear from './components/Pilotos/PilotosCrear';
import PilotosBuscar from './components/Pilotos/PilotosBuscar';

import AvionesBuscar from './components/Aviones/AvionesBuscar';
import CrearAviones from './components/Aviones/AvionesCrear';
import EditarAviones from './components/Aviones/AvionesEdit';
import EliminarAviones from './components/Aviones/AvionesEliminar';

import VuelosEliminar from './components/Vuelos/VuelosEliminar'
import VuelosCrear from './components/Vuelos/VuelosCrear'
import VuelosActualizar from './components/Vuelos/VuelosActualizar'
import VuelosConsultar from './components/Vuelos/VuelosConsultar'

import PasajeroEliminar from './components/Pasajeros/PasajerosDelete.js';
import PasajeroEditar from './components/Pasajeros/PasajerosEdit.js';
import PasajerosCrear from './components/Pasajeros/CreatePasajero.js';
import PasajerosBuscar from './components/Pasajeros/GetPasjero.js';

import EliminarAeropuertos from './components/Aeropuertos/aeropuertosEliminar';
import EditarAeropuertos from './components/Aeropuertos/aeropuertosEditar';
import CrearAeropuertos from './components/Aeropuertos/aeropuertosCrear';
import BuscarAeropuertos from './components/Aeropuertos/aeropuertosBuscar';

const App = () => {
  const [activeOption, setActiveOption] = useState('');
  const [activeTable, setActiveTable] = useState('');
  const [isTableSelected, setIsTableSelected] = useState(false);

  // Maneja el clic en una opción del menú
  const handleOptionClick = (option) => {
    setActiveOption(option);
    setActiveTable('');
    setIsTableSelected(false);
  };

  // Maneja la selección de una tabla
  const handleTableSelect = (table) => {
    setActiveTable(table);
    setIsTableSelected(true);
  };

  // Maneja el clic en el botón "Volver atrás"
  const handleBackClick = () => {
    setActiveTable('');
    setIsTableSelected(false);
  };

  // Renderiza las opciones de las tablas
  const renderTableOptions = () => {
    if (!activeOption) {
      return null;
    }

    const tables = ['Aeropuertos', 'Vuelos', 'Aviones', 'Pilotos', 'Pasajeros'];

    return (
      <div className="table-options">
        <h2>Seleccione una tabla para trabajar</h2>
        <div className="table-buttons">
          {tables.map((table) => (
            <button
              key={table}
              className={`table-button ${activeTable === table && 'active'}`}
              onClick={() => handleTableSelect(table)}
            >
              {table}
            </button>
          ))}
        </div>
        {isTableSelected && (
          <button className="back-button" onClick={handleBackClick}>
            Volver atrás
          </button>
        )}
      </div>
    );
  };

  // Renderiza el contenido principal de la aplicación
  const renderContent = () => {
    if (!activeOption) {
      return (
        <div className="welcome">
          <h1>Bienvenido a la API de aerolínea</h1>
          <img src={logo} alt="Welcome" />
        </div>
      );
    }

    if (!activeTable) {
      return renderTableOptions();
    }

    switch (activeOption) {
      case 'eliminar':
        return (
          <>

            {activeTable === 'Pilotos' && (
              <PilotosEliminar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aviones' && (
              <EliminarAviones onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Vuelos' && (
              <VuelosEliminar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Pasajeros' && (
              <PasajeroEliminar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aeropuertos' && (
              <EliminarAeropuertos onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
          </>
        );
      case 'editar':
        return (
          <>

            {activeTable === 'Pilotos' && (
              <PilotosEditar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aviones' && (
              <EditarAviones onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Vuelos' && (
              <VuelosActualizar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
              )}
            {activeTable === 'Pasajeros' && (
              <PasajeroEditar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aeropuertos' && (
              <EditarAeropuertos onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
          </>
        );
      case 'crear':
        return (
          <>
            {activeTable === 'Pilotos' && (
              <PilotosCrear onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aviones' && (
              <CrearAviones onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Vuelos' && (
              <VuelosCrear onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Pasajeros' && (
              <PasajerosCrear onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aeropuertos' && (
              <CrearAeropuertos onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
          </>
        );
      case 'buscar':
        return (
          <>
            {activeTable === 'Pilotos' && (
              <PilotosBuscar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aviones' && (
              <AvionesBuscar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Vuelos' && (
              <VuelosConsultar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Pasajeros' && (
              <PasajerosBuscar onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
            {activeTable === 'Aeropuertos' && (
              <BuscarAeropuertos onTableSelect={handleTableSelect} onBackClick={handleBackClick} />
            )}
          </>
        );
      default:
        return null;
    }
  }
  return (
    <div className="app-container">
      <div className="menu">
        <h3>Menú de opciones</h3>
        <ul className="menu-options">
          <li
            className={`menu-option ${activeOption === 'eliminar' && 'active'}`}
            onClick={() => handleOptionClick('eliminar')}
          >
            - Eliminar un registro
          </li>
          <li
            className={`menu-option ${activeOption === 'editar' && 'active'}`}
            onClick={() => handleOptionClick('editar')}
          >
            - Editar un registro
          </li>
          <li
            className={`menu-option ${activeOption === 'crear' && 'active'}`}
            onClick={() => handleOptionClick('crear')}
          >
            - Crear un registro
          </li>
          <li
            className={`menu-option ${activeOption === 'buscar' && 'active'}`}
            onClick={() => handleOptionClick('buscar')}
          >
            - Buscar un registro
          </li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
