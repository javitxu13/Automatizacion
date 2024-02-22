import React, { useState, useContext, useRef } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "./Firebase";
import { useNavigate } from "react-router-dom";
import './../style/Home.css';
import AuthContext from './AuthContext';

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const profileImageUrl = user ? user.photoURL : "default-profile.png";

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);

      await updateProfile(auth.currentUser, { photoURL });
      setUser({ ...user, photoURL }); // Actualiza el estado local del usuario

    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert("Error al cargar la imagen. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <nav className="home-container">
      <div className="user-info">
        <p className="user-name">{user ? user.displayName || user.email : "Guest"}</p>
        <div className="profile-section" onClick={toggleDropdown}>
          {user && (
            <div className="profile-image-container" onClick={handleProfilePictureClick}>
              <img src={profileImageUrl} alt="Profile" className="profile-image" />
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          )}
          <div className="dropdown-arrow">&#9662;</div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <a href="/profile" onClick={toggleDropdown}>Perfil</a>
          <a href="/settings" onClick={toggleDropdown}>Configuracion</a>
          <a href="/plan" onClick={toggleDropdown}>Plan</a>
          <a href="/" onClick={handleLogout}>Cerrar Sesión</a>
        </div>
      )}
    </nav>
  );
};

export default Home;
