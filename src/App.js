import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Hero from './components/Landing/Hero';
import Services from './components/Landing/Services';
import Cobertura from './components/Landing/Cobertura';
import ComoFunciona from './components/Landing/ComoFunciona';
import Nosotros from './components/Landing/Nosotros';
import FAQ from './components/Landing/FAQ';
import Contacto from './components/Landing/Contacto';
import QuotePage from './pages/QuotePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Cobertura />
                <ComoFunciona />
                <Nosotros />
                <FAQ />
                <Contacto />
              </>
            } />
            <Route path="/cotizador" element={<QuotePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;