import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Procesos.css';

const useProcesos = () => {
  const [procesosGuardados, setProcesosGuardados] = useState([]);

  useEffect(() => {
    const procesoData = localStorage.getItem('procesos');
    const procesos = procesoData ? JSON.parse(procesoData) : [];
    setProcesosGuardados(procesos);
  }, []);

  const guardarProcesoEnLocal = (nuevoProceso) => {
    setProcesosGuardados((prevProcesos) => {
      const procesosActualizados = [...prevProcesos, nuevoProceso];
      localStorage.setItem('procesos', JSON.stringify(procesosActualizados));
      return procesosActualizados;
    });
  };

  return [procesosGuardados, guardarProcesoEnLocal];
};

const Procesos = () => {
  const [procesosGuardados, cargarProcesos] = useProcesos();
  const navigate = useNavigate();
  const location = useLocation();

  const saveProcess = useCallback(async (nuevoProceso) => {
    try {
      const response = await fetch('http://localhost:5009/api/procesos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProceso),
      });

      if (response.ok) {
        cargarProcesos(); // Recarga la lista de procesos después de guardar
      } else {
        console.error('Error al guardar el proceso:', response.statusText);
      }
    } catch (error) {
      console.error('Error al guardar el proceso:', error);
    }
  }, [cargarProcesos]);

  useEffect(() => {
    if (location.state?.proceso) {
      saveProcess(location.state.proceso);
    }
  }, [location.state, saveProcess]);


  const handleAddProcesoClick = () => {
    navigate('/AñadirProceso');
  };

  return (
    <div className="procesos-container">
      <button className="procesos-btn-add" onClick={handleAddProcesoClick}>Añadir Proceso</button>
      {procesosGuardados.length > 0 ? (
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
