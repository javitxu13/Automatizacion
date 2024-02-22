import React, { useState } from 'react';
import { db } from '../page/Firebase'; // Corrected import path
import { collection, doc,writeBatch } from 'firebase/firestore';

const Procesos = () => {
  const [procesos, setProcesos] = useState([]);

  const agregarNuevoProceso = () => {
    setProcesos([
      ...procesos,
      { nombre: '', departamento: '', responsable: '', objetivo: '', procedimiento: '', herramientas: [] },
    ]);
  };

  const guardarProcesos = async () => {
    // Crear una batch para guardar todos los documentos juntos
    const batch = writeBatch(db);
    
    try {
      const procesosColRef = collection(db, 'procesos');
      procesos.forEach(async (proceso) => {
        const docRef = doc(procesosColRef); // Crea una referencia de documento
        batch.set(docRef, proceso); // Agrega el set del documento a la batch
      });

      await batch.commit(); // Realiza la operación batch
      console.log('Todos los procesos han sido guardados en Firestore');
    } catch (error) {
      console.error("Error al guardar los procesos:", error);
    }
  };

  const handleInputChange = (index, campo, e) => {
    const valor = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    const nuevosProcesos = procesos.map((proceso, i) => (
      i === index ? { ...proceso, [campo]: valor } : proceso
    ));
    setProcesos(nuevosProcesos);
  };

  return (
    <div>
      <button onClick={agregarNuevoProceso}>Nuevo proceso +</button>
      <button onClick={guardarProcesos}>Guardar Procesos</button>
      {procesos.map((proceso, index) => (
        <div key={index}>
          <form>
            <label>
              Nombre:
              <input type="text" value={proceso.nombre} onChange={(e) => handleInputChange(index, 'nombre', e)} />
            </label>
            <label>
              Departamento:
              <select value={proceso.departamento} onChange={(e) => handleInputChange(index, 'departamento', e)}>
                <option value="">Seleccionar...</option>
                <option value="administracion">Administración</option>
                <option value="finanzas">Finanzas</option>
                <option value="ventas">Ventas</option>
                <option value="marketing">Marketing</option>
                <option value="it">IT</option>
                <option value="recursos_humanos">Recursos Humanos</option>
              </select>
            </label>
            <label>
              Responsable:
              <input type="number" value={proceso.responsable} onChange={(e) => handleInputChange(index, 'responsable', e)} />
            </label>
            <label>
              Objetivo:
              <input type="text" value={proceso.objetivo} onChange={(e) => handleInputChange(index, 'objetivo', e)} />
            </label>
            <label>
              Procedimiento:
              <input type="text" value={proceso.procedimiento} onChange={(e) => handleInputChange(index, 'procedimiento', e)} />
            </label>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Procesos;
