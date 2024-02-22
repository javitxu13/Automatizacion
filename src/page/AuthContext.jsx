import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './Firebase'; // Adjust the path to your Firebase config

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
        setError(null); // Clear any existing errors on successful auth change
      },
      (error) => {
        console.error("Error in auth state change:", error);
        setError(error); // Set error state
        setLoading(false);
      }
    );

    return unsubscribe; // Unsubscribe on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally, replace with a more sophisticated loader
  }

  const contextValue = {
    user,
    setUser,
    loading,
    error, // Expose error to context consumers
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
