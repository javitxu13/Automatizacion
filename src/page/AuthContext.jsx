// Import React and other necessary hooks
import React, { createContext, useContext, useState, useEffect } from 'react';
// Import getAuth and onAuthStateChanged from firebase/auth
import { onAuthStateChanged } from 'firebase/auth';
// Import the initialized auth service from your firebase configuration file
import { auth } from './Firebase'; // Asegúrate de que esta ruta sea correcta

// Create a context for auth
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        setUser(user);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Error en el cambio de estado de autenticación:", error);
        setError(error);
        setLoading(false);
      }
    );

    // Clean up the subscription on component unmount
    return unsubscribe;
  }, []);

  const value = { user, setUser, loading, error };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};
