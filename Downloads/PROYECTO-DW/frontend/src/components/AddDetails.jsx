import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddDetails = ({ adId }) => {
  const [adDetails, setAdDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axios.post('http://localhost/GetAdDetails.php', { adId });
      if (response.data.status === 'success') {
        setAdDetails({
          page_name: response.data.pageName,
          clicked_at: response.data.totalClicks
        });
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
      <p>Página: {adDetails?.page_name || 'Cargando...'}</p>
      <p>Clics: {adDetails?.clicked_at || 'Cargando...'}</p>
    </div>
  );
};

export default AddDetails;