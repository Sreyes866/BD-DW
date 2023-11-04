import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [mostVisitedAuthors, setMostVisitedAuthors] = useState([]);


  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost/Articles.php');
      const approvedArticles = response.data.filter(article => article.approval_status === 'Approved');
      const updatedArticles = approvedArticles.map(article => {
        if (article.image) {
          const blob = new Blob([article.image], { type: 'image/jpeg' });
          article.imageURL = URL.createObjectURL(blob);
        }
        return article;
      });
      
      setArticles(updatedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  

  const handleAdClick = async (adId, link_url, event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost/TrackClick.php', { adId, pageName: 'home' });
      window.open(link_url, '_blank');
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const fetchMostVisitedAuthors = async () => {
    try {
      const response = await axios.get('http://localhost/MostVisitedAuthors.php');
      setMostVisitedAuthors(response.data);
    } catch (error) {
      console.error('Error fetching most visited authors:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchMostVisitedAuthors();


    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
    
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost/GetAllAds.php');
        setAds(response.data.filter(ad => ad.page_name === 'home'));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
  
    fetchAds();
  }, []);

  

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">Artículos Recientes</h2>
          <div className="article-grid">
            {articles.map((article, index) => {
              const categoryName = categories.find(cat => cat.id === article.category_id)?.name || 'Desconocido';
              const subcategoryName = subcategories.find(sub => sub.id === article.sub_category_id)?.name || 'Desconocido';
              return (
                <Link to={`/article/${article.id}`} key={index} className="article-card">
                  <div className="article-image-container">
                    {article.image && (
                      <img 
                        className="article-image"
                        src={`data:image/jpeg;base64,${article.image}`} 
                        alt={article.title}
                      />
                    )}
                  </div>
                  <div className="article-content">
                    <h5 className="article-title">{article.title}</h5>
                    <div className="article-metadata">
                      <small>Categoría: {categoryName}</small>
                      <small>Subcategoría: {subcategoryName}</small>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

                    {/* Sección de Autores Más Visitados */}
                    <h2 className="text-center mt-4">Autores Más Visitados</h2>
          <div className="list-group">
            {mostVisitedAuthors.map((author, index) => (
              <div key={index} className="list-group-item">
                <span>Autor: {author.author}</span>
                <span> - Visitas Totales: {author.total_visits}</span>
              </div>
            ))}
          </div>

          <h2 className="text-center mt-4">Anuncios</h2>
          <div className="ads-grid">
            {ads.map((ad, index) => (
              <div key={index} className="ad-card">
                <div className="card">
                  <a 
                    href={ad.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(event) => handleAdClick(ad.id, ad.link_url, event)}
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
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 rounded bg-light border">
        <div className="text-center d-flex justify-content-center">
          <Link to="/subscribe" className="btn btn-outline-dark mb-3 me-2">Suscríbase</Link>
          <Link to="/contact" className="btn btn-outline-dark mb-3 me-2">Contáctanos</Link>
          <Link to="/faq" className="btn btn-outline-dark mb-3 me-2">Preguntas Frecuentes</Link>
          <Link to="/terms" className="btn btn-outline-dark mb-3">Términos y Condiciones</Link>
        </div>
        
        <div className="d-flex justify-content-between">
          <div>
            © 2022-2023 ThinkSphere. Todos los derechos reservados DB-DW S.A.
          </div>
          <div className="text-end">
            <i className="fab fa-facebook-f me-2"></i>
            <i className="fab fa-twitter me-2"></i>
            <i className="fab fa-instagram me-2"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>

        <div className="text-center mt-2" style={{fontSize: '0.8rem'}}>
          El uso de ésta página está sujeta a nuestros Términos y Condiciones y Políticas de Privacidad
        </div>
      </div>
    </div>
  );
};

export default Home;
