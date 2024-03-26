import React, { createContext, useState } from 'react';

export const DepartamentoContext = createContext();

export const DepartamentoProvider = ({ children }) => {
  const [departamentos, setDepartamentos] = useState({
    Operaciones: [],
    Marketing: [],
    Ventas: [],
    Finanzas: [],
  });

  const cargarDepartamentos = (datos) => {
    if (Array.isArray(datos)) {
      const nuevosDepartamentos = datos.reduce((acc, { nombre, empleados = [] }) => ({
        ...acc,
        [nombre]: empleados,
      }), {});
      setDepartamentos(nuevosDepartamentos);
    } else {
      setDepartamentos((prev) => ({
        ...prev,
        [datos.nombre]: datos.empleados || [],
      }));
    }
  };

  const onAgregarDepartamento = (nombreDepartamento) => {
    setDepartamentos((prev) => ({
      ...prev,
      [nombreDepartamento]: prev[nombreDepartamento] ?? [],
    }));
  };

 // En DepartamentoProvider, ajustamos la función onAgregarEmpleadoADepartamento

// Dentro de DepartamentoProvider

const onAgregarEmpleadoADepartamento = async (departamentoId, empleado) => {
  try {
      const response = await fetch('http://localhost:5009/api/colaboradores', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nombre: empleado.nombre,
              departamentoId,
          }),
      });

      if (!response.ok) {
        // Lanzando error con el status para un diagnóstico más claro
        throw new Error(`La respuesta de la red no fue ok. Status: ${response.status}`);
      }

      const nuevoColaborador = await response.json();

      // Aquí asumimos que el departamentoId es el nombre del departamento para simplificar
      // Si tu estructura de datos es diferente, ajusta esta lógica acorde a ella
      setDepartamentos(prev => ({
          ...prev,
          [departamentoId]: [...prev[departamentoId], nuevoColaborador],
      }));
  } catch (error) {
      console.error("Error al añadir colaborador:", error);
      throw error; // Propagar el error para manejarlo en el componente
  }
};

  

  const onEliminarEmpleadoDeDepartamento = (nombreDepartamento, empleadoId) => {
    setDepartamentos((prev) => ({
      ...prev,
      [nombreDepartamento]: prev[nombreDepartamento]?.filter(({ id }) => id !== empleadoId) ?? [],
    }));
  };

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
