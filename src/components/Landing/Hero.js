import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-container">
        {/* Columna izquierda - Imagen */}
        <div className="hero-image">
          <div className="image-wrapper">
            <img 
              src="https://globaltranstoledo.com/wp-content/uploads/2023/12/enviar-paquetes-correctamente-scaled.jpg"
              alt="Paquete envío"
              className="hero-img"
            />
          </div>
        </div>

        {/* Columna derecha - Texto y botón */}
        <div className="hero-content">
          <p className="hero-subtitle">¿Deseas ordenar un paquete?</p>
          <h1 className="hero-title">¡Cotízalo!</h1>
          <a href="/cotizador" className="hero-btn">
            Cotizar envío
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;