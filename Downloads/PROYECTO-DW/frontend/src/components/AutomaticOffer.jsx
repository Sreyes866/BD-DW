import React, { useState } from 'react';
import axios from 'axios';

const AutomaticOffer = () => {
  const [discount, setDiscount] = useState('');
  const [validityDays, setValidityDays] = useState('');
  const [loginDays, setLoginDays] = useState('');

  const configureOffer = async () => {
    const payload = {
      discount: parseInt(discount),
      validity_days: parseInt(validityDays),
      login_days: parseInt(loginDays),
    };

    try {
      await axios.post('http://backend-url/ConfigureAutomaticOffer.php', payload);
      alert('Configuración guardada exitosamente');
    } catch (error) {
      alert('Error al guardar configuración');
    }
  };

  return (
    <div>
      <h1>Configurar oferta automática</h1>
      <input
        type="text"
        placeholder="Descuento"
        value={discount}
        onChange={e => setDiscount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Días de validez"
        value={validityDays}
        onChange={e => setValidityDays(e.target.value)}
      />
      <input
        type="text"
        placeholder="Días de login consecutivos"
        value={loginDays}
        onChange={e => setLoginDays(e.target.value)}
      />
      <button onClick={configureOffer}>Guardar configuración</button>
    </div>
  );
};

export default AutomaticOffer;