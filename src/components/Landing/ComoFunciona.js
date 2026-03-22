import React from 'react';
import './ComoFunciona.css';

function ComoFunciona() {
  const steps = [
    {
      id: 1,
      icono: "📝",
      titulo: "Solicitud",
      descripcion: "Completa nuestro formulario de cotización con los detalles de tu envío: origen, destino, peso y nivel de servicio.",
      color: "#667eea"
    },
    {
      id: 2,
      icono: "🚚",
      titulo: "Recolección",
      descripcion: "Nuestro equipo pasa por tu paquete en la dirección indicada. Puedes agendar la recolección en el horario que prefieras.",
      color: "#f093fb"
    },
    {
      id: 3,
      icono: "✈️",
      titulo: "Despacho",
      descripcion: "Tu paquete es procesado, clasificado y enviado a través de nuestra red logística hacia su destino.",
      color: "#4facfe"
    },
    {
      id: 4,
      icono: "📦",
      titulo: "Entrega",
      descripcion: "Realizamos la entrega en la dirección de destino con notificaciones en tiempo real y confirmación de recepción.",
      color: "#fa709a"
    }
  ];

  return (
    <section className="como-funciona" id="como-funciona">
      <div className="container">
        <h2 className="section-title">🚀 ¿Cómo funciona?</h2>
        <p className="section-subtitle">
          En 4 pasos simples, tu paquete llega a donde necesita
        </p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-card">
              <div className="step-number">{step.id}</div>
              <div className="step-icon" style={{ backgroundColor: step.color }}>
                {step.icono}
              </div>
              <h3 className="step-title">{step.titulo}</h3>
              <p className="step-description">{step.descripcion}</p>
              {index < steps.length - 1 && (
                <div className="step-arrow">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Llamada a la acción */}
        <div className="cta-box">
          <p className="cta-text">¿Listo para enviar tu paquete?</p>
          <a href="/cotizador" className="cta-button">Cotiza ahora</a>
        </div>
      </div>
    </section>
  );
}

export default ComoFunciona;