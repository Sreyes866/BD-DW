import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
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
        setAds(response.data.filter(ad => ad.page_name === 'history'));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
  
    fetchAds();
  }, []);
  

  return (
    <div className="history-container">
      <h1>Historia de la Empresa</h1>
      <p>Descripción de la historia de la empresa.</p>
      
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

export default History;
