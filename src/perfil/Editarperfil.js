// EditarPerfil.jsx
import React, { useState } from "react";
import { auth, storage, db } from "../page/Firebase"; // Asumiendo que tienes un archivo Firebase con tus configuraciones
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc,getDoc } from "firebase/firestore";


const EditarPerfil = ({ onProfileUpdate }) => {
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
      const imageRef = ref(storage, `profile_images/${auth.currentUser.uid}/${image.name}`);
      const uploadTask = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(uploadTask.ref);
    }
  
    const userRef = doc(db, "users", auth.currentUser.uid);
  
    // Verifica si el documento existe primero
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      // Maneja el caso en el que el documento no existe (crear nuevo documento o mostrar un error)
      console.log("No such document!");
      // Opcional: Puedes crear el documento aquí si es apropiado
      // await setDoc(userRef, { /* tus datos */ }, { merge: true });
    } else {
      await updateDoc(userRef, {
        name: name,
        lastName: lastName,
        phone: phone,
        photoURL: imageUrl || auth.currentUser.photoURL,
      });
  
      onProfileUpdate({
        ...auth.currentUser,
        displayName: name,
        photoURL: imageUrl || auth.currentUser.photoURL,
      });
    }
          
    setLoading(false);
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
