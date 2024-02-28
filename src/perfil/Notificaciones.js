import React, { useState, useEffect } from 'react';
import '../style/Notificaciones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notificacion = ({ mensaje, onClose }) => (
  <div className="notificacion">
    {mensaje}
    <button className="botonCerrar" onClick={onClose}>✕</button>
  </div>
);

const Notificaciones = ({ notificacionesIniciales = [] }) => {
  const [notificaciones, setNotificaciones] = useState(notificacionesIniciales);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setNotificaciones(notificacionesIniciales);
  }, []); // Solo se ejecuta una vez al montar el componente

  const cerrarNotificacion = (index) => {
    setNotificaciones(notificaciones.filter((_, i) => i !== index));
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="contenedorNotificaciones">
      <div className="iconoNotificaciones" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBell} className="iconoCampana" />
        {notificaciones.length > 0 && <span className="indicadorNotificaciones">{notificaciones.length}</span>}
      </div>
      {dropdownVisible && (
        <div className="dropdownNotificaciones">
          {notificaciones.length === 0 && <div className="notificacionVacia">No hay notificaciones</div>}
          {notificaciones.map((notificacion, index) => (
            <Notificacion
              key={index}
              mensaje={notificacion}
              onClose={() => cerrarNotificacion(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
