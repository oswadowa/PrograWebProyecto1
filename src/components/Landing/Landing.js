import React, { useState } from 'react';
import Header from './components/Header/Header';

function Landing() {

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (!form.nombre || !form.correo || !form.telefono || !form.mensaje) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.correo)) {
      alert("Correo inválido");
      return;
    }

    if (!/^\d{8,}$/.test(form.telefono)) {
      alert("Teléfono inválido");
      return;
    }

    // ENVÍO A GOOGLE SHEETS 
    try {
      await fetch("TU_URL_DE_GOOGLE_SCRIPT", {
        method: "POST",
        body: JSON.stringify(form)
      });

      alert("Mensaje enviado correctamente");
    } catch (error) {
      alert("Error al enviar");
    }
  };

  return (
    <div>
      <Header />

      {/* INICIO */}
      <section style={{ padding: "120px 20px" }}>
        <h1>Bienvenido a AeroPaq</h1>
        <p>Envíos rápidos, seguros y confiables.</p>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{ padding: "100px 20px" }}>
        <h2>Servicios</h2>
        <ul>
          <li>Envíos nacionales</li>
          <li>Envíos internacionales</li>
          <li>Recolección a domicilio</li>
          <li>Servicio exprés</li>
        </ul>
      </section>

      {/* COBERTURA */}
      <section id="cobertura" style={{ padding: "100px 20px" }}>
        <h2>Cobertura</h2>
        <p>
          Tenemos cobertura en toda Guatemala, Centroamérica, Estados Unidos y Europa.
        </p>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "100px 20px" }}>
        <h2>Cómo funciona</h2>
        <p>Solicitud → Recolección → Despacho → Entrega</p>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={{ padding: "100px 20px" }}>
        <h2>Sobre Nosotros</h2>
        <p><strong>Historia:</strong> AeroPaq nace para facilitar envíos rápidos.</p>
        <p><strong>Misión:</strong> Brindar soluciones logísticas eficientes.</p>
        <p><strong>Visión:</strong> Ser líderes en envíos en Latinoamérica.</p>
        <p><strong>Valores:</strong> Responsabilidad, rapidez, confianza.</p>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 20px" }}>
        <h2>Preguntas Frecuentes</h2>
        <p><strong>¿Cuánto tarda un envío?</strong> 24 a 72 horas.</p>
        <p><strong>¿Puedo rastrear mi paquete?</strong> Sí.</p>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={{ padding: "100px 20px" }}>
        <h2>Contacto</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
          /><br /><br />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            onChange={handleChange}
          /><br /><br />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
          /><br /><br />

          <textarea
            name="mensaje"
            placeholder="Mensaje"
            onChange={handleChange}
          ></textarea><br /><br />

          <button type="submit">Enviar</button>
        </form>
      </section>

    </div>
  );
}

export default Landing;