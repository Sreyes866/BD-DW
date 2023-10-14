import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [ads, setAds] = useState([]);
  const [mostVisitedAuthors, setMostVisitedAuthors] = useState([]);  // NUEVO

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost/Articles.php');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
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

  // NUEVO
  const fetchMostVisitedAuthors = async () => {
    try {
      const response = await axios.get('http://localhost/MostVisitedAuthors.php');
      setMostVisitedAuthors(response.data);
    } catch (error) {
      console.error('Error fetching most visited authors:', error);
    }
  };

  const handleAdClick = async (adId) => {
    try {
      await axios.post('http://localhost/TrackClick.php', { adId });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchAds();
    fetchMostVisitedAuthors();  // NUEVO
  }, []);

  const sortedArticles = [...articles].sort((a, b) => b.id - a.id);
  const recentArticles = sortedArticles.slice(0, 10);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h2 className="text-center mb-4">Artículos Recientes</h2>
          <div className="list-group">
            {recentArticles.map((article, index) => (
              <Link to={`/article/${article.id}`} key={index} className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{article.title}</h5>
                  <small>Categoría: {article.category}</small>
                </div>
              </Link>
            ))}
          </div>
  
          {/* Sección de anuncios */}
          <h2 className="text-center mt-4">Anuncios</h2>
          {ads.map((ad, index) => (
            <div key={index}>
              <a 
                href={ad.link_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => handleAdClick(ad.id)}
              >
                <img 
                  src={ad.image_url} 
                  alt="Ad" 
                  style={{ width: '150px', height: '125px', cursor: 'pointer' }} 
                />
              </a>
            </div>
          ))}
          <h2 className="text-center mt-4">Autores Más Visitados</h2>
      
      {mostVisitedAuthors.map((author, index) => (
        <li key={index}>
          {author.author_id} - {author.total_visits} visitas
        </li>
      ))}
          
           

        </div>
      </div>
    </div>
  );
};

export default Home;
