import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Asume que ahora usamos axios para hacer llamadas API
import { useAuth } from "./../../backend/context/AuthContext";
import Notificaciones from '../perfil/Notificaciones';
import './../style/Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState({
    imageUrl: "default-profile.png",
    nombre: '',
    apellido: ''
  });

  // Efecto para cargar el perfil del usuario
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        // Supongamos que ahora tienes un endpoint en tu backend para obtener la información del perfil
        const response = await axios.get(`/api/usuarios/${user.uid}`);
        const { nombre, apellido, photoURL } = response.data;
        setProfile({
          imageUrl: photoURL || "default-profile.png",
          nombre,
          apellido
        });
      } catch (error) {
        console.error("Error al obtener la información del perfil:", error);
      }
    };

    fetchProfile();
  }, [user]);

  // Efecto para manejar la autenticación del estado del usuario
  useEffect(() => {
    if (user === null) {
      navigate("/dashboard"); // Cambiado a /login para mayor claridad
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      // Suponiendo que ahora usas un servicio de autenticación en tu backend
      await axios.post('/api/logout');
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  return (
    <nav className="home-container">
      <div className="user-info">
        <Notificaciones />
        <p className="user-name">{`${profile.nombre} ${profile.apellido}`}</p>
        <div className="profile-section" onClick={toggleDropdown} role="button" tabIndex="0">
          {user && (
            <div className="profile-image-container">
              <img src={profile.imageUrl} alt="Perfil del Usuario" className="profile-image" />
            </div>
          )}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <Link to="/editar-perfil">Editar Perfil</Link>
          <Link to="/settings" onClick={toggleDropdown}>Configuración</Link>
          <Link to="/plan" onClick={toggleDropdown}>Plan</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </nav>
  );
};

export default Home;
