import React, { useContext, useEffect, useState } from 'react';
import '../style/Organizacion.css';
import { useNavigate } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

const Organizacion = () => {
  const { departamentos, cargarDepartamentos, onEliminarEmpleadoDeDepartamento } = useContext(DepartamentoContext);
  const [cargando, setCargando] = useState(false);
  const [error] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        // Cambio a GET para cargar los departamentos existentes
        const response = await fetch('http://localhost:5009/api/organizacion', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          console.error("Error en la respuesta");
          return;
        }
  
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          cargarDepartamentos(data); // Esta función debe adaptarse si la estructura de datos lo requiere
        } else {
          console.log("No se recibió JSON");
        }
      } catch (error) {
        console.error("Error al cargar datos", error);
      } finally {
        setCargando(false);
      }
    };
  
    cargarDatos();
  }, [cargarDepartamentos]);
  

  const agregarDepartamento = () => {
    navigate('/añadir-departamento');
  };

  const agregarColaborador = (nombreDepartamento, departamentoId) => {
  navigate('/añadir-colaborador', { state: { departamento: nombreDepartamento, departamentoId: departamentoId } });
  };

  if (cargando) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="organizaciones">
      <h1>Organización XYZ</h1>
      <button className="agregar-departamento" onClick={agregarDepartamento}>
        Nuevo Departamento
      </button>
      <div className="departamento-list">
        {Object.keys(departamentos).length > 0 ? (
          Object.keys(departamentos).map(departamento => (
            <div key={departamento} className="departamento">
              <h2>{departamento}</h2>
              <ul>
                {departamentos[departamento].map((empleado, index) => (
                  <li key={index}>
                    {empleado?.nombre} - {empleado?.departamentoNombre}
                    <button className="eliminar-colaborador" onClick={() => onEliminarEmpleadoDeDepartamento(departamento, empleado?.id)}>
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="agregar-colaborador"
                onClick={() => agregarColaborador(departamento, departamento)} // Note: Assuming departamento is both the name and the ID; adjust accordingly
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

export { Organizacion };
