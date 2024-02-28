import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioNombre from './FormularioNombre';
import FormularioEmpresa from './FormularioEmpresa';

const Inicio = () => {
  const [usuario, setUsuario] = useState({
    nombre: '', 
    correo: '', 
    empresa: {
      nombreEmpresa: '',
      industria: '',
      telefono: '',
    },
    personasEmpresa: ''
  });
  const [pasoActual, setPasoActual] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (pasoActual < 2) {
      setPasoActual(pasoActual + 1);
    } else {
      navigate('/dashboard');
    }
  };

  // Ajustado para manejar cambios en los formularios específicos
  const handleInputChange = (name, value) => {
    setUsuario({ ...usuario, [name]: value });
  };

  // Para manejar cambios en el formulario de la empresa
  const handleEmpresaChange = (nuevosValores) => {
    setUsuario({ ...usuario, empresa: nuevosValores });
  };

  return (
    <div>
      {pasoActual === 1 && (
        <FormularioNombre
          valor={usuario.nombre}
          onChange={(e) => handleInputChange('nombre', e.target.value)}
          onNext={handleNextStep}
        />
      )}
  
      {pasoActual === 2 && (
        <FormularioEmpresa
          valor={usuario.empresa}
          onChangeValor={handleEmpresaChange} // Asegúrate de que FormularioEmpresa utilice onChangeValor para actualizar el estado
          onNext={handleNextStep}
        />
      )}
    </div>
  );
};

export default Inicio;
