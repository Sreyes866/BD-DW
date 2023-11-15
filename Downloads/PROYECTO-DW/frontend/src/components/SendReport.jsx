import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const SendReport = () => {
    const [isLoading, setIsLoading] = useState(false);

    const sendEmailReport = () => {
        setIsLoading(true);

        // Solicitar los datos del reporte al servidor PHP y enviar correo
        axios.get('http://localhost/sendDailyReport.php')
            .then(response => {
                // Formatear los datos para el correo
                const emailContent = response.data.map(item => 
                    `ID: ${item.CommentID}, Texto: ${item.Text}, Reportes: ${item.reportCount}`
                ).join('\n');

                const emailParams = {
                    to_name: 'Nombre del Moderador', // Personaliza según sea necesario
                    message: emailContent
                    // Añade aquí otros parámetros de tu plantilla EmailJS
                };

                // Enviar correo electrónico usando EmailJS
                return emailjs.send('service_db-dw2', 'template_vhblb7c', emailParams, '83TAqc_7hHgnfdESC');
            })
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Informe enviado a los moderadores.');
            })
            .catch((error) => {
                console.error('Error al enviar el informe:', error);
                alert('Hubo un error al enviar el informe.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <button onClick={sendEmailReport} disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Reporte Automático'}
            </button>
        </div>
    );
};

export default SendReport;
