import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/LogoPaginaWebProyecto.png';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };

  const handleNavigation = (sectionId) => {
    cerrarMenu();
    
    // Si estamos en la página de cotizador
    if (location.pathname === '/cotizador') {
      // Usar window.location.href para navegar forzadamente
      window.location.href = `/#${sectionId}`;
    } else {
      // Si ya estamos en la página principal, hacer scroll directamente
      scrollToSection(sectionId);
    }
  };

  const goToHome = () => {
    cerrarMenu();
    if (location.pathname === '/cotizador') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'cobertura', label: 'Cobertura' },
    { id: 'como-funciona', label: 'Cómo funciona' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <button onClick={goToHome} className="logo-button">
            <img src={logo} alt="AeroPaq" className="logo-icon" />
            <span className="logo-text">AeroPaq</span>
          </button>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className="nav-link nav-button"
            >
              {item.label}
            </button>
          ))}
          <Link to="/cotizador" onClick={cerrarMenu} className="nav-link btn-cotizar">
            Cotizador
          </Link>
        </nav>

        <button 
          className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu-mobile ${menuAbierto ? 'activo' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className="mobile-nav-link"
            >
              {item.label}
            </button>
          ))}
          <Link to="/cotizador" onClick={cerrarMenu} className="mobile-nav-link btn-cotizar-mobile">
            Cotizador
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;