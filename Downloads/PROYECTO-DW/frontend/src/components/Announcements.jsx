import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [ads, setAds] = useState([]);

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
        <div key={index}>
          <img src={ad.image_url} alt="Ad" />
          <a href={ad.link_url} target="_blank" rel="noopener noreferrer">Ver más</a>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
