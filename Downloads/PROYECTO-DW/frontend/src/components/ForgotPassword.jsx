import React from 'react';
import emailjs from 'emailjs-com';

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const user_email = e.target.user_email.value; 


    const templateParams = {
      to_email: user_email,
    };

    // Enviar correo con EmailJS
    emailjs.send('service_db-dw2', 'template_rq1e8jw', templateParams, '83TAqc_7hHgnfdESC')
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
        alert('Se ha enviado un correo para restablecer tu contraseña.');
      }, (err) => {
        console.log('Falló el envío del correo.', err);
        alert('Falló el envío del correo.');
      });
  };

  return (
    <div className="form-container">
      <h1>Olvidaste la contraseña</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_email">Correo electrónico</label>
        <input type="email" id="user_email" name="user_email" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ForgotPassword;