import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext'; // Import directly from DepartamentoContext.js in the same directory

const AñadirDepartamento = () => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { onAgregarDepartamento } = useContext(DepartamentoContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpiar errores previos
    if (!nombre.trim()) {
      setError('Por favor, ingresa un nombre válido para el departamento.');
      return;
    }
    setIsLoading(true); // Inicia la carga
    try {
      await onAgregarDepartamento(nombre); // Simula un proceso asíncrono
      setIsLoading(false); // Finaliza la carga
      navigate('/organizacion'); // Navegar de regreso al inicio o a la vista deseada
    } catch (e) {
      setError('Hubo un problema al añadir el departamento.');
      setIsLoading(false);
    }
  };

  return (
    <div className="añadir-departamento-container">
      <h2>Añadir departamento</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreDepartamento">Nombre del Departamento:</label>
        <input
          id="nombreDepartamento"
          type="text"
          aria-label="Nombre del Departamento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className={error ? 'input-error' : ''} // Estilizado condicional
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Departamento'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Mensajes de error */}
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default AñadirDepartamento;
