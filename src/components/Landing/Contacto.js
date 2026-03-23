import React, { useState } from 'react';
import { saveContactToGoogleSheets } from '../../services/SheetContacto';
import './Contacto.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const paisesContacto = [
    {
      pais: "Guatemala",
      telefono: "+502 1234-5678",
      email: "guatemala@aeropaq.com",
      horario: "Lun-Vie: 8:00 - 18:00",
      direccion: "5ta Av. 10-20, Zona 10, Ciudad de Guatemala"
    },
    {
      pais: "México",
      telefono: "+52 55 1234 5678",
      email: "mexico@aeropaq.com",
      horario: "Lun-Vie: 9:00 - 19:00",
      direccion: "Av. Reforma 123, Colonia Juárez, CDMX"
    },
    {
      pais: "Estados Unidos",
      telefono: "+1 (305) 123-4567",
      email: "usa@aeropaq.com",
      horario: "Lun-Vie: 8:00 - 20:00 EST",
      direccion: "1234 NW 42nd Ave, Miami, FL 33126"
    },
    {
      pais: "España",
      telefono: "+34 91 123 45 67",
      email: "espana@aeropaq.com",
      horario: "Lun-Vie: 9:00 - 18:00",
      direccion: "Calle Gran Vía 45, Madrid 28013"
    },
    {
      pais: "Argentina",
      telefono: "+54 11 1234-5678",
      email: "argentina@aeropaq.com",
      horario: "Lun-Vie: 9:00 - 18:00",
      direccion: "Av. Corrientes 1234, Buenos Aires"
    },
    {
      pais: "Colombia",
      telefono: "+57 1 1234567",
      email: "colombia@aeropaq.com",
      horario: "Lun-Vie: 8:00 - 17:00",
      direccion: "Calle 100 #15-20, Bogotá"
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico no válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{8,15}$/.test(formData.telefono.replace(/[\s\-\(\)\+]/g, ''))) {
      newErrors.telefono = 'Teléfono no válido (mínimo 8 dígitos)';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔵 ========== FORMULARIO ENVIADO ==========');
    console.log('🔵 Datos del formulario:', formData);
    
    const isValid = validateForm();
    console.log('🔵 Validación:', isValid ? '✅ PASÓ' : '❌ FALLÓ');
    
    if (isValid) {
      setIsSaving(true);
      
      const dataToSave = {
        fecha: new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' }),
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: formData.mensaje
      };
      
      console.log('🔵 Datos a guardar:', dataToSave);
      console.log('🔵 Llamando a saveContactToGoogleSheets...');
      
      try {
        const response = await saveContactToGoogleSheets(dataToSave);
        console.log('🔵 Respuesta del servicio:', response);
        
        if (response.success) {
          console.log('🔵 ✅ ÉXITO - Datos guardados correctamente');
          setSubmitted(true);
          setFormData({
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
          });
          
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        } else {
          console.log('🔵 ❌ ERROR en respuesta:', response.error);
          alert('❌ Error al enviar el mensaje: ' + (response.error || 'Error desconocido'));
        }
      } catch (error) {
        console.log('🔵 ❌ EXCEPCIÓN capturada:', error);
        alert('❌ Error: ' + error.message);
      }
      
      setIsSaving(false);
    } else {
      console.log('🔵 Errores de validación:', errors);
    }
    
    console.log('🔵 ========== FIN DEL PROCESO ==========');
  };

  return (
    <section className="contacto" id="contacto">
      <div className="container">
        <h2 className="section-title">📞 Contacto</h2>
        <p className="section-subtitle">
          Estamos para ayudarte. Elige tu país y contáctanos
        </p>

        <div className="contacto-grid">
          {/* Información de contacto por país */}
          <div className="contact-info">
            <h3 className="info-title">📍 Oficinas Internacionales</h3>
            <div className="countries-list">
              {paisesContacto.map((pais, index) => (
                <div key={index} className="country-card">
                  <div className="country-header">
                    <span className="country-flag">
                      {pais.pais === "Guatemala" && "🇬🇹"}
                      {pais.pais === "México" && "🇲🇽"}
                      {pais.pais === "Estados Unidos" && "🇺🇸"}
                      {pais.pais === "España" && "🇪🇸"}
                      {pais.pais === "Argentina" && "🇦🇷"}
                      {pais.pais === "Colombia" && "🇨🇴"}
                    </span>
                    <h4 className="country-name">{pais.pais}</h4>
                  </div>
                  <div className="country-details">
                    <p className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span>{pais.telefono}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-icon">✉️</span>
                      <span>{pais.email}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <span>{pais.horario}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{pais.direccion}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="contact-form">
            <h3 className="form-title">✉️ Envíanos un mensaje</h3>
            
            {submitted && (
              <div className="success-message">
                ✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <span className="error-text">{errors.nombre}</span>}
              </div>

              <div className="form-group">
                <label>Correo electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'error' : ''}
                  placeholder="12345678"
                />
                {errors.telefono && <span className="error-text">{errors.telefono}</span>}
              </div>

              <div className="form-group">
                <label>Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={errors.mensaje ? 'error' : ''}
                  rows="4"
                  placeholder="¿En qué podemos ayudarte?"
                />
                {errors.mensaje && <span className="error-text">{errors.mensaje}</span>}
              </div>

              <button type="submit" className="submit-btn" disabled={isSaving}>
                {isSaving ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="social-section">
          <h3>Síguenos en redes sociales</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">📘 Facebook</a>
            <a href="#" className="social-icon">📸 Instagram</a>
            <a href="#" className="social-icon">💼 LinkedIn</a>
            <a href="#" className="social-icon">🐦 Twitter</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;