import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost/GetAllAds.php');
      setAds(response.data.filter(ad => ad.page_name === 'contact'));
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleAdClick = async (adId, link_url, event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName: 'contact' });
      window.open(link_url, '_blank');
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    emailjs.sendForm('service_db-dw', 'template_0idkwyf', form, 'BLyjSRydByFGcVhN6')
      .then((result) => {
          console.log(result.text);
          alert("Mensaje enviado!");
      }, (error) => {
          console.log(error.text);
          alert("Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.");
      });
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="container text-center">
      <h1>Contacto</h1>
      <div className="row my-5">
        <div className="col-md-4">
          <h3>Dirección</h3>
          <p>1234 Calle Principal, Ciudad, País</p>
        </div>
        <div className="col-md-4">
          <h3>Teléfonos</h3>
          <p>+1 (123) 456-7890</p>
        </div>
        <div className="col-md-4">
          <h3>Correo Electrónico</h3>
          <p>info@empresa.com</p>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-6">
          <h3>Envíanos un mensaje!</h3>
          <p>Si desea ser considerado para un empleo, por favor envíe su currículo a la dirección de correo proporcionada. Estamos constantemente buscando talento para unirse a nuestro equipo.</p>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" name="user_name" placeholder="Nombres" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" name="user_surname" placeholder="Apellidos" required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" name="user_email" placeholder="Correo electrónico" required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" name="message" rows="4" placeholder="Comentarios" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
      <h2>Anuncios</h2>
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

export default Contact;