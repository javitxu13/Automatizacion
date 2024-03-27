import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

const AnadirDepartamento = () => {
  const [nombre, setNombre] = useState('');
  const { cargarDepartamentos } = useContext(DepartamentoContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoDepartamento = { nombre };

    try {
      const response = await fetch('http://localhost:5009/api/departamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoDepartamento),
      });

      if (response.ok) {
        const departamentoAgregado = await response.json();
        // Asumiendo que cargarDepartamentos actualiza el contexto global adecuadamente
        // y el nuevo departamento se reflejará en la lista de departamentos
        cargarDepartamentos(departamentoAgregado);

        // Redirige al usuario a la página de organización después de agregar con éxito
        navigate('/departamentos');
      } else {
        console.error('Error al añadir el departamento');
      }
    } catch (error) {
      console.error('Error al añadir el departamento:', error);
    }
  };

  return (
    <div className="anadir-departamento">
      <h2>Añadir nuevo departamento</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Departamento:</label>
        <input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">Añadir Departamento</button>
      </form>
    </div>
  );
};

export default AnadirDepartamento;
