import React, { useState } from "react";
import axios from 'axios'; // Asegúrate de instalar axios

const EditarPerfil = ({ onProfileUpdate, userId }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let imageUrl;

    if (image) {
      const formData = new FormData();
      formData.append('file', image); // 'file' es el nombre del campo en tu backend

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = response.data.url; // Asumiendo que el backend responde con la URL de la imagen
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    }
  
    try {
      const profileData = {
        name: name,
        lastName: lastName,
        phone: phone,
        photoURL: imageUrl, // Omitir si no hay una nueva imagen
      };

      await axios.put(`/api/users/${userId}`, profileData); // Ruta del API para actualizar el perfil del usuario
      
      onProfileUpdate(profileData);

      // ... tu lógica adicional después de la actualización
    } catch (error) {
      console.error('Error updating the profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellidos" />
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" />
        <input type="file" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>Actualizar</button>
      </form>
    </div>
  );
};

export default EditarPerfil;