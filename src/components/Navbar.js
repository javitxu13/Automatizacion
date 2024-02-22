import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../style/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileAlt, faCogs, faSitemap /* Import additional icons here */ } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <nav className={`navbar ${isNavExpanded ? 'expanded' : ''}`}>
            <div className="nav-menu">

            <Link to="/crear" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                <FontAwesomeIcon icon={faPlus} className="icon-config" />
                <span className="nav-text">Crear</span> 
            </Link>
            <Link to="/home" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                <FontAwesomeIcon icon={faFileAlt} className="icon-home" /> {/* Or use faTachometerAlt */}
                <span className="nav-text">Dashboard</span> 
            </Link>

            <Link to="/procesos" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                <FontAwesomeIcon icon={faCogs} className="icon-processes" />
                <span className="nav-text">Procesos</span>
            </Link>

            <Link to="/contact" className="nav-link" onClick={() => setIsNavExpanded(false)}>
                <FontAwesomeIcon icon={faSitemap} className="icon-contact" />
                <span className="nav-text">Organización</span> 
            </Link>
               
               
            </div>
        </nav>
    );
}


export default Navbar;
