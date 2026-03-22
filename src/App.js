import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Hero from './components/Landing/Hero';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;