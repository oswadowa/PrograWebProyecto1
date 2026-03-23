// Configuración de Google Sheets
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxx3MubzN2QB3OZeH1zuNKshecpmXfjYKGjuef7zMbHufScPjzz0QSE6Qwm89HUFSjz/exec';

export const saveContactToGoogleSheets = async (data) => {
  try {
    console.log('Enviando contacto a Google Sheets:', data);
    
    // Crear un formulario oculto para evitar CORS
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SHEETS_URL;
    form.target = 'google-sheets-iframe';
    form.style.display = 'none';
    
    // Agregar los campos al formulario
    const fields = ['fecha', 'nombre', 'email', 'telefono', 'mensaje'];
    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field;
      input.value = data[field];
      form.appendChild(input);
    });
    
    // Crear un iframe invisible para la respuesta
    let iframe = document.getElementById('google-sheets-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'google-sheets-iframe';
      iframe.name = 'google-sheets-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    
    document.body.appendChild(form);
    form.submit();
    
    // Limpiar después de un tiempo
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
    
    console.log('Formulario enviado');
    return { success: true };
  } catch (error) {
    console.error('Error al guardar contacto:', error);
    return { success: false, error: error.message };
  }
};