import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Añadirprocesos.css';

const AñadirProceso = () => {
  const navigate = useNavigate();
  const [proceso, setProceso] = useState({
    nombre: '',
    tipo: '',
    departamento: '', // No obligatorio
    herramientas: '',
    responsable: '', // No obligatorio
    colaboradores: '',
    objetivo: '',
  });

  const handleChange = ({ target: { name, value } }) =>
    setProceso((prevProceso) => ({
      ...prevProceso,
      [name]: value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica ajustada
    if (!proceso.nombre || !proceso.tipo || !proceso.herramientas) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5009/api/procesos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proceso),
      });

      if (response.ok) {
        alert('Proceso añadido con éxito');
        navigate('/procesos');
      } else {
        const errorData = await response.json();
        alert(`Error al guardar el proceso: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving the process:', error);
      alert('Error al guardar el proceso.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="proceso-form">
      <div className="form-row">
        <label className="form-label" htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={proceso.nombre}
          onChange={handleChange}
          className="form-input"
        />
      </div>
  
      <div className="form-row">
        <label className="form-label" htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={proceso.tipo}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Seleccione un tipo...</option>
          <option value="Operativo">Operativo</option>
          <option value="Estrategico">Estratégico</option>
          <option value="Soporte">Soporte</option>
          <option value="Mejora continua">Mejora continua</option>
        </select>
      </div>
  
      <div className="form-row">
        <label className="form-label" htmlFor="departamento">Departamento:</label>
        <select
          id="departamento"
          name="departamento"
          className="form-select"
          value={proceso.departamento}
          onChange={handleChange}
        >
          {/* Opciones de departamento */}
        </select>
      </div>
  
      <div className="form-row">
        <label className="form-label" htmlFor="herramientas">Herramientas:</label>
        <input
          type="text"
          id="herramientas"
          name="herramientas"
          value={proceso.herramientas}
          onChange={handleChange}
          className="form-input"
        />
      </div>
  
      <div className="form-row">
        <label className="form-label" htmlFor="responsable">Responsable:</label>
        <select
          id="responsable"
          name="responsable"
          value={proceso.responsable}
          onChange={handleChange}
          className="form-select"
        >
          {/* Opciones de responsable */}
        </select>
      </div>
  
      <div className="form-row">
        <label className="form-label" htmlFor="colaboradores">Colaboradores:</label>
        <input
          type="text"
          id="colaboradores"
          name="colaboradores"
          value={proceso.colaboradores}
          onChange={handleChange}
          className="form-input"
        />
      </div>
  
      <div className="form-row">
        <label className="form-label" htmlFor="objetivo">Objetivo:</label>
        <textarea
          id="objetivo"
          name="objetivo"
          value={proceso.objetivo}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>
  
      <div className="form-actions">
        <button type="submit" className="form-button">Guardar</button>
      </div>
    </form>
  );  
};

export default AñadirProceso;