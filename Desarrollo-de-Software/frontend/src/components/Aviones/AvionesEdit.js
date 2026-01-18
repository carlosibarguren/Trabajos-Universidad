import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvionFormCrear from './AvionesFormCrear.js';
import AvionesListSeleccion from './AvionesListSeleccion.js';
import AvionFormFiltro from './AvionesFormFiltrar.js';

//Este componente se encarga del update de aviones, hace una tabla y reutiliza el componente formulario
//para que sea mas sencillo actualizar los datos del avion y maneja el PUT, para hacerlo.
const EditarAviones = ({onBackClick}) => {
  const [aviones, setAviones] = useState([]);
  const [fabricante, setFabricante] = useState('');
  const [avionSeleccionado, setAvionSeleccionado] = useState(null);

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
    setAvionSeleccionado(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelection = (avion) => {
    setAvionSeleccionado(avion);
  };

  const handleUpdate = (avion) => {
    axios.put(`http://localhost:3001/aviones/${avion.ID}`, avion)
      .then(response => {
        setAviones(aviones.map(a => a.ID === avion.ID ? avion : a));
        setAvionSeleccionado(null);
      })
      .catch(error => {
        alert(`Se produjo un error al editar el Avion, error: ${error.message}`)
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
                            setAvionSeleccionado(null)}} />
      {avionSeleccionado && (
        <>
          <h2>Editar avión</h2>
          <AvionFormCrear avion={avionSeleccionado} onSave={handleUpdate} />
        </>
      )}
      <AvionesListSeleccion lista={aviones} onSelect={handleSelection}/>
    </div>
  );
};

export default EditarAviones;
