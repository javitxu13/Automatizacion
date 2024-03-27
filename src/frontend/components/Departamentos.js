// Departamentos.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';
import '../style/Organizacion.css';

const Departamentos = () => {
  const { departamentos, onEliminarEmpleadoDeDepartamento } = useContext(DepartamentoContext);
  const [cargando] = useState(false);
  const [error] = useState('');
  const navigate = useNavigate();

  const agregarDepartamento = () => {
    navigate('/añadir-departamento');
  };

  const agregarColaborador = (nombreDepartamento, departamentoId) => {
    navigate('/añadir-colaborador', { state: { departamento: nombreDepartamento, departamentoId: departamentoId } });
  };

  return (
    <div className="organizaciones">
      <h1>Organización XYZ</h1>
      <button className="agregar-departamento" onClick={agregarDepartamento}>
        Nuevo Departamento
      </button>
      <div className="departamento-list">
        {Object.keys(departamentos).length > 0 ? (
          Object.entries(departamentos).map(([nombre, empleados]) => (
            <div key={nombre} className="departamento">
              <h2>{nombre}</h2>
              <ul>
                {empleados.map((empleado, index) => (
                  <li key={index}>
                    {empleado.nombre}
                    <button
                      className="eliminar-colaborador"
                      onClick={() => onEliminarEmpleadoDeDepartamento(nombre, empleado.id)}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="agregar-colaborador"
                onClick={() => agregarColaborador(nombre, nombre)}
              >
                +
              </button>
            </div>
          ))
        ) : (
          <p>No hay departamentos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export { Departamentos };