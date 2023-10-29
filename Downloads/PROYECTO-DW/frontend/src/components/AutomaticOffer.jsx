import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sendAutomaticEmail } from './AutomaticEmail';

//import AutomaticEmail from './components/AutomaticEmail';

const AutomaticOffer = () => {
  const [configs, setConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeOffers, setActiveOffers] = useState({});
  const [sentToUsers, setSentToUsers] = useState([]); // Agregado
  const [showSentInfo, setShowSentInfo] = useState(false); // Agregado
  const [formData, setFormData] = useState({
    discount_percentage: 5,
    validity_days: 1,
    continuous_login_days: 1
  });

  const fetchData = () => {
    axios.post('http://localhost/offer_config.php', { action: 'read' })
      .then(response => setConfigs(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createOffer = () => {
    axios.post('http://localhost/offer_config.php', { ...formData, action: 'create' })
      .then(response => {
        fetchData();
      })
      .catch(error => console.error(error));
  };

  const updateOffer = () => {
    axios.post('http://localhost/offer_config.php', {
      ...selectedConfig,
      action: 'update',
      id: selectedConfig.id
    })
    .then(response => {
      fetchData();
      setIsEditing(false);
    })
    .catch(error => console.error(error));
  };

  const deleteOffer = () => {
    axios.post('http://localhost/offer_config.php', { action: 'delete', id: selectedConfig.id })
      .then(response => {
        fetchData();
        setSelectedConfig(null);
      })
      .catch(error => console.error(error));
  };

  const activateOffer = (id) => {
    const offerToActivate = configs.find(config => config.id === id);
    if (offerToActivate) {
      sendAutomaticEmail(offerToActivate);
      fetch('http://localhost/sendAutomaticOffers.php')
        .then(response => response.json())
        .then(data => {
          setSentToUsers(data);
          setShowSentInfo(true);
        })
        .catch(error => {
          console.error("Hubo un error al obtener la lista de usuarios:", error);
        });
    }
  };


  
  return (
    <div className="automatic-offer-container">
      <h1>Automatic Offer Configuration</h1>
      <div className="form-section">
        <label htmlFor="discount_percentage">Porcentaje de Descuento: </label>
        <select id="discount_percentage" onChange={e => setFormData({ ...formData, discount_percentage: e.target.value })}>
          {[...Array(20).keys()].map(i => <option key={i} value={(i + 1) * 5}>{(i + 1) * 5}%</option>)}
        </select>
        <label htmlFor="validity_days">Días de Validez: </label>
        <select id="validity_days" onChange={e => setFormData({ ...formData, validity_days: e.target.value })}>
          {[...Array(30).keys()].map(i => <option key={i} value={i + 1}>{i + 1} días</option>)}
        </select>
        <label htmlFor="continuous_login_days">Días Consecutivos de Inicio de Sesión: </label>
        <select id="continuous_login_days" onChange={e => setFormData({ ...formData, continuous_login_days: e.target.value })}>
          {[...Array(30).keys()].map(i => <option key={i} value={i + 1}>{i + 1} días</option>)}
        </select>
        <button onClick={createOffer}>Crear Oferta</button>
      </div>
      <div className="offers-section">
<h2>Ofertas Existentes</h2>
<div className="offers-grid">
  {configs.map((config, index) => (
    <div className="offer-card" key={index}>
      <p>Descuento: {config.discount_percentage}%</p>
      <p>Validez: {config.validity_days} días</p>
      <button onClick={() => setSelectedConfig(config)}>Seleccionar</button>
      <button 
        disabled={!!activeOffers[config.id]} 
        onClick={() => {
          activateOffer(config.id); // Llama a la función para activar la oferta
          setActiveOffers({ ...activeOffers, [config.id]: true }); // Marca la oferta como activa
        }}
      >
        {activeOffers[config.id] ? 'Oferta Activada' : 'Activar Oferta'}
      </button>
    </div>
  ))}
</div>
{selectedConfig && (
          <div className="offer-details">
            <h3>Detalles de la Oferta</h3>
            <p>ID: {selectedConfig.id}</p>
            {isEditing ? (
              <div className="edit-section">
                <label htmlFor="discount_percentage">Porcentaje de Descuento: </label>
                <select id="discount_percentage" value={selectedConfig.discount_percentage} onChange={e => setSelectedConfig({ ...selectedConfig, discount_percentage: parseInt(e.target.value) })}>
                  {[...Array(20).keys()].map(i => <option key={i} value={(i + 1) * 5}>{(i + 1) * 5}%</option>)}
                </select>
                <label htmlFor="validity_days">Días de Validez: </label>
                <select id="validity_days" value={selectedConfig.validity_days} onChange={e => setSelectedConfig({ ...selectedConfig, validity_days: parseInt(e.target.value) })}>
                  {[...Array(30).keys()].map(i => <option key={i} value={i + 1}>{i + 1} días</option>)}
                </select>
                <label htmlFor="continuous_login_days">Días Consecutivos de Inicio de Sesión: </label>
                <select id="continuous_login_days" value={selectedConfig.continuous_login_days} onChange={e => setSelectedConfig({ ...selectedConfig, continuous_login_days: parseInt(e.target.value) })}>
                  {[...Array(30).keys()].map(i => <option key={i} value={i + 1}>{i + 1} días</option>)}
                </select>
                <button onClick={updateOffer}>Guardar</button>
                <button onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <p>Porcentaje de Descuento: {selectedConfig.discount_percentage}%</p>
                <p>Días de Validez: {selectedConfig.validity_days}</p>
                <p>Días Consecutivos de Inicio de Sesión: {selectedConfig.continuous_login_days}</p>
                <div className="buttons-section">
                  <button onClick={() => setIsEditing(true)}>Editar</button>
                  <button onClick={() => deleteOffer()}>Eliminar</button>
                </div>
              </div>
            )}
  </div>
)}
      {showSentInfo && (
        <div className="sent-info-popup">
          <h2>Información de Envío</h2>
          <p>Se ha enviado la oferta a:</p>
          <ul>
            {sentToUsers.map((user, index) => (
              <li key={index}>
                {user.name} al correo {user.email}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowSentInfo(false)}>Cerrar</button>
  </div>
)}
</div>
</div>
);
};

export default AutomaticOffer;
