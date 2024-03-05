import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

const AñadirColaborador = () => {
  const [nombre, setNombre] = useState('');
  const { onAgregarEmpleadoADepartamento } = useContext(DepartamentoContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera el nombre del departamento desde el estado de navegación
  const { departamento } = location.state || { departamento: '' };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('Por favor, ingrese un nombre válido para el colaborador.');
      return;
    }

    onAgregarEmpleadoADepartamento(departamento, nombre);
    setNombre(''); // Limpia el campo de texto después de agregar
    navigate('/organizacion'); // O redirige a donde consideres apropiado
  };

  return (
    <div>
      <h2>Añadir Colaborador al Departamento: {departamento}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Colaborador:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <button type="submit">Añadir Colaborador</button>
      </form>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default AñadirColaborador;
