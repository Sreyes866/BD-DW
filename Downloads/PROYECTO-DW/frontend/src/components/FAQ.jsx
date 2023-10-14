import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FAQ = () => {
  const [ads, setAds] = useState([]);

  const handleAdClick = async (adId) => {
    try {
      await axios.post('http://localhost/TrackClick.php', { adId });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost/GetAllAds.php');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="faq-container">
      <h1>Preguntas Frecuentes</h1>
      <p>Pregunta 1</p>
      <p>Respuesta 1</p>

      <h2>Anuncios</h2>
      {ads.map((ad, index) => (
        <div key={index}>
          <a 
            href={ad.link_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => handleAdClick(ad.id)}
          >
            <img 
              src={ad.image_url} 
              alt="Ad" 
              style={{ width: '150px', height: '125px', cursor: 'pointer' }} 
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FAQ;