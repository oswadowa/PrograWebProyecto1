// Configuración de Google Sheets
// URL de tu Web App desplegada
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwLHCE3PMPgghhyrkPt30Cwbng4hETirU0bgzEc2dX_jgw-G1SMIoa5l5p2XN_eyR-d/exec';

export const saveToGoogleSheets = async (data) => {
  try {
    console.log('Enviando datos a Google Sheets:', data);
    
    // Preparar los datos para enviar
    const formData = new URLSearchParams();
    formData.append('fecha', data.fecha);
    formData.append('origen', data.origen);
    formData.append('destino', data.destino);
    formData.append('peso', data.peso);
    formData.append('distancia', data.distancia);
    formData.append('servicio', data.servicio);
    formData.append('tiempo', data.tiempo);
    formData.append('total', data.total);
    
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    console.log('Datos enviados correctamente');
    return { success: true };
  } catch (error) {
    console.error('Error al guardar en Google Sheets:', error);
    return { success: false, error: error.message };
  }
};