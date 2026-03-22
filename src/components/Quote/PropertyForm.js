import React, { useState } from 'react';
import { getRegionMultiplier, countryToRegion, getEstimatedTime } from '../../data/regionMapping';
import './PropertyForm.css';

function PropertyForm({ onCalculate, locationData }) {
  // Estados para peso
  const [weightValue, setWeightValue] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [weightInKg, setWeightInKg] = useState(null);
  
  // Estados para dimensiones (opcional)
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    unit: 'cm'
  });
  const [showDimensions, setShowDimensions] = useState(false);
  
  // Estados para servicio
  const [serviceLevel, setServiceLevel] = useState('standard');
  
  // Estado para notas
  const [notes, setNotes] = useState('');

  // Estados de validación
  const [errors, setErrors] = useState({});

  const convertToKg = (value, unit) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;
    
    if (unit === 'kg') return numValue;
    if (unit === 'lb') return numValue * 0.453592;
    return null;
  };

  // Validar todos los campos obligatorios
  const validateForm = () => {
    const newErrors = {};

    // Validar ubicación (origen y destino)
    if (!locationData?.origin?.country || !locationData?.origin?.province || !locationData?.origin?.city) {
      newErrors.location = 'Por favor completa el origen del envío';
    }
    if (!locationData?.destination?.country || !locationData?.destination?.province || !locationData?.destination?.city) {
      newErrors.location = newErrors.location || 'Por favor completa el destino del envío';
    }

    // Validar peso
    if (!weightValue || isNaN(parseFloat(weightValue)) || parseFloat(weightValue) <= 0) {
      newErrors.weight = 'Por favor ingresa un peso válido mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCost = () => {
    // Validar antes de calcular
    if (!validateForm()) {
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const pesoEnKg = convertToKg(weightValue, weightUnit);
    setWeightInKg(pesoEnKg);
    
    // Obtener datos de ubicación
    const originCountry = locationData?.origin?.country;
    const destCountry = locationData?.destination?.country;
    
    let regionMultiplier = 1.0;
    let distancia = 0;
    
    if (originCountry && destCountry) {
      regionMultiplier = getRegionMultiplier(originCountry, destCountry);
      
      // Calcular distancia base según región
      if (originCountry === destCountry) {
        distancia = 100; // Mismo país
      } else if (countryToRegion[originCountry] === countryToRegion[destCountry]) {
        distancia = 500; // Misma región
      } else {
        distancia = 1500; // Diferentes regiones
      }
    }
    
    // Cálculo base ANTES de aplicar cualquier multiplicador
    let costoBase = 50;
    let costoPorPeso = pesoEnKg * 8;
    let costoDistancia = distancia * 0.05;
    
    let sumaBase = costoBase + costoPorPeso + costoDistancia;
    let totalConRegion = sumaBase * regionMultiplier;
    
    let totalFinal = totalConRegion;
    if (serviceLevel === 'priority') {
      totalFinal = totalConRegion * 1.5;
    }
    
    // Obtener tiempo estimado usando la función de regionMapping
    let tiempoEstimado = getEstimatedTime(originCountry, destCountry, serviceLevel);
    
    // Enviar los datos al componente padre
    if (onCalculate) {
      onCalculate({
        total: totalFinal,
        pesoKg: pesoEnKg,
        costoBase: costoBase,
        costoPorPeso: costoPorPeso,
        costoDistancia: costoDistancia,
        sumaBase: sumaBase,
        regionMultiplier: regionMultiplier,
        distancia: distancia,
        tiempoEstimado: tiempoEstimado,
        servicio: serviceLevel,
        notas: notes,
        origen: originCountry,
        destino: destCountry,
        regionOrigen: originCountry ? countryToRegion[originCountry] : null,
        regionDestino: destCountry ? countryToRegion[destCountry] : null,
        dimensiones: showDimensions && dimensions.length && dimensions.width && dimensions.height ? dimensions : null
      });
    }
  };

  const handleWeightChange = (e) => {
    setWeightValue(e.target.value);
    if (errors.weight) {
      setErrors({ ...errors, weight: null });
    }
  };

  const handleWeightUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="property-form">
      <h2 className="form-main-title">📦 Detalles del Envío</h2>
      
      {/* Mensaje de error de ubicación */}
      {errors.location && (
        <div className="error-message-global">
          ⚠️ {errors.location}
        </div>
      )}
      
      {/* PESO */}
      <div className="form-section">
        <div className="section-header">
          <span className="section-icon">⚖️</span>
          <h3 className="section-title">Peso del paquete *</h3>
        </div>
        
        <div className="weight-container">
          <input
            type="number"
            step="0.1"
            value={weightValue}
            onChange={handleWeightChange}
            placeholder="Ingresa el peso"
            className={`weight-input ${errors.weight ? 'error' : ''}`}
          />
          <select 
            value={weightUnit} 
            onChange={handleWeightUnitChange}
            className="unit-select"
          >
            <option value="kg">Kilogramos (kg)</option>
            <option value="lb">Libras (lb)</option>
          </select>
        </div>
        {errors.weight && (
          <div className="error-message">{errors.weight}</div>
        )}
        {weightValue && weightInKg !== null && !errors.weight && (
          <div className="conversion-info">
            <span>📊 {weightValue} {weightUnit} = {weightInKg.toFixed(2)} kg</span>
          </div>
        )}
      </div>

      {/* DIMENSIONES (OPCIONAL) */}
      <div className="form-section">
        <div className="section-header">
          <span className="section-icon">📏</span>
          <h3 className="section-title">Dimensiones del paquete</h3>
          <button 
            type="button"
            className="toggle-btn"
            onClick={() => setShowDimensions(!showDimensions)}
          >
            {showDimensions ? 'Ocultar' : 'Agregar (opcional)'}
          </button>
        </div>
        
        {showDimensions && (
          <div className="dimensions-container">
            <div className="dimension-row">
              <div className="dimension-field">
                <label>Largo</label>
                <input
                  type="number"
                  name="length"
                  value={dimensions.length}
                  onChange={handleDimensionChange}
                  placeholder="0"
                  className="dimension-input"
                />
              </div>
              <div className="dimension-field">
                <label>Ancho</label>
                <input
                  type="number"
                  name="width"
                  value={dimensions.width}
                  onChange={handleDimensionChange}
                  placeholder="0"
                  className="dimension-input"
                />
              </div>
              <div className="dimension-field">
                <label>Alto</label>
                <input
                  type="number"
                  name="height"
                  value={dimensions.height}
                  onChange={handleDimensionChange}
                  placeholder="0"
                  className="dimension-input"
                />
              </div>
              <div className="dimension-field">
                <label>Unidad</label>
                <select
                  name="unit"
                  value={dimensions.unit}
                  onChange={handleDimensionChange}
                  className="unit-select"
                >
                  <option value="cm">cm</option>
                  <option value="in">pulgadas</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NIVEL DE SERVICIO */}
      <div className="form-section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <h3 className="section-title">Nivel de servicio *</h3>
        </div>
        
        <div className="service-container">
          <label className={`service-option ${serviceLevel === 'standard' ? 'active' : ''}`}>
            <input
              type="radio"
              name="service"
              value="standard"
              checked={serviceLevel === 'standard'}
              onChange={(e) => setServiceLevel(e.target.value)}
            />
            <div className="service-info">
              <span className="service-name">Estándar</span>
              <span className="service-time">3-5 días hábiles</span>
            </div>
          </label>
          
          <label className={`service-option ${serviceLevel === 'priority' ? 'active' : ''}`}>
            <input
              type="radio"
              name="service"
              value="priority"
              checked={serviceLevel === 'priority'}
              onChange={(e) => setServiceLevel(e.target.value)}
            />
            <div className="service-info">
              <span className="service-name">Priority</span>
              <span className="service-time">24-48 horas</span>
              <span className="service-multiplier">+50%</span>
            </div>
          </label>
        </div>
      </div>

      {/* NOTAS ADICIONALES */}
      <div className="form-section">
        <div className="section-header">
          <span className="section-icon">📝</span>
          <h3 className="section-title">Notas para el envío</h3>
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Instrucciones especiales, contenido del paquete, horario de recolección, etc."
          className="notes-textarea"
          rows="3"
        />
      </div>

      {/* BOTÓN CALCULAR */}
      <button className="calculate-btn" onClick={calculateCost}>
        Calcular costo estimado
      </button>
    </div>
  );
}

export default PropertyForm;