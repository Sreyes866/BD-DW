import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [ads, setAds] = useState([]);

  const handleAdClick = async (adId) => {
    try {
      await axios.post('http://localhost/TrackClick.php', { adId });
      // Puedes volver a buscar los detalles del anuncio para actualizar la UI si es necesario.
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
    <div className="announcements-container">
      <h1>Anuncios</h1>
      {ads.map((ad, index) => (
        <div key={index} onClick={() => handleAdClick(ad.id)}>
<img 
  src={ad.image_url} 
  alt="Ad" 
  style={{ width: '150px', height: '125px', cursor: 'pointer' }} 
  onClick={(event) => handleAdClick(event, ad.id)}
/>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
