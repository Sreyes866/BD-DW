import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importar useHistory

const Subscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('Inactiva');
  const history = useHistory(); // Instanciar useHistory

  // Obtener el nombre del usuario del mensaje de bienvenida
  const welcomeMessage = document.querySelector('h1').textContent;
  const userName = welcomeMessage.replace('Bienvenido, ', '');

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.post('http://localhost/GetSubscriptionStatus.php', { userName });
        if (response.data.is_subscribed === 1) {
          setSubscriptionStatus('Activa');
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };

    if (userName) {
      fetchSubscriptionStatus();
    }
  }, [userName]);

  // Función para manejar el clic en el botón "Comprar"
  const handlePurchaseClick = () => {
    history.push('/process-subscription'); // Redireccionar al usuario a ProcessSubscription
  };

  return (
    <div className="subscription-container">
      <h1>Suscripción: {subscriptionStatus}</h1>
      <div className="plans">
        <div className="plan">
          <h2>Mensual</h2>
          <ul>
          <li>Libre de Anuncios: Disfrutarás de una experiencia de lectura sin interrupciones publicitarias.</li>
            <li>Interacción con Autores: Posibilidad de participar en discusiones y preguntas directas a los autores.</li>
            <li>Múltiples Dispositivos: Puedes tener hasta 4 dispositivos activos con una sola membresía, lo que brinda flexibilidad.</li>
            <li>Descargas de Artículos: La capacidad de descargar artículos para leer sin conexión en tus dispositivos.</li>
            <li>Anticipación: Serás uno de los primeros en leer los últimos artículos e investigaciones.</li>
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
            <li>Anticipación: Serás uno de los primeros en leer los últimos artículos e investigaciones.</li>
            <li>Contenido Exclusivo: Acceso a artículos y contenido que no se encuentra en otros lugares. </li>
            <li>Eventos Exclusivos: Acceso prioritario a eventos en línea relacionados con la temática de la revista, como conferencias y seminarios web.</li>
          </ul>
          <p>Q469.99/1 año</p>
          <button className="btn btn-primary" onClick={handlePurchaseClick}>Comprar</button>
        </div>
      </div>
      <p>La suscripción se renueva automáticamente</p>
    </div>
  );
};

export default Subscription;
