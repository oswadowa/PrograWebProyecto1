// Mapeo de países a regiones
export const countryToRegion = {
  // Norte América (NA)
  "Estados Unidos": "NA",
  "México": "NA",
  
  // Sudamérica (SA)
  "Guatemala": "SA",
  "Costa Rica": "SA",
  "Brasil": "SA",
  "Argentina": "SA",
  
  // Europa (EU)
  "España": "EU",
  "Francia": "EU",
  "Alemania": "EU",
  "Paises Bajos": "EU",
  
  // Asia (AS)
  "China": "AS",
  "Taiwan": "AS",
  "Corea del Sur": "AS",
  "Japón": "AS",
  
  // Oceanía (OC)
  // Por ahora no tenemos países de Oceanía en la lista
};

// Regiones disponibles
export const regions = {
  "NA": "Norte América",
  "SA": "Sudamérica",
  "EU": "Europa",
  "AS": "Asia",
  "OC": "Oceanía"
};

// Tabla de multiplicadores entre regiones (para precio)
export const regionMultipliers = {
  "NA-SA": 1.2,
  "NA-EU": 1.5,
  "NA-AS": 1.5,
  "NA-OC": 1.6,
  "SA-EU": 1.7,
  "SA-AS": 1.8,
  "SA-OC": 1.9,
  "EU-AS": 1.3,
  "EU-OC": 1.8,
  "AS-OC": 1.3
};

// Tabla de sumas para tiempo (días adicionales)
export const timeAdditions = {
  "NA-SA": 2,
  "NA-EU": 4,
  "NA-AS": 5,
  "NA-OC": 6,
  "SA-EU": 3,
  "SA-AS": 5,
  "SA-OC": 7,
  "EU-AS": 3,
  "EU-OC": 5,
  "AS-OC": 2
};

// Función para obtener el multiplicador según origen y destino
export const getRegionMultiplier = (originCountry, destCountry) => {
  if (!originCountry || !destCountry) {
    return 1.0;
  }
  
  if (originCountry === destCountry) {
    return 1.0;
  }
  
  const originRegion = countryToRegion[originCountry];
  const destRegion = countryToRegion[destCountry];
  
  if (!originRegion || !destRegion) {
    return 1.5;
  }
  
  if (originRegion === destRegion) {
    return 1.1;
  }
  
  const key1 = `${originRegion}-${destRegion}`;
  const key2 = `${destRegion}-${originRegion}`;
  
  const multiplier = regionMultipliers[key1] || regionMultipliers[key2];
  
  return multiplier || 1.5;
};

// Función para obtener el tiempo estimado según origen y destino
export const getEstimatedTime = (originCountry, destCountry, serviceLevel) => {
  // Tiempo base para misma región: 1-2 días
  let baseDays = 2;
  let additionalDays = 0;
  
  if (!originCountry || !destCountry) {
    if (serviceLevel === 'priority') {
      return '24-48 horas';
    }
    return '2-3 días hábiles';
  }
  
  // Si es el mismo país
  if (originCountry === destCountry) {
    if (serviceLevel === 'priority') {
      return '24 horas';
    }
    return '1-2 días hábiles';
  }
  
  const originRegion = countryToRegion[originCountry];
  const destRegion = countryToRegion[destCountry];
  
  // Si es la misma región pero diferente país
  if (originRegion === destRegion) {
    if (serviceLevel === 'priority') {
      return '24-48 horas';
    }
    return '1-3 días hábiles';
  }
  
  // Diferentes regiones: calcular días adicionales
  const key1 = `${originRegion}-${destRegion}`;
  const key2 = `${destRegion}-${originRegion}`;
  
  additionalDays = timeAdditions[key1] || timeAdditions[key2] || 0;
  
  // Calcular rango de días
  let minDays = baseDays + additionalDays;
  let maxDays = minDays + 1;
  
  if (serviceLevel === 'priority') {
    // Priority: restar 3 días solo si el mínimo es mayor o igual a 4
    if (minDays >= 4) {
      minDays = minDays - 3;
      maxDays = maxDays - 3;
      
      // Asegurar que no sea menor a 1
      if (minDays < 1) minDays = 1;
      if (maxDays < 1) maxDays = 1;
      
      // Si el resultado es 1 día exacto, mostrar en horas
      if (minDays === 1 && maxDays === 1) {
        return '24 horas';
      }
      return `${minDays}-${maxDays} días`;
    } else {
      // Si el tiempo base es menor a 4 días, Priority es 24-48 horas
      return '24-48 horas';
    }
  }
  
  // Servicio estándar
  return `${minDays}-${maxDays} días hábiles`;
};