import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RandomAd from './RandomAd';



const FAQ = () => {
  const [ads, setAds] = useState([]);

  const handleAdClick = async (adId, link_url, event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName: 'faq' });
      window.open(link_url, '_blank');
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost/GetAllAds.php');
        setAds(response.data.filter(ad => ad.page_name === 'faq'));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="container text-center">
      <h1 className="my-4">Preguntas Frecuentes</h1>
      <div className="accordion" id="faqAccordion">
        {/* Aquí vienen las preguntas y respuestas */}
        {[
          { question: '¿Cómo creo un artículo?', answer: 'Dirígete a la sección "Crear Artículo" y sigue las instrucciones.' },
          { question: '¿Cómo me registro?', answer: 'Haz clic en "Iniciar" en la esquina superior derecha y completa el formulario.' },
          { question: '¿Cómo inicio sesión?', answer: 'Haz clic en "Iniciar Sesión" y proporciona tus credenciales.' },
          { question: '¿Cómo puedo convertirme en un autor?', answer: 'Después de registrarte, envía tu solicitud para ser autor desde tu perfil.' },
          { question: '¿Cómo edito un artículo?', answer: 'Ve a tu lista de artículos y selecciona "Editar" en el artículo que desees modificar.' },
          { question: '¿Cómo elimino un artículo?', answer: 'Ve a tu lista de artículos y selecciona "Eliminar" en el artículo que desees borrar.' },
          { question: '¿Cómo recupero mi contraseña?', answer: 'Haz clic en "Olvidé mi contraseña" en la página de inicio de sesión.' },
          { question: '¿Cómo cambio mi perfil?', answer: 'Accede a tu perfil y selecciona la opción "Editar Perfil".' },
          { question: '¿Dónde veo mis artículos publicados?', answer: 'Todos tus artículos publicados estarán en tu perfil bajo la sección "Mis Artículos".' },
          { question: '¿Cómo contacto con el soporte?', answer: 'Puedes contactar con el soporte a través del formulario de contacto en la página "Contacto".' },
        ].map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                {item.question}
              </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Aquí vienen los anuncios */}
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
              {/* Anuncio Aleatorio */}
      <div className="row justify-content-center">
                <RandomAd />
                <div className="row justify-content-center">
  <RandomAd onAdClick={handleAdClick} />
</div>
      </div>
      </div>
    </div>
  );
};

export default FAQ;