import React from 'react';
import '../style/LandingPage.css'; // Asume que los estilos están en LandingPage.css
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom


const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">DGR</div>
        <nav className="navigation">
        <ul>
            <li><Link to="/features">Features</Link></li> {/* Asume que tienes una ruta /features */}
            <li><Link to="/pricing">Pricing</Link></li> {/* Asume que tienes una ruta /pricing */}
            <li><Link to="/blog">Blog</Link></li> {/* Asume que tienes una ruta /blog */}
          </ul>
          <button className="register-button">
          <Link to="/signup" className="register-link">Regístrate gratis</Link>
        </button>
                </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>La herramienta colaborativa imprescindible para organizar tus procesos</h1>
          <p>Empieza a dominar tus procesos de negocio con una herramienta que multiplicará tu eficiencia.</p>
          <button className="register-button">
          <Link to="/signup" className="register-link">Regístrate gratis</Link>
        </button>        </div>
        <div className="hero-video">
          {/* Aquí se insertaría un componente de video o una imagen como placeholder */}
          <div className="video-placeholder">VIDEO DE LA APP</div>
        </div>
      </section>

      <section className="features-section">
        <h2>Tus procesos, a un click</h2>
        <div className="features">
          <div className="feature">
            <h3>Gestión colaborativa de procesos empresariales</h3>
            {/* Iconos y texto */}
            <p>Todos tus procesos en 1 solo sitio</p>
          </div>
          <div className="feature">
            <h3>Accede a toda la documentación</h3>
            {/* Iconos y texto */}
          </div>
          <div className="feature">
            <h3>Gana eficiencia automatizando</h3>
            {/* Iconos y texto */}
          </div>
        </div>
      </section>      
    </div>
  );
};

export default LandingPage;
