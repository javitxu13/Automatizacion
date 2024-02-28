import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Procesos = () => {
  const [procesosGuardados, setProcesosGuardados] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const procesoData = localStorage.getItem('procesos');
    const procesos = procesoData ? JSON.parse(procesoData) : [];
    setProcesosGuardados(procesos);
  }, []);

  // Añadir nuevo proceso desde location.state a la lista existente
  useEffect(() => {
    if (location.state?.proceso) {
      setProcesosGuardados(currentProcesos => {
        const nuevoProceso = location.state.proceso;
        const nuevosProcesos = [...currentProcesos, nuevoProceso];
  
        localStorage.setItem('procesos', JSON.stringify(nuevosProcesos));
        navigate('/procesos', { replace: true, state: {} });
        return nuevosProcesos; // Actualiza el estado con la lista actualizada
      });
    }
  }, [location.state]); // Dependencia solo en location.state
  
  
  
  
  

  // Función para manejar el click del botón
  const handleAddProcesoClick = () => {
    navigate('/AñadirProceso');
  };



  return (
    <div>
      <button onClick={handleAddProcesoClick}>Añadir Proceso</button>
      {procesosGuardados.length > 0 && (
  <table>
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
)}

    </div>
  );
};

export default Procesos;
