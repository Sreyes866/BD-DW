import React from 'react';

const ConfirmationPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Correo confirmado con éxito</h1>
      <p>Puedes volver a la página principal para iniciar sesión.</p>
      <a href="/login">Iniciar sesión</a>
    </div>
  );
};

export default ConfirmationPage;