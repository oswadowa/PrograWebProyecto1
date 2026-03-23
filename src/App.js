import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';

function ScrollToHash() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);
  
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ScrollToHash />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cotizador" element={<QuotePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;