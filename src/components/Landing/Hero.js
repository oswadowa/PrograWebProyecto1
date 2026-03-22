import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-image">
          <div className="image-wrapper">
            <img 
              src="https://globaltranstoledo.com/wp-content/uploads/2023/12/enviar-paquetes-correctamente-scaled.jpg"
              alt="Envío de paquetes"
              className="hero-img"
            />
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-subtitle">¿Deseas ordenar un paquete?</p>
          <h1 className="hero-title">¡Cotízalo!</h1>
          <Link to="/cotizador" className="hero-btn">
            Cotizar envío
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;