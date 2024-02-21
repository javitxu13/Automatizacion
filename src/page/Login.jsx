import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Login.css";
import GoogleLogo from '../img/Google.png'; // Make sure the path is correct

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard");
        console.log(user);
      })
      .catch((error) => {
        alert("Invalid email or password");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
    <main className="main-container">
      <section className="login-section">
        <div className="login-container">
          <p className="app-title"> FocusApp </p>
  
          <form className="login-form">
            <div className="form-group">
              <label htmlFor='email-address'>Email address</label>
              <input
                id='email-address'
                name='email'
                type='email'
                required
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                name='password'
                type='password'
                required
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
  
            <div className="button-group">
              <button onClick={onLogin} className="login-button">Login</button>
              <button type="button" className="google-signup-button" onClick={onGoogleLogin}>
            <img src={GoogleLogo} alt="Google" className="google-logo" />
            Login con Google
          </button>
              
            </div>
          </form>
          <p className='signup-prompt text-sm text-white text-center'>
            No account yet? <NavLink to='/' className="signup-link">Sign up</NavLink>
          </p>
        </div>
      </section>
    </main>
  </>  
  );
};

export default Login;
