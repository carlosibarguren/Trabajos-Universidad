const AvionesListSeleccion = ({ lista, onSelect }) => {
  

    if (lista.length === 0) {
      return <p>No hay aviones encontrados.</p>;
    }
  
    return (
      <div className="container mt-3">
        <h1>Listado de Aviones</h1>
        <table className="listado listado-striped">
          <thead>
            <tr>
              <th>IdAvion</th>
              <th>Modelo</th>
              <th>Fecha de fabricacion</th>
              <th>Capacidad de carga</th>
              <th>Capacidad de pasajeros</th>
              <th>Fabricante</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((avion) => (
              <tr key={avion.ID}>
                <td>{avion.ID}</td>
                <td>{avion.Modelo}</td>
                <td>{avion.Fecha}</td>
                <td>{avion.CapacidadDeCarga}</td>
                <td>{avion.CapacidadDePasajeros}</td>
                <td>{avion.Fabricante}</td>
                <td><button className="editar-button" onClick={() => {onSelect(avion);
                                                                      window.scrollTo(0, 0)}}>Seleccionar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AvionesListSeleccion;
  
  
  