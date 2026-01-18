import React, { useState, useEffect } from 'react';
//Este componente es el formulario que se usa en la interfaz para crear aviones y tambien para editar aviones.
const AvionFormCrear = ({ avion, onSave }) => {
  const [modelo, setModelo] = useState('');
  const [fecha, setFecha] = useState('');
  const [capacidadDeCarga, setCapacidadDeCarga] = useState('');
  const [capacidadDePasajeros, setCapacidadDePasajeros] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [mostrarID, setMostrarID] = useState(false);

  //Este se usa para que el formulario se cargue con datos del avion a editar, solo si se lo pasan por parametro al form
  useEffect(() => {
    if (avion) {
      setMostrarID(true);
      setModelo(avion.Modelo);
      setFecha(avion.Fecha);
      setCapacidadDeCarga(avion.CapacidadDeCarga);
      setCapacidadDePasajeros(avion.CapacidadDePasajeros);
      setFabricante(avion.Fabricante);
    }
  }, [avion]);

  const handleSubmit = (event) => {
    //Esta línea llama al método preventDefault del objeto event para que no se comporte por defecto el 
    //evento de envío de formulario. El comportamiento por defecto de un evento de envío de formulario es enviar los 
    //datos del formulario al servidor y recargar la página. Al llamar al método event.preventDefault(), se está evitando 
    //que el navegador envíe los datos del formulario al servidor y recargue 
    //la página. Para poder manejar el guardado de los datos de forma manual con la funcion onSave()
    event.preventDefault();
  
    // Verificar si todos los campos tienen valores
    if (modelo && fecha && capacidadDeCarga && capacidadDePasajeros && fabricante) {
    //Se crea un nuevo objeto con los datos del avión ingresados por el usuario en el formulario y llaman a la 
    //función onSave pasándole este nuevo objeto como argumento. La función onSave se encarga de guardar los 
    //cambios en la API.
      onSave({
    //la sintaxis ...avion se usa para copiar todas las propiedades del objeto avion en un nuevo objeto.
    // es útil en este caso porque permite mantener todas las propiedades del objeto avion que no han sido 
    //modificadas por el usuario y solo actualizar las propiedades que han cambiado.
    //Si no se usa ...avion en la función handleSubmit, solo se pasan las propiedades del 
    //avión que se están mostrando en el formulario y se podria perder información importante del avión original
        ...avion,
        Modelo: modelo,
        Fecha: fecha,
        CapacidadDeCarga: capacidadDeCarga,
        CapacidadDePasajeros: capacidadDePasajeros,
        Fabricante: fabricante
      });
      setModelo('');
      setFecha('');
      setCapacidadDeCarga('');
      setCapacidadDePasajeros('');
      setFabricante('');
    } else {
      // Mostrar un mensaje de error si algún campo está vacío en el formulario
      alert('Todos los campos deben estar completados para enviar');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {mostrarID && (
          <div>
            <p>El ID del avion seleccionado es: </p>
            <ul>
              <li>ID: {avion.ID}</li>
            </ul>
          </div>
        )}
      </div>
      <label htmlFor="modelo">Modelo:</label>
      <div className="inputbox">
        <span>Modelo</span>
        <input
            required
            id="modelo"
            type="text"
            value={modelo}
            onChange={(event) => setModelo(event.target.value)}
        />
          
        <i></i>
      </div>
      
      <div>
        <label htmlFor="fecha">Fecha:</label>
        <div className="inputbox" type="date">
          <span>Fecha</span>
          <input
            
            id="fecha"
            required
            type="date"
            value={fecha}
            className={fecha ? 'has-value' : ''}
            onChange={(event) => setFecha(event.target.value)}
          />
          
          <i></i>
        </div>
      </div>
      <div>
        <label htmlFor="capacidadDeCarga">Capacidad de carga:</label>
        <div className="inputbox">
          <span>Capacidad de carga</span>
          <input
            id="capacidadDeCarga"
            required
            type="number"
            value={capacidadDeCarga}
            onChange={(event) => setCapacidadDeCarga(event.target.value)}
          />
          
          <i></i>
        </div>
      </div>
      <div>
        <label htmlFor="capacidadDePasajeros">Capacidad de pasajeros:</label>
        <div className="inputbox">
          <span>Cantidad</span>
          <input
            id="capacidadDePasajeros"
            required
            type="number"
            value={capacidadDePasajeros}
            onChange={(event) => setCapacidadDePasajeros(event.target.value)}
          />
          
          <i></i>
        </div>
      </div>
      <div>
        <label htmlFor="fabricante">Fabricante:</label>
        <div className="inputbox">
          <span>Fabricante</span>
          <input
            id="fabricante"
            required
            type="text"
            value={fabricante}
            onChange={(event) => setFabricante(event.target.value)}
          />
          <i></i>
        </div>
      </div>
      <button className="aceptar-button" type="submit">
        Aceptar
      </button>
    </form>
  );
};

export default AvionFormCrear;

