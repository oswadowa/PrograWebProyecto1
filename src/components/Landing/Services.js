import React from 'react';
import './Services.css';

function Services() {
  const servicios = [
    {
      id: 1,
      icono: "📦",
      titulo: "Envíos Nacionales",
      descripcion: "Entregas rápidas y seguras dentro del país. Cobertura en todas las ciudades principales.",
      color: "#667eea"
    },
    {
      id: 2,
      icono: "🌎",
      titulo: "Envíos Internacionales",
      descripcion: "Llevamos tus paquetes a cualquier parte del mundo con total seguridad y seguimiento.",
      color: "#f093fb"
    },
    {
      id: 3,
      icono: "🏠",
      titulo: "Recolección a domicilio",
      descripcion: "Pasamos por tu paquete sin que te muevas de casa u oficina. ¡Total comodidad!",
      color: "#4facfe"
    },
    {
      id: 4,
      icono: "⚡",
      titulo: "Servicio Exprés",
      descripcion: "Entregas en el mismo día o 24 horas para tus envíos más urgentes.",
      color: "#fa709a"
    }
  ];

  return (
    <section className="services" id="servicios">
      <div className="container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">
          Ofrecemos soluciones de paquetería adaptadas a tus necesidades
        </p>
        
        <div className="services-grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="service-card">
              <div className="service-icon" style={{ backgroundColor: servicio.color }}>
                {servicio.icono}
              </div>
              <h3 className="service-title">{servicio.titulo}</h3>
              <p className="service-description">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;