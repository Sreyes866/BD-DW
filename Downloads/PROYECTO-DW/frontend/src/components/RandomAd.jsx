import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomAd = ({ onAdClick }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchRandomAd = async () => {
      try {
        const response = await axios.get('http://localhost/GetRandomAd.php');
        setAd(response.data);
      } catch (error) {
        console.error('Error fetching random ad:', error);
      }
    };

    fetchRandomAd();
  }, []);

  if (!ad) {
    return <div>Cargando anuncio...</div>;
  }

  return (
    <div className="ad-card">
      <div className="card">
        <a 
          href={ad.link_url} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(event) => onAdClick(ad.id, ad.link_url, event)}
        >
          <img
            className="ad-image"
            src={ad.image_url}
            alt="Anuncio"
            style={{ cursor: 'pointer' }}
          />
        </a>
      </div>
    </div>
  );
};

export default RandomAd;