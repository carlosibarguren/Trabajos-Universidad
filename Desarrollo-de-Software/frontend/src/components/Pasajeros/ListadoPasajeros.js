import React from 'react';

const ListadoPasajeros = ({ lista }) => {

  if (lista.error) {
    return <p>{lista.error}</p>;
  } else if (lista.message) {
    return <p>{lista.message}</p>;
  }

  return (
    <div>
      <table className="listado-pasajeros-table">
        <thead>
        <tr>
            <th>Idpasajero</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>IdVuelo</th>
          </tr>
        </thead>
        <tbody>
        {lista.map((pasajero) => (
            <tr key={pasajero.IdPasajero}>
              <td>{pasajero.IdPasajero}</td>
              <td>{pasajero.Nombre}</td>
              <td>{pasajero.Apellido}</td>
              <td>{pasajero.FechaNacimiento}</td>
              <td>{pasajero.IdVuelo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoPasajeros;
