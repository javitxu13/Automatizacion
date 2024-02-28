import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Procesos = () => {
  const [procesoGuardado, setProcesoGuardado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


 
  useEffect(() => {
    // Verificar si hay estado disponible en la ubicación de navegación
    if (location.state) {
      setProcesoGuardado(location.state);
      localStorage.setItem('proceso', JSON.stringify(location.state)); // Opcional: Guardar en localStorage
    }
  }, [location]);

  // Función para manejar el click del botón
  const handleAddProcesoClick = () => {
    navigate('/AñadirProceso');
  };



  return (
    <div>
      <button onClick={handleAddProcesoClick}>Añadir Proceso</button>
      {procesoGuardado && (
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
            <tr>
              <td>{procesoGuardado.nombre}</td>
              <td>{procesoGuardado.tipo}</td>
              <td>{procesoGuardado.departamento}</td>
              <td>{procesoGuardado.herramientas}</td>
              <td>{procesoGuardado.responsable}</td>
              <td>{procesoGuardado.colaboradores}</td>
              <td>{procesoGuardado.objetivo}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Procesos;
