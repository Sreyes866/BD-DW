import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdComponent = ({ pageName }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    // Obtener un anuncio al azar
    axios.get('http://localhost/GetRandomAd.php')
      .then(response => {
        setAd(response.data);
      })
      .catch(error => {
        console.error('Error fetching ad:', error);
      });
  }, []);

  const handleAdClick = () => {
    // Registrar clic en el anuncio
    axios.post('http://localhost/RecordClick.php', {
      ad_id: ad.id,
      page_name: pageName
    })
    .then(response => {
      console.log('Ad clicked:', response.data);
    })
    .catch(error => {
      console.error('Error recording click:', error);
    });
  };

  return (
    <div>
      {ad && (
        <a href={ad.link_url} onClick={handleAdClick}>
          <img src={ad.image_url} alt="Ad" />
        </a>
      )}
    </div>
  );
};

export default AdComponent;