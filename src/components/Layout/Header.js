import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/LogoPaginaWebProyecto.png';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={cerrarMenu}>
            <img src={logo} alt="AeroPaq" className="logo-icon" />
            <span className="logo-text">AeroPaq</span>
          </Link>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button 
          className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de navegación */}
        <nav className={`nav-menu ${menuAbierto ? 'activo' : ''}`}>
          <a href="/" onClick={cerrarMenu} className="nav-link">Inicio</a>
          <a href="#servicios" onClick={cerrarMenu} className="nav-link">Servicios</a>
          <a href="#cobertura" onClick={cerrarMenu} className="nav-link">Cobertura</a>
          <a href="#como-funciona" onClick={cerrarMenu} className="nav-link">Cómo funciona</a>
          <a href="#nosotros" onClick={cerrarMenu} className="nav-link">Nosotros</a>
          <a href="#faq" onClick={cerrarMenu} className="nav-link">FAQ</a>
          <a href="#contacto" onClick={cerrarMenu} className="nav-link">Contacto</a>
          <Link to="/cotizador" onClick={cerrarMenu} className="nav-link btn-cotizar">Cotizador</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;