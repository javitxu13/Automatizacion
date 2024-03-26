import React, { createContext, useState, useCallback } from 'react';

export const DepartamentoContext = createContext();

export const DepartamentoProvider = ({ children }) => {
  const [departamentos, setDepartamentos] = useState({
    Operaciones: [],
    Marketing: [],
    Ventas: [],
    Finanzas: [],
  });

  const cargarDepartamentos = useCallback((datos) => {
    // Si los datos son un array, asume que es una carga inicial
    if (Array.isArray(datos)) {
      const nuevosDepartamentos = datos.reduce((acc, { nombre, empleados = [] }) => ({
        ...acc,
        [nombre]: empleados,
      }), {});
      setDepartamentos(nuevosDepartamentos);
    } else {
      // Si los datos no son un array, asume que se está añadiendo un nuevo departamento
      const { nombre, empleados = [] } = datos;
      setDepartamentos(prev => ({ ...prev, [nombre]: empleados }));
    }
  }, []);
  

  const onAgregarColaborador = useCallback((nombreColaborador, departamentoId) => {
    if (!departamentoId || !departamentos[departamentoId]) return false;

    setDepartamentos(prevDepartamentos => ({
      ...prevDepartamentos,
      [departamentoId]: [...prevDepartamentos[departamentoId], { nombre: nombreColaborador }],
    }));

    return true;
  }, [departamentos]);

  const onAgregarDepartamento = useCallback((nombreDepartamento) => {
    setDepartamentos((prev) => ({
      ...prev,
      [nombreDepartamento]: prev[nombreDepartamento] ?? [],
    }));
  }, []);

  const onEliminarEmpleadoDeDepartamento = useCallback((nombreDepartamento, empleadoId) => {
    setDepartamentos((prev) => ({
      ...prev,
      [nombreDepartamento]: prev[nombreDepartamento]?.filter(({ id }) => id !== empleadoId) ?? [],
    }));
  }, []);

  const value = {
    departamentos,
    onAgregarDepartamento,
    onEliminarEmpleadoDeDepartamento,
    cargarDepartamentos,
    onAgregarColaborador
  };

  return (
    <DepartamentoContext.Provider value={value}>
      {children}
    </DepartamentoContext.Provider>
  );
};
