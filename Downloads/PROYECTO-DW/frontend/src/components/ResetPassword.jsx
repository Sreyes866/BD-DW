import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost/resetPassword.php', { email, newPassword });
      if (response.data.message === 'Contraseña actualizada') {
        setResetSuccess(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error al actualizar la contraseña');
    }
  };

  return resetSuccess ? (
    <div className="success-container">
      <h1>Contraseña actualizada exitosamente</h1>
      <a href="http://localhost:3000/login">Ir a iniciar sesión</a>
    </div>
  ) : (
    <div className="form-container">
      <h1>Establecer nueva contraseña</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="newPassword">Nueva contraseña</label>
        <input type="password" id="newPassword" name="newPassword" required />

        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required />

        <button type="submit">Establecer nueva contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;