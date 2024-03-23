import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Función para realizar la solicitud a la API, ahora fuera del componente
const actualizarRolEnDB = async (rol, setEstadoGlobal) => {
  setEstadoGlobal({ isLoading: true, error: null });
  try {
    const response = await fetch('http://localhost:5009/api/rol', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nuevoRol: rol }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Rol actualizado con éxito:", data);
    setEstadoGlobal({ isLoading: false });
    return true;
  } catch (error) {
    setEstadoGlobal({ isLoading: false, error: `Error al actualizar el rol: ${error.message}` });
    return false;
  }
};

const SelectorDeRol = ({ onRolSelected }) => {
  const [rol, setRol] = useState('');
  const [estadoGlobal, setEstadoGlobal] = useState({ isLoading: false, error: null });
  const navigate = useNavigate();

  const handleRolChange = ({ target: { value } }) => setRol(value);

  const handleNextClick = async () => {
    if (!rol) {
      setEstadoGlobal({ ...estadoGlobal, error: "Por favor, seleccione un rol antes de continuar." });
      return;
    }
    const success = await actualizarRolEnDB(rol, setEstadoGlobal);
    if (success) {
      onRolSelected && onRolSelected(rol);
      navigate('/empresas');
    }
  };

  const rolesOptions = [
    "C-Level", "Gestor de proyectos", "Equipo de operaciones", "Equipo de IT",
    "Equipo de RRHH", "Equipo de Finanzas", "Equipo de Marketing", "Equipo de Ventas",
    "Equipo de Soporte", "Equipo Legal", "Equipo de I+D+i"
  ];

  return (
    <div className="selector-rol-container">
      {estadoGlobal.error && <p className="error">{estadoGlobal.error}</p>}
      <label htmlFor="rol">¿Cómo definirías tu rol?</label>
      <select
        id="rol"
        name="rol"
        value={rol}
        onChange={handleRolChange}
        className={rol ? 'valid' : 'invalid'}
        aria-label="Selecciona tu rol"
      >
        <option value="">Selecciona tu rol</option>
        {rolesOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleNextClick} disabled={estadoGlobal.isLoading}>
        {estadoGlobal.isLoading ? 'Cargando...' : 'Siguiente'}
      </button>
    </div>
  );
};

export default SelectorDeRol;
