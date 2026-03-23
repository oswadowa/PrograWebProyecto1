import React, { useState } from 'react';
import { saveToGoogleSheets } from '../../services/googleSheets';
import './ConfirmForm.css';

function ConfirmForm({ result, onConfirm }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const displayResult = result || {
    total: 0,
    pesoKg: 0,
    distancia: 0,
    tiempoEstimado: '---',
    servicio: 'standard',
    origen: '',
    destino: '',
    regionOrigen: '',
    regionDestino: '',
    notas: '',
    dimensiones: null
  };

  const getServicioText = (servicio) => {
    return servicio === 'priority' ? 'Priority (+50%)' : 'Estándar';
  };

  const getRegionName = (regionCode) => {
    const regions = {
      'NA': 'Norte América',
      'SA': 'Sudamérica',
      'EU': 'Europa',
      'AS': 'Asia',
      'OC': 'Oceanía'
    };
    return regions[regionCode] || regionCode;
  };

  const handleConfirm = async () => {
    if (!result) {
      alert('Por favor calcula el costo primero');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    // Preparar datos para guardar
    const dataToSave = {
      fecha: new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' }),
      origen: `${displayResult.origen || '---'}`,
      destino: `${displayResult.destino || '---'}`,
      peso: `${displayResult.pesoKg.toFixed(2)} kg`,
      distancia: `${displayResult.distancia} km`,
      servicio: getServicioText(displayResult.servicio),
      tiempo: displayResult.tiempoEstimado,
      total: `Q${displayResult.total.toFixed(2)}`
    };

    console.log('Datos a guardar:', dataToSave);

    // Guardar en Google Sheets
    const response = await saveToGoogleSheets(dataToSave);

    if (response.success) {
      setSaveStatus('success');
      alert('✅ Envío confirmado. Los datos se han guardado correctamente.');
      if (onConfirm) {
        onConfirm(dataToSave);
      }
    } else {
      setSaveStatus('error');
      alert('❌ Error al guardar los datos. Por favor intenta nuevamente.');
    }

    setIsSaving(false);

    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };

  return (
    <div className="confirm-form">
      <h2 className="form-main-title">✅ Resumen del Envío</h2>
      
      <div className="result-box">
        <div className="result-header">
          <span className="result-icon">💰</span>
          <span className="result-label">Costo total estimado</span>
        </div>
        <div className="total-amount">
          Q{displayResult.total.toFixed(2)}
        </div>
        
        <div className="result-details">
          <div className="detail-row">
            <span>📍 Origen:</span>
            <span>{displayResult.origen || '---'}</span>
          </div>
          <div className="detail-row">
            <span>📍 Destino:</span>
            <span>{displayResult.destino || '---'}</span>
          </div>
          {displayResult.regionOrigen && (
            <div className="detail-row">
              <span>🌎 Región:</span>
              <span>{getRegionName(displayResult.regionOrigen)} → {getRegionName(displayResult.regionDestino)}</span>
            </div>
          )}
          <div className="detail-row">
            <span>📦 Peso:</span>
            <span>{displayResult.pesoKg.toFixed(2)} kg</span>
          </div>
          <div className="detail-row">
            <span>📏 Distancia aprox:</span>
            <span>{displayResult.distancia} km</span>
          </div>
          <div className="detail-row">
            <span>⚡ Nivel de servicio:</span>
            <span>{getServicioText(displayResult.servicio)}</span>
          </div>
          <div className="detail-row">
            <span>⏱️ Tiempo estimado:</span>
            <span>{displayResult.tiempoEstimado}</span>
          </div>
          {displayResult.dimensiones && (
            <div className="detail-row">
              <span>📏 Dimensiones:</span>
              <span>{displayResult.dimensiones.length} x {displayResult.dimensiones.width} x {displayResult.dimensiones.height} {displayResult.dimensiones.unit}</span>
            </div>
          )}
          {displayResult.notas && (
            <div className="detail-row notes-row">
              <span>📝 Notas:</span>
              <span className="notes-text">{displayResult.notas}</span>
            </div>
          )}
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="save-success">
          ✅ Datos guardados correctamente en Google Sheets
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="save-error">
          ❌ Error al guardar. Verifica la conexión.
        </div>
      )}

      <button 
        className="btn-confirm" 
        onClick={handleConfirm}
        disabled={isSaving}
      >
        {isSaving ? 'Guardando...' : 'Confirmar envío'}
      </button>
    </div>
  );
}

export default ConfirmForm;