import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import "../style/Signup.css";
import DashboardImage from "../img/Gif.gif";
import GoogleLogo from '../img/Google.png'; // Make sure the path is correct

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log(user);
      navigate("/dashboard"); // Or wherever you need to redirect the user
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/dashboard"); // Or wherever you need to redirect the user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="container">
  <aside className="brand-section">
    <h1>The smart business management software for SMEs.</h1>
    <p>Holded is the solution in the cloud that has everything you need to manage your business – anytime, anywhere.</p>
    <div className="image-container">
      <img src={DashboardImage} alt="Dashboard Preview" className="dashboard-image" />    </div>
    {/* <div className="language-selector">
      <label for="language">Language:</label>
      { <select id="language">
        <option value="english">English</option>
      </select> }
    </div> */}
  </aside>
    <main className="signup-main">
    <section className="signup-section">
      <div className="signup-container">
        <h1 className="signup-title">FocusApp</h1>
          <button type="button" className="google-signup-button" onClick={signInWithGoogle}>
            <img src={GoogleLogo} alt="Google" className="google-logo" />
            Regístrame con Google
          </button>

        <form className="signup-form" onSubmit={onSubmit}>

        <div className="input-group">
        <label htmlFor='name' className="input-label">Name</label>
        <input
          id='name'
          type='text' // Change the type to "text" for a name input
          value={name} // Make sure you have a 'name' state variable
          onChange={(e) => setName(e.target.value)} // Update the setter function to setName
          required
          placeholder='Name' // Update the placeholder
          className="input-field"
        />
      </div>

          <div className="input-group">
            <label htmlFor='email-address' className="input-label">Email address</label>
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
  
          <div className="input-group">
            <label htmlFor='password' className="input-label">Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
              className="input-field"
            />
          </div>
  
          <button type='submit' className="signup-button">
            Sign up
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
