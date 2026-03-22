import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      pregunta: "¿Cómo se procesan los paquetes?",
      respuesta: "Los paquetes son recibidos en nuestros centros de distribución, donde se clasifican por tamaño, peso y destino. Luego son asignados a la ruta más eficiente según el nivel de servicio seleccionado (Estándar o Priority). Todo el proceso es monitoreado con nuestro sistema de tracking en tiempo real."
    },
    {
      pregunta: "¿Mi información está segura?",
      respuesta: "Absolutamente. Contamos con protocolos de seguridad avanzados que protegen toda tu información personal y de pago. Nunca compartimos tus datos con terceros sin tu consentimiento, y cumplimos con todas las regulaciones de protección de datos."
    },
    {
      pregunta: "¿Hay alguna garantía en caso que mi paquete se pierda?",
      respuesta: "Sí, ofrecemos un seguro contra pérdida y daños que cubre el valor declarado de tu paquete. Puedes contratar este servicio adicional al momento de realizar tu envío. Nuestro equipo de atención al cliente te acompañará durante todo el proceso de reclamación."
    },
    {
      pregunta: "¿Cuál es el tiempo de entrega estándar?",
      respuesta: "Los tiempos varían según el destino: envíos nacionales: 1-3 días hábiles; envíos internacionales: 3-8 días hábiles. Con nuestro servicio Priority, los tiempos se reducen significativamente."
    },
    {
      pregunta: "¿Cómo puedo rastrear mi paquete?",
      respuesta: "Al realizar tu envío, recibirás un número de guía único. Puedes ingresarlo en nuestra página de seguimiento para conocer en tiempo real la ubicación y estado de tu paquete."
    },
    {
      pregunta: "¿Realizan recolección a domicilio?",
      respuesta: "Sí, ofrecemos servicio de recolección a domicilio sin costo adicional en zonas urbanas. Puedes solicitar este servicio al momento de cotizar tu envío."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="section-title">❓ Preguntas Frecuentes</h2>
        <p className="section-subtitle">
          Resolvemos tus dudas sobre nuestros servicios
        </p>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="question-icon">{openIndex === index ? '−' : '+'}</span>
                <span className="question-text">{faq.pregunta}</span>
              </button>
              <div className={`faq-answer ${openIndex === index ? 'show' : ''}`}>
                <p>{faq.respuesta}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contacto adicional */}
        <div className="faq-contact">
          <p>¿No encontraste lo que buscabas?</p>
          <a href="#contacto" className="contact-link">Contáctanos directamente</a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;