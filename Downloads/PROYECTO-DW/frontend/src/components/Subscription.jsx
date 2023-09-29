import React from 'react';

const Subscription = () => {
  return (
    <div className="subscription-container">
      <h1>Suscripción: Inactiva</h1>
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
          <p>Q46.99/mes</p>
          <button className="btn btn-primary">Comprar</button>
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
          <p>Q469.99/año</p>
          <button className="btn btn-primary">Comprar</button>
        </div>
      </div>
      <p>La suscripción se renueva automáticamente</p>
    </div>
  );
};

export default Subscription;
