import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
        const response = await axios.get('http://localhost/GetAllAds.php');
        setAds(response.data.filter(ad => ad.page_name === 'announcements'));
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  
  const handleAdClick = async (adId) => {
    try {
      await axios.post('http://localhost/TrackClick.php', { adId });
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

      {/* Aquí va el contenido principal de la página de contacto */}

      {/* Sección de anuncios */}
      <h2>Anuncios</h2>
      {ads.map((ad, index) => (
        <div key={index} onClick={() => handleAdClick(ad.id)}>
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
