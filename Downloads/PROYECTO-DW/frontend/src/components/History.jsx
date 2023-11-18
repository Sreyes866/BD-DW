import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RandomAd from './RandomAd';
const History = () => {
  const [ads, setAds] = useState([]);

  const handleAdClick = async (adId, link_url, event) => {
    event.preventDefault(); // Evita la recarga de la página
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName: 'history' });
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
        setAds(response.data.filter(ad => ad.page_name === 'history'));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="container text-center">
      <h1 className="my-4">Historia de ThinkSphere</h1>
      <div className="accordion" id="historyAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingHistory">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHistory" aria-expanded="true" aria-controls="collapseHistory">
              Historia
            </button>
          </h2>
          <div id="collapseHistory" className="accordion-collapse collapse show" aria-labelledby="headingHistory" data-bs-parent="#historyAccordion">
            <div className="accordion-body">
            "Desde su inicio en 2023, nuestra revista en línea se ha destacado por su diversidad y amplitud de contenido. Inicialmente concebida como un proyecto que abarcaba múltiples áreas de interés, hemos crecido constantemente para convertirnos en una plataforma integral que atiende las necesidades informativas de una audiencia global diversa. Nuestra historia es la de la adaptación continua y el compromiso de ofrecer una amplia variedad de artículos de alta calidad."            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingMission">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMission" aria-expanded="false" aria-controls="collapseMission">
              Misión
            </button>
          </h2>
          <div id="collapseMission" className="accordion-collapse collapse" aria-labelledby="headingMission" data-bs-parent="#historyAccordion">
            <div className="accordion-body">
            "Nuestra misión es proporcionar a nuestros lectores una experiencia enriquecedora a través de una amplia gama de artículos que abordan diversas categorías y subcategorías. Nos esforzamos por ser un recurso confiable para aquellos que buscan información, entretenimiento e inspiración en áreas que van desde la tecnología hasta el arte, la ciencia y la cultura. Nuestro objetivo es ser una fuente de conocimiento versátil que enriquece la vida de nuestros lectores."            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingVision">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVision" aria-expanded="false" aria-controls="collapseVision">
              Visión
            </button>
          </h2>
          <div id="collapseVision" className="accordion-collapse collapse" aria-labelledby="headingVision" data-bs-parent="#historyAccordion">
            <div className="accordion-body">
            "Nuestra visión es convertirnos en un destino en línea de primera elección para aquellos que buscan explorar un mundo diverso de conocimiento y entretenimiento. Aspiramos a ser una plataforma global que inspire, eduque y entretenga a nuestra audiencia a través de una amplia variedad de artículos. Buscamos ampliar continuamente nuestras categorías y subcategorías para mantenernos relevantes y emocionantes para nuestros lectores en constante evolución."            </div>
          </div>
        </div>
      </div>

      <h2 className="my-4">Anuncios</h2>
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
                {/* Anuncio Aleatorio */}
      <div className="row justify-content-center">
        <RandomAd onAdClick={handleAdClick} />
      </div>
    </div>
  );
};

export default History;