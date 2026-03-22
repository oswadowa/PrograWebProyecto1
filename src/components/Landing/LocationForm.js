import React, { useState, useEffect } from 'react';
import { locationsData, countriesList } from '../../data/locations';
import './LocationForm.css';

function LocationForm({ onLocationChange }) {
  // Estado para origen
  const [originCountry, setOriginCountry] = useState('');
  const [originProvince, setOriginProvince] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [originProvincesList, setOriginProvincesList] = useState([]);
  const [originCitiesList, setOriginCitiesList] = useState([]);

  // Estado para destino
  const [destCountry, setDestCountry] = useState('');
  const [destProvince, setDestProvince] = useState('');
  const [destCity, setDestCity] = useState('');
  const [destProvincesList, setDestProvincesList] = useState([]);
  const [destCitiesList, setDestCitiesList] = useState([]);

  // Efectos para Origen
  useEffect(() => {
    if (originCountry && locationsData[originCountry]) {
      const provincias = Object.keys(locationsData[originCountry].provincias);
      setOriginProvincesList(provincias);
      setOriginProvince('');
      setOriginCity('');
      setOriginCitiesList([]);
    } else {
      setOriginProvincesList([]);
    }
  }, [originCountry]);

  useEffect(() => {
    if (originCountry && originProvince && locationsData[originCountry]) {
      const cities = locationsData[originCountry].provincias[originProvince] || [];
      setOriginCitiesList(cities);
      setOriginCity('');
    } else {
      setOriginCitiesList([]);
    }
  }, [originProvince, originCountry]);

  // Efectos para Destino
  useEffect(() => {
    if (destCountry && locationsData[destCountry]) {
      const provincias = Object.keys(locationsData[destCountry].provincias);
      setDestProvincesList(provincias);
      setDestProvince('');
      setDestCity('');
      setDestCitiesList([]);
    } else {
      setDestProvincesList([]);
    }
  }, [destCountry]);

  useEffect(() => {
    if (destCountry && destProvince && locationsData[destCountry]) {
      const cities = locationsData[destCountry].provincias[destProvince] || [];
      setDestCitiesList(cities);
      setDestCity('');
    } else {
      setDestCitiesList([]);
    }
  }, [destProvince, destCountry]);

  // Enviar datos al padre cuando cambien
  useEffect(() => {
    if (onLocationChange) {
      onLocationChange({
        origin: {
          country: originCountry,
          province: originProvince,
          city: originCity
        },
        destination: {
          country: destCountry,
          province: destProvince,
          city: destCity
        }
      });
    }
  }, [originCountry, originProvince, originCity, destCountry, destProvince, destCity, onLocationChange]);

  return (
    <div className="location-form">
      <h2 className="form-main-title">📍 Origen y Destino</h2>
      
      {/* ORIGEN */}
      <div className="location-row">
        <div className="location-label">
          <span className="label-icon">🚚</span>
          <span className="label-text">Origen</span>
        </div>
        <div className="location-fields">
          <select 
            value={originCountry} 
            onChange={(e) => setOriginCountry(e.target.value)}
            className="form-select"
          >
            <option value="">País</option>
            {countriesList.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select 
            value={originProvince} 
            onChange={(e) => setOriginProvince(e.target.value)}
            className="form-select"
            disabled={!originCountry}
          >
            <option value="">Provincia</option>
            {originProvincesList.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>

          <select 
            value={originCity} 
            onChange={(e) => setOriginCity(e.target.value)}
            className="form-select"
            disabled={!originProvince}
          >
            <option value="">Ciudad</option>
            {originCitiesList.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* DESTINO */}
      <div className="location-row">
        <div className="location-label">
          <span className="label-icon">🎯</span>
          <span className="label-text">Destino</span>
        </div>
        <div className="location-fields">
          <select 
            value={destCountry} 
            onChange={(e) => setDestCountry(e.target.value)}
            className="form-select"
          >
            <option value="">País</option>
            {countriesList.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select 
            value={destProvince} 
            onChange={(e) => setDestProvince(e.target.value)}
            className="form-select"
            disabled={!destCountry}
          >
            <option value="">Provincia</option>
            {destProvincesList.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>

          <select 
            value={destCity} 
            onChange={(e) => setDestCity(e.target.value)}
            className="form-select"
            disabled={!destProvince}
          >
            <option value="">Ciudad</option>
            {destCitiesList.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resumen */}
      {(originCountry && originProvince && originCity) && (
        <div className="summary-item">
          <span className="summary-label">📍 Origen:</span>
          <span>{originCity}, {originProvince}, {originCountry}</span>
        </div>
      )}
      {(destCountry && destProvince && destCity) && (
        <div className="summary-item">
          <span className="summary-label">🎯 Destino:</span>
          <span>{destCity}, {destProvince}, {destCountry}</span>
        </div>
      )}
    </div>
  );
}

export default LocationForm;