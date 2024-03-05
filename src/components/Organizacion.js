import React, { useContext } from 'react';
import '../style/Organizacion.css';
import { useNavigate } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

const Organizacion = () => {
  const { departamentos, onEliminarEmpleadoDeDepartamento } = useContext(DepartamentoContext);
  const navigate = useNavigate();

  const agregarDepartamento = () => {
    navigate('/añadir-departamento');
  };

  const agregarColaborador = (departamento) => {
    navigate('/añadir-colaborador', { state: { departamento } });
  };

  return (
    <div className="organizaciones">
      <h1>Organización XYZ</h1>
      <button className="agregar-departamento" onClick={agregarDepartamento}>
        Nuevo Departamento
      </button>
      <div className="departamento-list">
        {Object.keys(departamentos).map((departamento) => (
          <div key={departamento} className="departamento">
            <h2>{departamento}</h2>
            <ul>
              {departamentos[departamento].map((empleado, index) => (
                <li key={index}>
                  {empleado}
                  <button className="eliminar-colaborador" onClick={() => onEliminarEmpleadoDeDepartamento(departamento, index)}> - </button>
                </li>
              ))}
            </ul>
            <button className="agregar-colaborador" onClick={() => agregarColaborador(departamento)}>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Organizacion };
