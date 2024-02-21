import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../style/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog,faCogs, faPhone, faRobot } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <nav className={`navbar ${isNavExpanded ? 'expanded' : ''}`}>
            <div className="nav-menu">
                <Link to="/home" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                    <FontAwesomeIcon icon={faHome} className="icon-home" />
                    <span className="nav-text">Inicio</span> 
                </Link>
                <Link to="/automation" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                    <FontAwesomeIcon icon={faRobot} className="icon-automation" />
                    <span className="nav-text">Automatización</span> 
                </Link>
                <Link to="/processes" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                    <FontAwesomeIcon icon={faCogs} className="icon-processes" />
                    <span className="nav-text">Procesos</span>
                </Link>
                <Link to="/configuracion" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                    <FontAwesomeIcon icon={faCog} className="icon-config" />
                    <span className="nav-text">Configuración</span> 
                </Link>
                <Link to="/contact" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                    <FontAwesomeIcon icon={faPhone} className="icon-contact" />
                    <span className="nav-text">Contacto</span> 
                </Link>
            </div>
        </nav>
    );
}


export default Navbar;
