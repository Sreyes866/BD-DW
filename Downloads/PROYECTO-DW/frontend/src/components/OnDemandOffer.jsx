import React, { useState } from 'react';
import axios from 'axios';

const OnDemandOffer = () => { 
  const [userIds, setUserIds] = useState('');
  const [discount, setDiscount] = useState('');
  const [validityDays, setValidityDays] = useState('');

  const sendOffer = async () => {
    const payload = {
      user_ids: userIds.split(',').map(id => parseInt(id.trim())),
      discount: parseInt(discount),
      validity_days: parseInt(validityDays),
    };

    try {
      await axios.post('http://backend-url/SendOnDemandOffer.php', payload);
      alert('Ofertas enviadas exitosamente');
    } catch (error) {
      alert('Error al enviar ofertas');
    }
  };

  return (
    <div>
      <h1>Enviar oferta On Demand</h1>
      <input
        type="text"
        placeholder="IDs de usuarios (separados por coma)"
        value={userIds}
        onChange={e => setUserIds(e.target.value)}
      />
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
      <button onClick={sendOffer}>Enviar oferta</button>
    </div>
  );
};

export default OnDemandOffer;