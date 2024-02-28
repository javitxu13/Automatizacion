import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import "../style/Signup.css";
import DashboardImage from "../img/Gif.gif";
import GoogleLogo from '../img/Google.png';
import MicrosoftLogo from '../img/Microsoft.png';
import { useAuth } from '../page/AuthContext';
import { db } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [numEmpleados, setNumEmpleados] = useState('');
  const { setUser } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setIsAuthenticating(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      setUser({ displayName: user.displayName, email: user.email });
      navigate("/inicio");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  };


  const signInWithMicrosoft = async () => {
    setIsAuthenticating(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      setUser({ displayName: user.displayName, email: user.email });
      navigate("/inicio");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
  
    try {
      await addDoc(collection(db, "registro"), {
        email: email,
        numEmpleados: numEmpleados,
      });
      navigate("/rol");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    

    setIsAuthenticating(false);
  };
  

  return (
    <div className="container">
      <aside className="brand-section">
        <h1>The smart business management software for SMEs.</h1>
        <p>Holded is the solution in the cloud that has everything you need to manage your business – anytime, anywhere.</p>
        <div className="image-container">
          <img src={DashboardImage} alt="Dashboard Preview" className="dashboard-image" />
        </div>
      </aside>
      <main className="signup-main">
        <section className="signup-section">
          <div className="signup-container">
            <h1 className="signup-title">FocusApp</h1>
            <button type="button" className="google-signup-button" onClick={signInWithGoogle}>
              <img src={GoogleLogo} alt="Google" className="google-logo" />
              Continuar con Google
            </button>
            <button type="button" className="google-signup-button" onClick={signInWithMicrosoft}>
              <img src={MicrosoftLogo} alt="Google" className="google-logo" />
              Continuar con Microsoft
            </button>
            <form className="signup-form" onSubmit={onSubmit}>
              <div className="input-group">
                <label htmlFor='numEmpleados' className="input-label">Número de empleados</label>
                <select
                  id='numEmpleados'
                  value={numEmpleados}
                  onChange={(e) => setNumEmpleados(e.target.value)}
                  required
                  className="input-field"
                >
                  <option value="">Seleccione rango...</option>
                  <option value="1-50">1-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-300">101-300</option>
                  <option value="301-500">301-500</option>
                  <option value="500+">+500</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor='email-address' className="input-label">Correo electrónico empresa</label>
                <input
                  id='email-address'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Email address'
                  className="input-field"
                />
              </div>
              <button type='submit' className="signup-button" disabled={isAuthenticating}>
                Continuar
              </button>
            </form>
            <p className="signin-prompt">
              Already have an account? <NavLink to='/login' className="signin-link">Login</NavLink>
            </p>
          </div>
        </section>
      </main>  
    </div>
  );
};

export default Signup;
