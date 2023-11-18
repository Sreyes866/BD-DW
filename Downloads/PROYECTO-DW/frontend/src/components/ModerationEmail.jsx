import emailjs from 'emailjs-com';

const ModerationEmail = () => {
  const sendRejectionEmail = (articleId, authorEmail) => {
    const templateParams = {
      article_id: articleId,
      author_email: authorEmail,
      // Aquí puedes añadir más parámetros si tu plantilla de correo los requiere
    };

    emailjs.send('service_97sfyyu', 'template_cy2enpo', templateParams, 'JuvkFpFUkVC3f6giZ')
      .then((response) => {
        console.log('Email sent successfully', response.status, response.text);
      }, (error) => {
        console.log('Failed to send email', error);
      });
  };

  return { sendRejectionEmail };
};

export default ModerationEmail;
