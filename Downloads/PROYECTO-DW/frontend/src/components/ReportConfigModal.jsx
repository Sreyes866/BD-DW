import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';


const ReportConfigModal = ({ onClose }) => {
    const [moderatorEmails, setModeratorEmails] = useState([]);
    const [todayReportedComments, setTodayReportedComments] = useState([]);
    const [allReportedComments, setAllReportedComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/sendDailyModeratorReport.php');
                console.log("Respuesta del servidor:", response.data);
                setModeratorEmails(response.data.moderatorEmails);
                setTodayReportedComments(Array.isArray(response.data.todayReportedComments) ? response.data.todayReportedComments : []);
                setAllReportedComments(Array.isArray(response.data.allReportedComments) ? response.data.allReportedComments : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const formatComments = (comments) => {
        return comments.map(comment => 
            `ID: ${comment.CommentID}, Texto: ${comment.Text}, Reportes: ${comment.reportCount}, Fecha: ${comment.ReportDate}`
        ).join('\n');
    };

    const sendEmailReport = () => {
        if (!moderatorEmails || moderatorEmails.length === 0) {
            alert('No hay correos de moderadores para enviar el informe.');
            return;
        }

        const todayCommentsFormatted = formatComments(todayReportedComments);
        const allCommentsFormatted = formatComments(allReportedComments);

        moderatorEmails.forEach(moderator => {
            const emailParams = {
                moderator_name: moderator.name,
                date: new Date().toLocaleDateString(),
                today_comments: todayCommentsFormatted,
                all_comments: allCommentsFormatted
            };

            emailjs.send('service_db-dw2', 'template_vhblb7c', {...emailParams, to_email: moderator.email}, '83TAqc_7hHgnfdESC')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (error) => {
                    console.log('FAILED...', error);
                });
        });

        alert('Informe enviado a los moderadores.');
    };

    return (
        <div className="report-config-modal">
            <h3>Configuración del Informe</h3>
            <button onClick={onClose}>Cerrar</button>
            <button onClick={sendEmailReport}>Confirmar informe diario</button>

            <h4>Correos de Moderadores</h4>
            <ul>
                {moderatorEmails.map((moderator, index) => (
                    <li key={index}>{moderator.name} ({moderator.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default ReportConfigModal;
