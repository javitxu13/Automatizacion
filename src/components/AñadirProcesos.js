import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AñadirProceso = () => {
  const navigate = useNavigate();
  const [proceso, setProceso] = useState({
    nombre: '',
    tipo: '',
    departamento: '',
    herramientas: '',
    responsable: '',
    colaboradores: '',
    objetivo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProceso((prevProceso) => ({
      ...prevProceso,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(proceso);
    navigate('/procesos', { state: proceso });  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={proceso.nombre} onChange={handleChange} />
      </label>
      <label>
        Tipo:
        <select name="tipo" value={proceso.tipo} onChange={handleChange}>
          <option value="">Seleccione un tipo...</option>
          <option value="Operativo">Operativo</option>
          <option value="Estrategico">Estratégico</option>
          <option value="Soporte">Soporte</option>
          <option value="Mejora continua">Mejora continua</option>
        </select>
      </label>
      <label>
        Departamento:
        <select name="departamento" value={proceso.departamento} onChange={handleChange}>
          {/* Opciones de departamento */}
        </select>
      </label>
      <label>
        Herramientas:
        <input type="text" name="herramientas" value={proceso.herramientas} onChange={handleChange} />
      </label>
      <label>
        Responsable:
        <select name="responsable" value={proceso.responsable} onChange={handleChange}>
          {/* Opciones de responsable */}
        </select>
      </label>
      <label>
        Colaboradores:
        <input type="text" name="colaboradores" value={proceso.colaboradores} onChange={handleChange} />
      </label>
      <label>
        Objetivo:
        <textarea name="objetivo" value={proceso.objetivo} onChange={handleChange} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AñadirProceso;
