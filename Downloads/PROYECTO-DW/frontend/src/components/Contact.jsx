// Contact.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost/GetAllAds.php');
      setAds(response.data.filter(ad => ad.page_name === 'contact'));
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleAdClick = async (adId, link_url) => {
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName: 'contact' });
      // Redireccionar al URL del anuncio
      window.location.href = link_url;
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
  
  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <h2>Anuncios</h2>
      {ads.map((ad, index) => (
        <div key={index} onClick={() => handleAdClick(ad.id, ad.link_url)}>
          <img 
            src={ad.image_url} 
            alt="Ad" 
            style={{ width: '150px', height: '125px', cursor: 'pointer' }} 
          />
        </div>
      ))}
    </div>
  );
};

export default Contact;