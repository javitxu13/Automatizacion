import React, { createContext, useState, useCallback } from 'react';

export const DepartamentoContext = createContext(null);

export const DepartamentoProvider = ({ children }) => {
  const [departamentos, setDepartamentos] = useState({
    Operaciones: [],
    Marketing: [],
    Ventas: [],
    Finanzas: [],
  });

  const onAgregarDepartamento = useCallback((nombreDepartamento) => {
    setDepartamentos((prev) => ({ ...prev, [nombreDepartamento]: [] }));
  }, []);

  const onAgregarEmpleadoADepartamento = useCallback((nombreDepartamento, nombreEmpleado) => {
    setDepartamentos((prev) => ({
      ...prev,
      [nombreDepartamento]: [...prev[nombreDepartamento], nombreEmpleado],
    }));
  }, []);

  const onEliminarEmpleadoDeDepartamento = useCallback((nombreDepartamento, indexEmpleado) => {
    setDepartamentos((prev) => ({
      ...prev,
      [nombreDepartamento]: prev[nombreDepartamento].filter((_, index) => index !== indexEmpleado),
    }));
  }, []);

  const value = {
    departamentos,
    onAgregarDepartamento,
    onAgregarEmpleadoADepartamento,
    onEliminarEmpleadoDeDepartamento,
  };

  return (
    <DepartamentoContext.Provider value={value}>
      {children}
    </DepartamentoContext.Provider>
  );
};
