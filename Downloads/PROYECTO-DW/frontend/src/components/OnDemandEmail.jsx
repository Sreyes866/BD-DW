import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';

export const sendOnDemandEmail = (offerId) => {
  fetch(`http://localhost/sendOnDemandOffer.php?offer_id=${offerId}`)
    .then(response => response.json())
    .then(data => {
      // Comprueba si los usuarios están presentes en la data recibida
      if (data && data[0] && Array.isArray(data[0].users)) {
        // Itera sobre los usuarios para enviar correos
        data[0].users.forEach(user => {
          const params = {
            to_email: user.email,
            user_name: user.username,
            discount_percentage: data[0].discount_percentage,
            expiry_date: data[0].expiry_date,
          };

          emailjs.send('service_c5fkjzh', 'template_p02u1wj', params, 'WMxWE_ETREhSpBmMO')
            .then(response => {
              console.log('SUCCESS!', response.status, response.text);
            }, error => {
              console.log('FAILED...', error);
            });
        });
      } else {
        console.log("No se encontraron usuarios para la oferta especificada");
      }
    })
    .catch(error => {
      console.log('Error fetching the users:', error);
    });
};

// Componente React
const OnDemandEmailComponent = () => {
  useEffect(() => {
      // No llame a sendOnDemandEmail aquí a menos que tenga un offerId específico para usar
  }, []);

  return (
    <div>
      <h1>On-Demand Email Sender</h1>
      <p>This component sends on-demand emails to users linked to a specific offer.</p>
    </div>
  );
};

export default OnDemandEmailComponent;