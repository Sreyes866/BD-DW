import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const SubscriptionStatus = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('Inactiva');
  const [expiryDate, setExpiryDate] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [onDemandDiscount, setOnDemandDiscount] = useState(null);
  const { userUsername } = useAuth();
  const { userEmail } = useAuth(); 
  const history = useHistory();

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.post('http://localhost/GetSubscriptionStatus.php', { username: userUsername });
      setSubscriptionStatus(response.data.is_subscribed === 1 ? 'Activa' : 'Inactiva');
      setExpiryDate(response.data.expiryDate);
    } catch (error) {
      console.error('Error al obtener el estado de la suscripción:', error);
    }
  };


  const fetchDiscount = async () => {
    try {
      const response = await axios.post('http://localhost/sendAutomaticOffers.php');
      const usersWithOffers = response.data;
      const userOffer = usersWithOffers.find(u => u.email === userEmail);  // Utilizar userEmail para la comparación
      if (userOffer) {
        setDiscountPercentage(userOffer.offer_details.discount_percentage);
      }
    } catch (error) {
      console.error('Error al obtener el descuento:', error);
    }
  };
  
  const fetchOnDemandDiscount = async () => {
    try {
      const response = await axios.post('http://localhost/sendOnDemandOffer.php');
      const offers = response.data;
      const userOffer = offers.find(offer => offer.users.some(u => u.username === userUsername));
      if (userOffer) {
        setOnDemandDiscount(userOffer.discount_percentage);
      }
    } catch (error) {
      console.error('Error al obtener el descuento bajo demanda:', error);
    }
  };


  useEffect(() => {
    fetchSubscriptionStatus();
    fetchDiscount();
    fetchOnDemandDiscount();
  }, [userUsername]);

  const handlePurchaseClick = () => {
    history.push('/process-subscription');
  };

const handleCancelSubscription = async () => {
  try {
    const response = await axios.post('http://localhost/CancelSubscription.php', { username: userUsername });
    if (response.data.message === 'Suscripción cancelada') {
      setSubscriptionStatus('Inactiva');
    } else {
      console.error('Error al cancelar la suscripción:', response.data.error);
    }
  } catch (error) {
    console.error('Error al enviar la petición de cancelación:', error);
  }
};

const originalPrice = 469.99;
const discountedPrice = discountPercentage ? originalPrice * (1 - discountPercentage / 100) : null;

const finalDiscount = onDemandDiscount || discountPercentage;


  return (
    <div className="subscription-container">
      <h1>Estado de la Suscripción: {subscriptionStatus}</h1>
      {subscriptionStatus === 'Activa' ? (
        <div>
          <p>Próxima renovación: {expiryDate}</p>
          <button className="btn btn-danger" onClick={handleCancelSubscription}>Cancelar Suscripción Premium</button>
        </div>
    ) : (
      <div className="plans">
        <div className="plan">
          <h2>Mensual</h2>
          <ul>
            <li>Libre de Anuncios: Disfrutarás de una experiencia de lectura sin interrupciones publicitarias.</li>
            <li>Interacción con Autores: Posibilidad de participar en discusiones y preguntas directas a los autores.</li>
            <li>Múltiples Dispositivos: Puedes tener hasta 4 dispositivos activos con una sola membresía, lo que brinda flexibilidad.</li>
            <li>Descargas de Artículos: La capacidad de descargar artículos para leer sin conexión en tus dispositivos.</li>
          </ul>
          <p>Q289.99/6 meses</p>
          <button className="btn btn-primary" onClick={handlePurchaseClick}>Comprar</button>
        </div>
        <div className="plan">
        <h2>Anual</h2>
        <ul>
          <li>Libre de Anuncios: Disfrutarás de una experiencia de lectura sin interrupciones publicitarias.</li>
          <li>Interacción con Autores: Posibilidad de participar en discusiones y preguntas directas a los autores.</li>
          <li>Múltiples Dispositivos: Puedes tener hasta 4 dispositivos activos con una sola membresía, lo que brinda flexibilidad.</li>
          <li>Descargas de Artículos: La capacidad de descargar artículos para leer sin conexión en tus dispositivos.</li>
        </ul>
        {(discountPercentage || finalDiscount) ? (
          <>
            <p style={{textDecoration: 'line-through'}}>Q{originalPrice.toFixed(2)}/1 año</p>
            <p>Q{(originalPrice * (1 - (discountPercentage || finalDiscount) / 100)).toFixed(2)}/1 año con {(discountPercentage || finalDiscount)}% de descuento</p>
          </>
        ) : (
          <p>Q{originalPrice.toFixed(2)}/1 año</p>
        )}
        <button className="btn btn-primary" onClick={handlePurchaseClick}>Comprar</button>
      </div>
    </div>
  )}
  <p>La suscripción se renueva automáticamente</p>
</div>
);

          };
export default SubscriptionStatus;