import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProcessSubscription = () => {
  const { userUsername, setIsSubscribed, setExpiryDate } = useAuth(); // Obtener setIsSubscribed y setExpiryDate del contexto
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');

  const handleSubscription = async (duration) => {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setMonth(today.getMonth() + duration);

    console.log("Sending:", { username: userUsername, expiryDate: expiryDate.toISOString().split('T')[0] }); // Log para depuración

    try {
      const response = await axios.post('http://localhost/SubscribeUser.php', {
        username: userUsername,
        expiryDate: expiryDate.toISOString().split('T')[0]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response data:", response.data); // Log para depuración

      if (response.data.message === 'User subscribed successfully') {
        setIsSubscribed(1);
        setExpiryDate(expiryDate.toISOString().split('T')[0]);
        alert(`Subscription successful. Expires on: ${expiryDate.toLocaleDateString()}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (value.length <= 19) {
      setCardNumber(value);
    }
  };

  const handleCvv = (e) => {
    let value = e.target.value;
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  return (
    <div className="subscription-process-container">
      <h1>Complete Your Subscription</h1>
      <label>Card Number:</label>
      <input 
        type="text" 
        value={cardNumber} 
        onChange={handleCardNumber} 
        maxLength="19" 
      />
      <label>CVV:</label>
      <input 
        type="text" 
        value={cvv} 
        onChange={handleCvv} 
        maxLength="3"
      />
      <label>Expiry Date:</label>
      <div>
        <select onChange={e => setExpiryMonth(e.target.value)} value={expiryMonth}>
          <option value="" disabled>Month</option>
          {[...Array(12).keys()].map(i => (
            <option key={i} value={i+1}>{String(i+1).padStart(2, '0')}</option>
          ))}
        </select>
        <select onChange={e => setExpiryYear(e.target.value)} value={expiryYear}>
          <option value="" disabled>Year</option>
          {[...Array(21).keys()].map(i => (
            <option key={i} value={2023+i}>{2023+i}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={() => handleSubscription(6)}>Confirm Purchase (6 months)</button>
      <button className="btn btn-primary" onClick={() => handleSubscription(12)}>Confirm Purchase (1 year)</button>    
    </div>
  );
};

export default ProcessSubscription;