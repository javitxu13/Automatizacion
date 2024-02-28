import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { db, auth } from '../page/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

const SelectorDeRol = ({ onRolSelected }) => {
  const [rol, setRol] = useState('');
  const navigate = useNavigate(); // Crea la instancia de navigate

  useEffect(() => {
    const guardarRolEnFirestore = async () => {
      if (rol.length > 0 && typeof onRolSelected === 'function') {
        onRolSelected(rol); 
        if (auth.currentUser) {
          const userDocRef = doc(db, "usuarios", auth.currentUser.uid);
          try {
            await updateDoc(userDocRef, {
              rol: rol,
            });
            console.log("Rol actualizado con éxito");
          } catch (error) {
            console.error("Error al actualizar el rol:", error);
          }
        }
      }
    };

    guardarRolEnFirestore();
  }, [rol, onRolSelected]);

  const handleRolChange = (e) => {
    setRol(e.target.value);
  };

  const handleNextClick = () => {
    navigate('/empresas'); // Redirige al usuario a /rol
  };

  const rolesOptions = [
    "C-Level", "Gestor de proyectos", "Equipo de operaciones", "Equipo de IT",
    "Equipo de RRHH", "Equipo de Finanzas", "Equipo de Marketing", "Equipo de Ventas",
    "Equipo de Soporte", "Equipo Legal", "Equipo de I+D+i"
  ];

  return (
    <div className="selector-rol-container">
      <label htmlFor="rol">¿Cómo definirías tu rol?</label>
      <select
        id="rol"
        name="rol"
        value={rol}
        onChange={handleRolChange}
        className={rol.length > 0 ? 'valid' : 'invalid'}
        role="listbox"
      >
        <option value="">Selecciona tu rol</option>
        {rolesOptions.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      {/* Botón Siguiente */}
      <button onClick={handleNextClick} disabled={!rol}>Siguiente</button>
    </div>
  );
};

export default SelectorDeRol;
