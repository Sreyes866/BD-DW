import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [ads, setAds] = useState([]);

  const handleAdClick = async (adId, link_url, event) => {
    event.preventDefault(); // Evita la recarga de la página
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName: 'announcements' });
      // Abre el URL del anuncio en una nueva pestaña
      window.open(link_url, '_blank');
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
    <div className="container text-center">
      <h1 className="my-4">Anuncios</h1>
      <div className="row justify-content-center">
        {ads.map((ad, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <a 
                href={ad.link_url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(event) => handleAdClick(ad.id, ad.link_url, event)}
              >
                <img
                  className="card-img-top"
                  src={ad.image_url}
                  alt="Ad"
                  style={{ cursor: 'pointer' }}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;