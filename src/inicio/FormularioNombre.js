import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { db,auth } from '../page/Firebase'; // Asegúrate de que esta es tu ruta correcta
import { collection, addDoc } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";

const FormularioNombre = ({ onNext }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [rol, setRol] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // Agrega el hook useNavigate

  const esNombreValido = (nombre) => /^[A-Za-z\s]{1,50}$/.test(nombre);
  const esApellidosValido = (apellidos) => /^[A-Za-z\s]{1,50}$/.test(apellidos);
  const esRolValido = (rol) => rol.length > 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nombre': setNombre(value); break;
      case 'apellidos': setApellidos(value); break;
      case 'rol': setRol(value); break;
      default: break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!esNombreValido(nombre) || !esApellidosValido(apellidos) || !esRolValido(rol)) {
      alert("Por favor, asegúrate de que todos los campos son válidos.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        apellidos,
        rol,
      });
  
      console.log("Documento escrito con ID: ", docRef.id);
  
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${nombre} ${apellidos}`,
        });
        console.log("Nombre y apellido actualizados en el perfil de autenticación");
      }

      navigate('/rol'); // Redirige al usuario
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error. Por favor, intenta de nuevo.");
  } finally {
    setIsLoading(false); // Finaliza la carga
  }
};
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">
        Nombre:
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={handleInputChange}
          className={esNombreValido(nombre) ? 'valid' : 'invalid'}
        />
      </label>
      <br />
      <label htmlFor="apellidos">
        Apellidos:
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={apellidos}
          onChange={handleInputChange}
          className={esApellidosValido(apellidos) ? 'valid' : 'invalid'}
        />
      </label>
      <br />
      <label htmlFor="rol">
  ¿Cómo definirías tu rol?
  <select
    id="rol"
    name="rol"
    value={rol}
    onChange={handleInputChange}
    className={esRolValido(rol) ? 'valid' : 'invalid'}
  >
    <option value="">Selecciona tu rol</option>
    <option value="C-Level">C-Level</option>
    <option value="Gestor de proyectos">Gestor de proyectos</option>
    <option value="Equipo de operaciones">Equipo de operaciones</option>
    <option value="Equipo de IT">Equipo de IT</option>
    <option value="Equipo de RRHH">Equipo de RRHH</option>
    <option value="Equipo de Finanzas">Equipo de Finanzas</option>
    <option value="Equipo de Marketing">Equipo de Marketing</option>
    <option value="Equipo de Ventas">Equipo de Ventas</option>
    <option value="Equipo de Soporte">Equipo de Soporte</option>
    <option value="Equipo Legal">Equipo Legal</option>
    <option value="Equipo de I+D+i">Equipo de I+D+i</option>
  </select>
</label>

      <br />
      <button type="submit" disabled={isLoading || !(esNombreValido(nombre) && esApellidosValido(apellidos) && esRolValido(rol))}>
        {isLoading ? 'Registrando...' : 'Siguiente'}
      </button>
    </form>
  );
};

export default FormularioNombre;
