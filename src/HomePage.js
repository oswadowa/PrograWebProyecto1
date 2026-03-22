import React from 'react';
import Hero from './components/Landing/Hero';
import Services from './components/Landing/Services';
import Cobertura from './components/Landing/Cobertura';
import HowItWorks from '../components/Landing/HowItWorks';
import AboutUs from '../components/Landing/AboutUs';
import FAQ from '../components/Landing/FAQ';
import Contact from '../components/Landing/Contact';

function HomePage() {
  return (
    <div className="home-page">
      <section id="inicio">
        <Hero />
      </section>
      <section id="servicios">
        <Services />
      </section>
      <section id="cobertura">
        <Cobertura />
      </section>
      <section id="como-funciona">
        <HowItWorks />
      </section>
      <section id="nosotros">
        <AboutUs />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contacto">
        <Contact />
      </section>
    </div>
  );
}

export default HomePage;