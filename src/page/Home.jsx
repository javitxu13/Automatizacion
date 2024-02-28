import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from "./Firebase"; // Asegúrate de que estas son tus rutas correctas
import { useAuth } from './AuthContext';
import Notificaciones from '../perfil/Notificaciones';
import './../style/Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("default-profile.png");
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    if (user?.photoURL) {
      setProfileImageUrl(user.photoURL);
    }
  }, [user]); // Este efecto se ejecuta cada vez que 'user' cambia.

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, "usuarios", auth.currentUser.uid);
      getDoc(userRef).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Datos del documento:", docSnap.data());
          setNombre(docSnap.data().nombre);
          setApellido(docSnap.data().apellidos);
        } else {
          console.log("No se encontró el documento!");
        }
      }).catch(error => {
        console.error("Error al obtener el documento:", error);
      });
    }
  }, [auth.currentUser]); // Si dependes del estado de 'auth.currentUser', añádelo aquí. Si no cambia, este efecto solo se ejecutará una vez.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonte.
  }, []); // Sin dependencias, este efecto se ejecuta solo al montar y desmontar el componente.

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="home-container">
      <div className="user-info">
        <Notificaciones />
        <p className="user-name">{`${nombre} ${apellido}`}</p>
        <div className="profile-section" onClick={toggleDropdown} role="button" tabIndex="0">
          {user && (
            <div className="profile-image-container">
              <img src={profileImageUrl} alt="Perfil del Usuario" className="profile-image" />
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
