import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sendOnDemandEmail } from './OnDemandEmail';  


const DemandOffer = () => {
  const [formData, setFormData] = useState({
    user_ids: '',
    discount_percentage: 5,
    validity_days: 1
  });
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const fetchOffers = () => {
    axios.get('http://localhost/sendOnDemandOffer.php')
    .then(response => {
      setOffers(response.data);
    })
    .catch(error => {
      console.error('Error al obtener las ofertas:', error);
    });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const createOffer = () => {
    const expiry_date = new Date();
    expiry_date.setDate(expiry_date.getDate() + formData.validity_days);

    axios.post('http://localhost/DemandOfferConfig.php', {
      user_ids: formData.user_ids.split(',').map(id => id.trim()),
      discount_percentage: formData.discount_percentage,
      expiry_date: expiry_date.toISOString().split('T')[0]
    })
    .then(response => {
      if (response.data.not_found_users.length > 0) {
        alert("Usuarios no encontrados: " + response.data.not_found_users.join(', '));
      } else {
        alert("Oferta creada exitosamente");
        fetchOffers();
      }
    })
    .catch(error => {
      alert("Error al crear la oferta");
    });
  };

  const activateOffer = () => {
    if (selectedOffer) {
      sendOnDemandEmail(selectedOffer.offer_id);
      alert('Oferta activada y correos enviados');
    } else {
      alert('Ninguna oferta seleccionada');
    }
  };

  const deleteOffer = (offer_id) => {
    axios.post('http://localhost/DemandOfferConfig.php', {
      offer_id_to_delete: offer_id 
    })
    .then(response => {
      if(response.data.message === 'Oferta y relaciones eliminadas exitosamente') {
        alert("Oferta eliminada exitosamente");
        fetchOffers();
        setSelectedOffer(null);
      } else {
        alert("Error al eliminar la oferta");
      }
    })
    .catch(error => {
      alert("Error al eliminar la oferta");
    });
  };
  

  const selectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  return (
    <div className="demand-offer-container">
      <h1>Crear Oferta a Demanda</h1>
      <div className="form-section">
        <label htmlFor="user_ids">User IDs (separados por coma):</label>
        <input id="user_ids" type="text" onChange={e => setFormData({ ...formData, user_ids: e.target.value })} />
        <label htmlFor="discount_percentage">Porcentaje de Descuento:</label>
        <select id="discount_percentage" onChange={e => setFormData({ ...formData, discount_percentage: parseInt(e.target.value) })}>
          {[...Array(20).keys()].map(i => <option key={i} value={(i + 1) * 5}>{(i + 1) * 5}%</option>)}
        </select>
        <label htmlFor="validity_days">Días de Validez:</label>
        <select id="validity_days" onChange={e => setFormData({ ...formData, validity_days: parseInt(e.target.value) })}>
          {[...Array(30).keys()].map(i => <option key={i} value={i + 1}>{i + 1} días</option>)}
        </select>
        <button onClick={createOffer}>Crear Oferta</button>
      </div>

      <div className="offers-section">
        <h2>Ofertas existentes</h2>
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div className="offer-card" key={index}>
              <p>Oferta: {offer.offer_id}</p>
              <p>Descuento: {offer.discount_percentage}%</p>
              <button onClick={() => selectOffer(offer)}>Seleccionar</button>
            </div>
          ))}
        </div>

        {selectedOffer && (
          <div className="offer-details">
            <h2>Detalles de la oferta {selectedOffer.offer_id}</h2>
            <p>Porcentaje de descuento: {selectedOffer.discount_percentage}%</p>
            <p>Validez hasta: {selectedOffer.expiry_date}</p>
            <h2>Usuarios</h2>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {selectedOffer.users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => activateOffer(selectedOffer.offer_id)}>Activar Oferta</button>
            <button onClick={() => deleteOffer(selectedOffer.offer_id)}>Eliminar Oferta</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemandOffer;