import React from 'react';
import './Nosotros.css';

function Nosotros() {
  const valores = [
    {
      icono: "⚡",
      titulo: "Rapidez",
      descripcion: "Entregas en tiempo récord con nuestra red logística optimizada."
    },
    {
      icono: "🔒",
      titulo: "Seguridad",
      descripcion: "Tu paquete está protegido con nuestro sistema de rastreo y seguro."
    },
    {
      icono: "🤝",
      titulo: "Confianza",
      descripcion: "Más de 10 años generando confianza en nuestros clientes."
    },
    {
      icono: "🌍",
      titulo: "Cobertura",
      descripcion: "Llegamos a más de 100 ciudades en todo el mundo."
    }
  ];

  return (
    <section className="nosotros" id="nosotros">
      <div className="container">
        <h2 className="section-title">🌟 Sobre Nosotros</h2>
        <p className="section-subtitle">
          Conoce la historia, misión y valores que nos impulsan
        </p>

        <div className="nosotros-grid">
          {/* Historia */}
          <div className="nosotros-card historia">
            <div className="card-icon">📖</div>
            <h3 className="card-title">Nuestra Historia</h3>
            <p className="card-text">
              AeroPaq nació en 2015 con la visión de revolucionar el servicio de paquetería en Guatemala. 
              Comenzamos como una pequeña empresa local y hoy somos líderes en envíos nacionales e internacionales, 
              atendiendo a miles de clientes satisfechos.
            </p>
          </div>

          {/* Misión */}
          <div className="nosotros-card mision">
            <div className="card-icon">🎯</div>
            <h3 className="card-title">Nuestra Misión</h3>
            <p className="card-text">
              Conectar personas y negocios a través de soluciones logísticas eficientes, 
              seguras y confiables, garantizando que cada paquete llegue a tiempo y en perfectas condiciones.
            </p>
          </div>

          {/* Visión */}
          <div className="nosotros-card vision">
            <div className="card-icon">👁️</div>
            <h3 className="card-title">Nuestra Visión</h3>
            <p className="card-text">
              Ser la empresa de paquetería líder en Latinoamérica, reconocida por nuestra innovación, 
              compromiso con el cliente y excelencia operativa.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="valores-section">
          <h3 className="valores-title">Nuestros Valores</h3>
          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div key={index} className="valor-card">
                <div className="valor-icon">{valor.icono}</div>
                <h4 className="valor-titulo">{valor.titulo}</h4>
                <p className="valor-descripcion">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;