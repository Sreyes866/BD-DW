import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddDetails = ({ adId }) => {
  const [adDetails, setAdDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await axios.post('http://localhost/GetAdDetails.php', { adId });

      if (response.data.status === 'success') {
        setAdDetails(response.data.details);
      } else {
        console.error('Error fetching details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [adId]);

  return (
    <div className="add-details-container">
      <h3>Detalles del anuncio:</h3>
      {adDetails.length ? (
        adDetails.map((detail, index) => (
          <div key={index}>
            <p>Página: {detail.page_name}</p>
            <p>Clics: {detail.totalClicks}</p>
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default AddDetails;