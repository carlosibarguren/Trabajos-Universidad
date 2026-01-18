import React, { useState, useEffect } from 'react';

const PilotosForm = ({ piloto, onSave }) => {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [Nacionalidad, setNacionalidad] = useState('');
  const [IdVuelo, setIdVuelo] = useState('');

  useEffect(() => {
    if (piloto) {
      setNombre(piloto.Nombre);
      setApellido(piloto.Apellido);
      setFechaNacimiento(piloto.FechaNacimiento);
      setNacionalidad(piloto.Nacionalidad);
      setIdVuelo(piloto.IdVuelo);
    }
  }, [piloto]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Nombre && Apellido && FechaNacimiento && Nacionalidad && IdVuelo) {
      onSave({
        ...piloto,
        Nombre: Nombre,
        Apellido: Apellido,
        FechaNacimiento: FechaNacimiento,
        Nacionalidad: Nacionalidad,
        IdVuelo: IdVuelo
      });
    } else {
      alert('Todos los campos deben estar completados para enviar.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="form-group">
          <label htmlFor="Nombre">Nombre:</label>
          <input
            id="Nombre"
            type="text"
            value={Nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Apellido">Apellido:</label>
          <input
            id="Apellido"
            type="text"
            value={Apellido}
            onChange={(event) => setApellido(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="FechaNacimiento">Fecha de Nacimiento:</label>
          <input
            id="FechaNacimiento"
            type="date"
            value={FechaNacimiento}
            onChange={(event) => setFechaNacimiento(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Nacionalidad">Nacionalidad:</label>
          <input
            id="Nacionalidad"
            type="text"
            value={Nacionalidad}
            onChange={(event) => setNacionalidad(event.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="IdVuelo">IdVuelo:</label>
          <input
            id="IdVuelo"
            type="number"
            value={IdVuelo}
            onChange={(event) => setIdVuelo(event.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="aceptar-button">Aceptar</button>
      </div>
    </form>
  );
};

export default PilotosForm;
