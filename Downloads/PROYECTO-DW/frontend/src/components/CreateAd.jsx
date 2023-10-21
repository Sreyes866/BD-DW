import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDetails from './AddDetails';
import ClickReport from './ClickReport';


const CreateAd = () => {
  const [ad, setAd] = useState({ image_url: '', link_url: '', page_name: ''});
  const [ads, setAds] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentAdId, setCurrentAdId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [adDetails, setAdDetails] = useState(null);
  const [clickData, setClickData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleCreateAd = async () => {
    if (!ad.page_name) {
      alert('Por favor, seleccione una página.');
      return;
    }
    try {
      const response = await axios.post('http://localhost/CreateAd.php', ad);
      if (response.data.message === 'Ad created successfully') {
        alert('Anuncio creado exitosamente');
        setAd({ image_url: '', link_url: '', page_name: '' });
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
      if (response.data.message === 'Ad updated successfully') {
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
      if (response.data.message === 'Ad deleted successfully') {
        fetchAds();
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const handleAdClick = async (adId, pageName) => {
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName });
    } catch (error) {
      console.error('Error tracking click:', error);
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


  const fetchClickData = async () => {
    try {
      const response = await axios.get('http://localhost/GetClickReport.php');
      setClickData(response.data);
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
  };

  useEffect(() => {
    fetchAds();
    fetchClickData();
  }, []);

  
  return (
    <div className="container">
      <h1 className="my-4">Crear Anuncio</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="URL de la imagen"
          value={ad.image_url}
          onChange={(e) => setAd({ ...ad, image_url: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="URL del enlace"
          value={ad.link_url}
          onChange={(e) => setAd({ ...ad, link_url: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Seleccione una página:</label>
        <select
          className="form-control"
          value={ad.page_name}
          onChange={(e) => setAd({ ...ad, page_name: e.target.value })}
        >
          <option value="" disabled>Seleccione una página</option>
          <option value="home">Home</option>
          <option value="contact">Contacto</option>
          <option value="history">Historia</option>
          <option value="faq">Preguntas Frecuentes</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleCreateAd}>Crear Anuncio</button>
  
      <h2 className="my-4">Anuncios existentes</h2>
    <div className="row">
      {ads.map((ad, index) => (
        <div key={index} className="col-md-4">
          <div className="card mb-4">
            {editingIndex === index ? (
              <>
                <input
                  className="form-control"
                  defaultValue={ad.image_url}
                  onChange={(e) => ads[index].image_url = e.target.value}
                />
                <input
                  className="form-control"
                  defaultValue={ad.link_url}
                  onChange={(e) => ads[index].link_url = e.target.value}
                />
                <button className="btn btn-success mt-2" onClick={() => handleSave(ads[index])}>Guardar</button>
                <button className="btn btn-dark mt-2 ml-2" onClick={() => setEditingIndex(null)}>Cerrar</button>
              </>
            ) : (
              <>
                <a 
                  href={ad.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => handleAdClick(ad.id, ad.page_name)}
                >
                  <img 
                    className="card-img-top" 
                    src={ad.image_url} 
                    alt="Ad" 
                  />
                </a>
                <div className="card-body">
                <button className="btn btn-secondary" onClick={() => setEditingIndex(index)}>Editar</button>
                  <button className="btn btn-danger ml-2" onClick={() => handleDelete(ad.id)}>Eliminar</button>
                  <button className="btn btn-info ml-2" onClick={() => handleShowDetails(ad.id)}>Detalles</button>
                  {showDetails && currentAdId === ad.id && <AddDetails adId={currentAdId} />}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    
    <button className="btn btn-secondary mt-4" onClick={() => setShowReport(!showReport)}>Reporte</button>
    {showReport && (
      <div className="mt-4">
        <h3>Reporte de Clicks</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Página</th>
              <th>Total de Clicks</th>
            </tr>
          </thead>
          <tbody>
            {clickData.map((data, index) => (
              <tr key={index}>
                <td>{data.page_name}</td>
                <td>{data.click_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
            };
export default CreateAd;