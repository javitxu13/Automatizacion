import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/Signup.css';
import DashboardImage from '../img/Gif.gif';
import '../../frontend/style/Signup.css';

const InputGroup = ({ id, name, type = 'text', value, onChange, placeholder, options }) => {
  // Renderizado condicional para el tipo de entrada 'select'
  if (type === 'select') {
    return (
      <div className="input-group">
        <label htmlFor={id} className="input-label">{placeholder}</label>
        <select id={id} name={name} value={value} onChange={onChange} required className="input-field">
          <option value="">Seleccione rango...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }


  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">{placeholder}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', numEmpleados: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const sendVerificationEmail = async (userEmail) => {
    try {
      // Asumiendo que tienes un endpoint para enviar correos de verificación
      const response = await fetch('http://localhost:5009/api/verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
  
      if (!response.ok) {
        throw new Error('No se pudo enviar el correo de verificación.');
      }
      console.log('Correo de verificación enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar correo de verificación:', error);
      setError('Error al enviar el correo de verificación. Intente nuevamente.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    console.log("Enviando formulario con datos:", formData);

    try {
      // Asegúrate de tener la URL correcta para tu endpoint de registro
      const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5009/api/register';
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al conectar con el servicio');
      }

      await response.json();
      localStorage.setItem('userEmail', formData.email);
      sendVerificationEmail(formData.email); // Llama a la función para enviar el correo de verificación
      navigate('/nombre'); // Continúa con la navegación      
    } catch (error) {
      console.error('Error al registrar el usuario: ', error);
      setError(error.message || 'Ha ocurrido un error desconocido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <div className="container">
      <aside className="brand-section">
        <h1>Your Brand</h1>
        <p>Your brand's mission statement or tagline here.</p>
        <div className="image-container">
          <img src={DashboardImage} alt="Dashboard Preview" />
        </div>
      </aside>
      <main className="signup-main">
        <section className="signup-section">
          <div className="signup-container">
            <h1 className="signup-title">Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <InputGroup
                id="numEmpleados"
                name="numEmpleados"
                type="select"
                value={formData.numEmpleados}
                onChange={handleChange}
                placeholder="Número de empleados"
                options={[
                  { value: '1-50', label: '1-50' },
                  { value: '51-100', label: '51-100' },
                  { value: '101-300', label: '101-300' },
                  { value: '301-500', label: '301-500' },
                  { value: '500+', label: '+500' },
                ]}
              />
              <InputGroup
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico empresa"
              />
              <button type="submit" className="signup-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Continuar'}
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <p className="signin-prompt">
              Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
