import React from 'react';
import './Header.css';

// Importar el logo desde assets/images
import logo from '../../assets/images/LogoPaginaWebProyecto.png';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="AeroPaq" className="logo-icon" />
            <span className="logo-text">AeroPaq</span>
          </a>
        </div>

        <nav className="nav-menu">
          <a href="/" className="nav-link">Inicio</a>
          <a href="#servicios" className="nav-link">Servicios</a>
          <a href="#cobertura" className="nav-link">Cobertura</a>
          <a href="#como-funciona" className="nav-link">Cómo funciona</a>
          <a href="#nosotros" className="nav-link">Nosotros</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#contacto" className="nav-link">Contacto</a>
          <a href="/cotizador" className="nav-link btn-cotizar">Cotizador</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;