import React from 'react';
import '../../App.css'

const AvionFormFiltro = ({ fabricante, onFabricanteChange, onSubmit, onMostrarTodos }) => {
  return (
    <div>
      <h1>Filtrar aviones</h1>
      <div className="inputbox">
        <form onSubmit={onSubmit}>
          <div className="inputbox">
            <span>Fabricante</span>
              <input
                required
                type="text"
                id="fabricante"
                value={fabricante}
                onChange={onFabricanteChange}
              />
            
            <i></i>
          </div>
          <button type="submit" className="aceptar-button">Aceptar</button>
          <button type="button" className="aceptar-button" onClick={onMostrarTodos}>Mostrar todos</button>
        </form>
      </div>
    </div>

  );
};

export default AvionFormFiltro;
