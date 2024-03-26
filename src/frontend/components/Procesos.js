import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Procesos.css';

const Procesos = () => {
  const [procesosGuardados, setProcesosGuardados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const response = await fetch('http://localhost:5009/api/procesos');
        if (response.ok) {
          const procesos = await response.json();
          setProcesosGuardados(procesos);
        } else {
          console.error('Error al cargar los procesos');
        }
      } catch (error) {
        console.error('Error al cargar los procesos:', error);
      }
    };

    fetchProcesos();
  }, []);

  const handleAddProcesoClick = () => navigate('/AñadirProceso');
  
  return (
    <div className="procesos-container">
      <button className="procesos-btn-add" onClick={handleAddProcesoClick}>Añadir Proceso</button>      {procesosGuardados.length > 0 ? (
        <div className="procesos-table-container">
          <table className="procesos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Departamento</th>
                <th>Herramientas</th>
                <th>Responsable</th>
                <th>Colaboradores</th>
                <th>Objetivo</th>
              </tr>
            </thead>
            <tbody>
              {procesosGuardados.map((proceso, index) => (
                <tr key={index}>
                  <td>{proceso.nombre}</td>
                  <td>{proceso.tipo}</td>
                  <td>{proceso.departamento}</td>
                  <td>{proceso.herramientas}</td>
                  <td>{proceso.responsable}</td>
                  <td>{proceso.colaboradores}</td>
                  <td>{proceso.objetivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay procesos guardados.</p>
      )}
    </div>
  );
};

export default Procesos;
