import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importación de la librería UUID para generar IDs únicos para los empleados

export const DepartamentoContext = createContext();

export const DepartamentoProvider = ({ children }) => {
  // Estado inicial de los departamentos
  const [departamentos, setDepartamentos] = useState({
    Operaciones: [],
    Marketing: [],
    Ventas: [],
    Finanzas: [],
  });


// Modificar dentro de tu DepartamentoProvider
const cargarDepartamentos = (datos) => {
  if (Array.isArray(datos)) {
    // Asumiendo que 'datos' es un arreglo de objetos departamento desde el backend
    const nuevosDepartamentos = datos.reduce((acc, cur) => ({
      ...acc,
      [cur.nombre]: cur.empleados || [], // Asume que cada departamento viene con una propiedad 'empleados'
    }), {});
    setDepartamentos(nuevosDepartamentos);
  } else {
    // Manejar la adición de un único departamento
    setDepartamentos(prevDepartamentos => ({
      ...prevDepartamentos,
      [datos.nombre]: datos.empleados || [], // Asume que el nuevo departamento viene sin empleados
    }));
  }
};


  // Función para añadir un nuevo departamento
  const onAgregarDepartamento = (nombreDepartamento) => {
    if (!departamentos[nombreDepartamento]) {
      setDepartamentos(deptosPrevios => ({
        ...deptosPrevios,
        [nombreDepartamento]: [],
      }));
    } else {
      console.error('El departamento ya existe.');
    }
  };

  

  const onAgregarEmpleadoADepartamento = (nombreDepartamento, empleado) => {
    setDepartamentos(prevDepartamentos => {
        // Crear un nuevo objeto de empleado con un ID único
        const empleadoConId = { ...empleado, id: uuidv4() }; 

        // Comprobar si el departamento ya existe
        const departamentoExiste = prevDepartamentos.hasOwnProperty(nombreDepartamento);
        if (departamentoExiste) {
            // Si el departamento existe, añade el empleado al departamento
            return {
                ...prevDepartamentos,
                [nombreDepartamento]: [...prevDepartamentos[nombreDepartamento], empleadoConId],
            };
        } else {
            // Si el departamento no existe, muestra un error (o podrías optar por crear el departamento)
            console.error('El departamento no existe.');
            return { ...prevDepartamentos };
        }
    });
};

  
  // Función para eliminar un empleado de un departamento
  const onEliminarEmpleadoDeDepartamento = (nombreDepartamento, empleadoId) => {
    if (departamentos[nombreDepartamento]) {
      setDepartamentos(deptosPrevios => ({
        ...deptosPrevios,
        [nombreDepartamento]: deptosPrevios[nombreDepartamento].filter(empleado => empleado.id !== empleadoId),
      }));
    } else {
      console.error('El departamento no existe.');
    }
  };

  // El valor que se pasa a todos los componentes que consumen este contexto
  const value = {
    departamentos,
    onAgregarDepartamento,
    onAgregarEmpleadoADepartamento,
    onEliminarEmpleadoDeDepartamento,
    cargarDepartamentos,
  };

  return (
    <DepartamentoContext.Provider value={value}>
      {children}
    </DepartamentoContext.Provider>
  );
};
