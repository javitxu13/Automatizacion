import React from 'react';
import { Link } from 'react-router-dom';

// Componente para las opciones individuales de configuración
const ConfigOption = ({ name, path }) => {
  return (
    <div className="configOption">
      <Link to={path}>{name}</Link>
    </div>
  );
};

// Componente para las secciones de configuración
const ConfigSection = ({ title, description, options }) => {
  return (
    <div className="configSection">
      <h2>{title}</h2>
      <p>{description}</p>
      {options.map((option, index) => (
        <ConfigOption key={index} name={option.name} path={option.path} />
      ))}
    </div>
  );
};

// Componente principal de configuración que contiene todas las secciones
const Configuration = () => {
  const configSections = [
    {
      title: 'Cuenta',
      description: 'Configura y personaliza tu cuenta.',
      options: [
        { name: 'Preferencias', path: '/preferencias' },
        { name: 'Usuarios', path: '/usuarios' },
        { name: 'Configuración de email', path: '/configuracion-email' },
        { name: 'Gestionar tags', path: '/gestionar-tags' },
        { name: 'Certificado electrónico', path: '/certificado-electronico' },
      ],
    },
    // ... otras secciones siguiendo el mismo patrón
  ];

  return (
    <div className="configContainer">
      {configSections.map((section, index) => (
        <ConfigSection
          key={index}
          title={section.title}
          description={section.description}
          options={section.options}
        />
      ))}
    </div>
  );
};

export default Configuration;
