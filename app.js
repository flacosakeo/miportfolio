document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('599UoUoXRpHdXBiQ5'); // Reemplaza 'YOUR_USER_ID' con tu User ID de EmailJS
});

document.getElementById('formulario').addEventListener('submit', function(event) {

    event.preventDefault();

    // Parámetros del servicio y template de EmailJS
    const serviceID = 'service_7b1utmn'; // Reemplaza 'TU_SERVICE_ID' con tu Service ID de EmailJS
    const templateID = 'template_ywmrenj'; // Reemplaza 'TU_TEMPLATE_ID' con tu Template ID de EmailJS

    // Recopilar datos del formulario
    const params = {
      name: document.getElementById('formularionombre').value,
      email: document.getElementById('formularioemail').value,
      message: document.getElementById('formulariomensaje').value
    };

    // Enviar correo usando EmailJS
    emailjs.send(serviceID, templateID, params)
      .then(function(response) {
        console.log('Correo enviado exitosamente', response.status, response.text);
        alert('Correo enviado exitosamente');
        bootstrap.Modal.getInstance(document.getElementById('exampleModal')).hide();
      }, function(error) {
        console.error('Error al enviar el correo', error);
        alert('Error al enviar el correo');
      });
  });