import React, { useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Hero from './components/Landing/Hero';

function App() {

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

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxiE0-pFI9Gas3g7D-qEfwZhpWKrtEgev8hxlGTXgO-XoTuV7SYKc2v7GBssoXByyus/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Enviado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al enviar");
    }
  };

  return (
    <div className="App">
      <Header />

      <main>
        <Hero />

        {/* CONTACTO */}
        <section id="contacto">
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

      </main>
    </div>
  );
}

export default App;