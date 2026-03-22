import React from 'react';
import './Cobertura.css';

function Cobertura() {
  const coverageData = {
    nacional: {
      titulo: "🇬🇹 Cobertura Nacional",
      zonas: [
        {
          region: "Región Central",
          ciudades: ["Ciudad de Guatemala", "Mixco", "Villa Nueva", "San Miguel Petapa", "Chinautla"]
        },
        {
          region: "Región Norte",
          ciudades: ["Cobán", "Flores", "San Benito", "Santa Elena"]
        },
        {
          region: "Región Sur",
          ciudades: ["Escuintla", "Santa Lucía Cotzumalguapa", "Palín", "La Gomera"]
        },
        {
          region: "Región Occidente",
          ciudades: ["Quetzaltenango", "Totonicapán", "Huehuetenango", "San Marcos", "Sololá"]
        },
        {
          region: "Región Oriente",
          ciudades: ["Chiquimula", "Zacapa", "Jalapa", "Jutiapa", "El Progreso"]
        }
      ]
    },
    internacional: {
      titulo: "🌎 Cobertura Internacional",
      paises: [
        {
          nombre: "Norteamérica",
          ciudades: ["Estados Unidos: Miami, Los Ángeles, Houston, Nueva York", "México: Ciudad de México, Guadalajara, Monterrey"]
        },
        {
          nombre: "Centroamérica",
          ciudades: ["El Salvador: San Salvador", "Honduras: Tegucigalpa, San Pedro Sula", "Nicaragua: Managua", "Costa Rica: San José", "Panamá: Ciudad de Panamá"]
        },
        {
          nombre: "Sudamérica",
          ciudades: ["Colombia: Bogotá, Medellín", "Ecuador: Quito, Guayaquil", "Perú: Lima", "Chile: Santiago", "Argentina: Buenos Aires", "Brasil: São Paulo, Río de Janeiro"]
        },
        {
          nombre: "Europa",
          ciudades: ["España: Madrid, Barcelona", "Francia: París", "Alemania: Berlín, Múnich", "Italia: Roma, Milán", "Países Bajos: Ámsterdam", "Reino Unido: Londres"]
        },
        {
          nombre: "Asia",
          ciudades: ["China: Beijing, Shanghái", "Japón: Tokio, Osaka", "Corea del Sur: Seúl", "Taiwán: Taipéi"]
        }
      ]
    }
  };

  return (
    <section className="cobertura" id="cobertura">
      <div className="container">
        <h2 className="cobertura-title">🌍 Nuestra Cobertura</h2>
        <p className="cobertura-subtitle">
          Llegamos a donde necesites. Conoce las zonas donde operamos
        </p>

        <div className="cobertura-grid">
          {/* Cobertura Nacional */}
          <div className="cobertura-card">
            <div className="card-header">
              <span className="card-icon">🇬🇹</span>
              <h3 className="card-title">Cobertura Nacional</h3>
            </div>
            <div className="card-content">
              {coverageData.nacional.zonas.map((zona, index) => (
                <div key={index} className="region-group">
                  <h4 className="region-name">{zona.region}</h4>
                  <div className="cities-list">
                    {zona.ciudades.map((ciudad, idx) => (
                      <span key={idx} className="city-tag">{ciudad}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cobertura Internacional */}
          <div className="cobertura-card">
            <div className="card-header">
              <span className="card-icon">🌎</span>
              <h3 className="card-title">Cobertura Internacional</h3>
            </div>
            <div className="card-content">
              {coverageData.internacional.paises.map((pais, index) => (
                <div key={index} className="region-group">
                  <h4 className="region-name">{pais.nombre}</h4>
                  <div className="cities-list">
                    {pais.ciudades.map((ciudad, idx) => (
                      <span key={idx} className="city-tag">{ciudad}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="cobertura-stats">
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Ciudades cubiertas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Países</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Atención</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Entregas a tiempo</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cobertura;