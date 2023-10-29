import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';

// Exporta la función para que pueda ser usada en otros archivos
export const sendAutomaticEmail = () => {
  // Consultar el archivo PHP para obtener los usuarios elegibles
  fetch('http://localhost/sendAutomaticOffers.php')
    .then(response => response.json())
    .then(data => {
      // Iterar a través de cada usuario elegible
      data.forEach(user => {
        // Configurar los parámetros del correo electrónico
        const params = {
          to_email: user.email,
          user_name: user.name,  // Nombre del usuario
          discount_percentage: user.offer_details.discount_percentage,  // Detalles de la oferta
          validity_days: user.offer_details.validity_days,
          continuous_login_days: user.offer_details.continuous_login_days,
        };

        // Enviar el correo electrónico usando EmailJS
        emailjs.send('service_c5fkjzh', 'template_cvj2q69', params, 'WMxWE_ETREhSpBmMO')
          .then(response => {
            console.log('SUCCESS!', response.status, response.text);
          }, error => {
            console.log('FAILED...', error);
          });
      });
    })
    .catch(error => {
      console.log('Error fetching the users:', error);
    });
};

const AutomaticEmail = () => {
  useEffect(() => {
    sendAutomaticEmail();  // Llama a la función
  }, []);

  return (
    <div>
      <h1>Automatic Email Sender</h1>
      <p>This component sends automatic emails to eligible users.</p>
    </div>
  );
};

export default AutomaticEmail;