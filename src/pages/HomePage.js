import React, { useEffect } from 'react';
import Hero from '../components/Landing/Hero';
import Services from '../components/Landing/Services';
import Cobertura from '../components/Landing/Cobertura';
import ComoFunciona from '../components/Landing/ComoFunciona';
import Nosotros from '../components/Landing/Nosotros';
import FAQ from '../components/Landing/FAQ';
import Contacto from '../components/Landing/Contacto';

function HomePage() {
  // Forzar que los IDs estén disponibles
  useEffect(() => {
    // Pequeño delay para asegurar que todos los componentes se renderizaron
    const timer = setTimeout(() => {
      // Verificar que los IDs existen
      const sections = ['inicio', 'servicios', 'cobertura', 'como-funciona', 'nosotros', 'faq', 'contacto'];
      sections.forEach(id => {
        if (!document.getElementById(id)) {
          console.warn(`Sección ${id} no encontrada`);
        }
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section id="inicio"><Hero /></section>
      <section id="servicios"><Services /></section>
      <section id="cobertura"><Cobertura /></section>
      <section id="como-funciona"><ComoFunciona /></section>
      <section id="nosotros"><Nosotros /></section>
      <section id="faq"><FAQ /></section>
      <section id="contacto"><Contacto /></section>
    </>
  );
}

export default HomePage;