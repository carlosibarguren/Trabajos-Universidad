import React from 'react';

const ListadoVuelos = ({ lista }) => {

  if (lista.error) {
    return <p>{lista.error}</p>;
  } else if (lista.message) {
    return <p>{lista.message}</p>;
  }

  return (
    <div>
      <table className="listado-vuelos-table">
        <thead>
          <tr>
            <th>Id del Vuelo</th>
            <th>Nombre del Vuelo</th>
            <th>Fecha Despegue</th>
            <th>Precio del Vuelo</th>
            <th>Id del Avion</th>
            <th>Id Aeropuerto Origen</th>
            <th>Id Aeropuerto Destino</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((vuelo) => (
            <tr key={vuelo.IdVuelo}>
              <td>{vuelo.IdVuelo}</td>
              <td>{vuelo.NombreVuelo}</td>
              <td>{vuelo.FechaDespegue}</td>
              <td>{vuelo.Precio}</td>
              <td>{vuelo.IdAvion}</td>
              <td>{vuelo.IdAeropuertoOrigen}</td>
              <td>{vuelo.IdAeropuertoDestino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoVuelos;
