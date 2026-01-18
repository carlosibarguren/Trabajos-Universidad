import AvionFormCrear from './AvionesFormCrear.js';
import axios from 'axios'
import AvionFormFiltro from './AvionesFormFiltrar.js';
import { useEffect, useState } from 'react';
import ListadoAviones from './AvionesListado.js';


//este archivo va a manejar el post de los aviones. Reutiliza el formulario y define a la funcion handleSave
//para que al tocar aceptar se haga el post con el avion capturado del formulario
const CrearAviones = ({onBackClick}) => {
  const [fabricante, setFabricante] = useState('');
  const [aviones, setAviones] = useState('');

  useEffect(() => {
    fetchData();
  }, []);


  const handleSave = (avion) => {
    axios.post('http://localhost:3001/aviones/', avion)
    .then(response => {
  
      alert(`Se guardo el avion`);
    })
    .catch(error => {
      alert(`Error al guardar: ${error.message}`);
    });
    fetchData();
  };
  const handleBackClick = () => {
    // Llamar a la función de vuelta atrás del componente padre
    onBackClick();
  };
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/aviones/');
    setAviones(response.data);
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
  };

  return (
    <div>
      <button className="back-button" onClick={handleBackClick}>
        Volver atrás
      </button>
      <h1>Crear avion</h1>
      <AvionFormCrear onSave={handleSave} />
      <AvionFormFiltro fabricante={fabricante}
      onFabricanteChange={(event) => setFabricante(event.target.value)}
      onSubmit={handleSubmit}
      onMostrarTodos={() => {fetchData()}} />
      <ListadoAviones lista={aviones} />
    </div>
  );
}

export default CrearAviones;