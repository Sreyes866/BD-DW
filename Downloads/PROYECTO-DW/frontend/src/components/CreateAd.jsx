import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddDetails from './AddDetails';  // Importing AddDetails component

const CreateAd = () => {
  const [ad, setAd] = useState({
    image_url: '',
    link_url: ''
  });

  const [ads, setAds] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [currentAdId, setCurrentAdId] = useState(null);
  const [adDetails, setAdDetails] = useState(null);

  const handleCreateAd = async () => {
    try {
      const response = await axios.post('http://localhost/CreateAd.php', ad);
      if (response.data.message === 'Ad created successfully') {
        alert('Anuncio creado exitosamente');
        setAd({ image_url: '', link_url: '' });
        fetchAds();
      }
    } catch (error) {
      console.error('Error creating ad:', error);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost/GetAllAds.php');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleSave = async (updatedAd) => {
    try {
      const response = await axios.post('http://localhost/UpdateAds.php', updatedAd);
      if (response.data.message === 'Anuncio actualizado exitosamente') {
        fetchAds();
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/DeleteAds.php', { id });
      if (response.data.message === 'Anuncio eliminado exitosamente') {
        fetchAds();
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const handleAdClick = async (adId) => {
    try {
      console.log("Registrando clic para el anuncio con ID:", adId);  // Para depuración
      const response = await axios.post('http://localhost/TrackClick.php', { adId });
      if (response.data.message === 'Click registrado') {
        // Aquí podrías actualizar tu estado o hacer algo más
      }
    } catch (error) {
      console.error('Error registrando clic:', error);
    }
  };

  const handleShowDetails = async (adId) => {
    setCurrentAdId(adId);
    setShowDetails(true);
    try {
      const response = await axios.post('http://localhost/GetAdDetails.php', { adId });
      setAdDetails(response.data);
    } catch (error) {
      console.error('Error fetching ad details:', error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="create-ad-container">
      <h1>Crear Anuncio</h1>
      <input
        type="text"
        placeholder="URL de la imagen"
        value={ad.image_url}
        onChange={(e) => setAd({ ...ad, image_url: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL del enlace"
        value={ad.link_url}
        onChange={(e) => setAd({ ...ad, link_url: e.target.value })}
      />
      <button onClick={handleCreateAd}>Crear Anuncio</button>

      <h2>Anuncios existentes</h2>
      {ads.map((ad, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <>
              <input 
                defaultValue={ad.image_url} 
                onChange={(e) => ads[index].image_url = e.target.value}
              />
              <input 
                defaultValue={ad.link_url} 
                onChange={(e) => ads[index].link_url = e.target.value}
              />
              <button onClick={() => handleSave(ads[index])}>Guardar</button>
            </>
          ) : (
            <>
<a 
  href={ad.link_url} 
  target="_blank" 
  rel="noopener noreferrer" 
  onClick={() => handleAdClick(ad.id, 'http://localhost:3000/announcements')}
>
  <img 
    src={ad.image_url} 
    alt="Ad" 
    style={{ width: '150px', height: '125px', cursor: 'pointer' }} 
    onClick={(e) => { e.stopPropagation(); handleAdClick(ad.id); }}
  />
</a>
              <button onClick={() => setEditingIndex(index)}>Editar</button>
              <button onClick={() => handleDelete(ad.id)}>Eliminar</button>
              <button onClick={() => handleShowDetails(ad.id)}>Detalles</button>
              {showDetails && currentAdId === ad.id && <AddDetails adId={currentAdId} />}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreateAd;