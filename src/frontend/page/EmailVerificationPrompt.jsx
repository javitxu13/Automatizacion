/* import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPrompt = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Iniciar con true para reflejar la carga inicial
  const [error, setError] = useState('');

  useEffect(() => {
    sendVerificationEmail();
  }, []);

  const sendVerificationEmail = async (userEmail) => {
    try {
      const response = await fetch('http://localhost:5009/api/verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });
  
      if (response.ok) {
        console.log('Correo de verificación enviado con éxito.');
      } else {
        console.error('Error al enviar correo de verificación.');
      }
    } catch (error) {
      console.error('Error al enviar correo de verificación:', error);
    }
  };
  
  // Ejemplo de cómo llamarlo con el correo del usuario
  sendVerificationEmail('correo_del_usuario@ejemplo.com');
  

  const redirectToEmailProvider = () => {
    const emailProviderBaseUrl = {
      'gmail.com': 'https://mail.google.com/mail/u/0/#inbox',
      'yahoo.com': 'https://mail.yahoo.com/d/folders/1',
      'outlook.com': 'https://outlook.live.com/mail/inbox',
      // Añade más proveedores de correo electrónico si es necesario
    };
  
    // Asegúrate de recuperar el correo electrónico al principio de la función o componente
    const userEmail = localStorage.getItem('userEmail');
    // Es importante verificar que userEmail no sea null o undefined
    if (!userEmail || !userEmail.includes('@')) {
      alert('No pudimos encontrar tu dirección de correo electrónico para redirigirte. Por favor, inicia sesión nuevamente.');
      return;
    }
  
    const emailDomain = userEmail.split('@')[1];
    const redirectTo = emailProviderBaseUrl[emailDomain];
  
    if (redirectTo) {
      window.open(redirectTo, '_blank');
      localStorage.removeItem('userEmail'); // Considera remover el correo después de redirigir para limpiar
    } else {
      alert('Lo sentimos, no pudimos redirigirte a tu proveedor de correo electrónico. Por favor, accede directamente.');
    }
  };
  
  return (
    <div className="email-verification-container">
      {!error && (
        <>
          <h1>Revisa tu correo</h1>
          <p>Hemos enviado un correo con el enlace para establecer tu contraseña. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para continuar.</p>
          <button onClick={redirectToEmailProvider} className="email-redirect-button">
            Ir a mi correo
          </button>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => navigate('/login')} className="back-to-login-button">
        Volver al inicio de sesión
      </button>
    </div>
  );
};

export default EmailVerificationPrompt;
 */