import React, { useState } from 'react';
import LocationForm from '../components/Quote/LocationForm';
import PropertyForm from '../components/Quote/PropertyForm';
import ConfirmForm from '../components/Quote/ConfirmForm';
import './QuotePage.css';

function QuotePage() {
  const [calculationResult, setCalculationResult] = useState(null);
  const [locationData, setLocationData] = useState({
    origin: { country: '', province: '', city: '' },
    destination: { country: '', province: '', city: '' }
  });

  const handleLocationChange = (data) => {
    setLocationData(data);
  };

  const handleCalculate = (result) => {
    setCalculationResult(result);
  };

  const handleConfirm = () => {
    if (!calculationResult) {
      alert('Por favor calcula el costo primero');
      return;
    }
    alert('Envío confirmado. Próximamente se enviará a Google Sheets.');
    console.log('Datos del envío:', {
      ubicacion: locationData,
      detalles: calculationResult
    });
  };

  return (
    <div className="quote-page">
      <div className="container">
        <h1 className="page-title">Cotizador de Envíos</h1>
        <p className="page-description">
          Completa los siguientes datos para obtener un costo estimado de tu envío.
        </p>
        
        <LocationForm onLocationChange={handleLocationChange} />
        <PropertyForm onCalculate={handleCalculate} locationData={locationData} />
        <ConfirmForm result={calculationResult} onConfirm={handleConfirm} />
      </div>
    </div>
  );
}

export default QuotePage;