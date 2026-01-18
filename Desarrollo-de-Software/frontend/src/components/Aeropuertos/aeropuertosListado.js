import React from 'react';

const ListadoAeropuertos = ({ lista }) => {
  if (!Array.isArray(lista)) {
    return <p>No hay aeropuertos encontrados.</p>;
  }

  return (
    <div className="container mt-3">
      <h1>Listado de Aeropuertos</h1>
      <table className="listado listado-striped">
        <thead>
          <tr>
            <th>IdAeropuerto</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>Fecha de Inauguracion</th>
            <th>Codigo IATA</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((aeropuerto) => (
            <tr key={aeropuerto.IdAeropuerto}>
              <td>{aeropuerto.IdAeropuerto}</td>
              <td>{aeropuerto.Nombre}</td>
              <td>{aeropuerto.Ciudad}</td>
              <td>{aeropuerto.Pais}</td>
              <td>{aeropuerto.FechaInauguracion}</td>
              <td>{aeropuerto.CodigoIATA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoAeropuertos;
