import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageFeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState(
    JSON.parse(localStorage.getItem('featuredArticles')) || []
  );

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost/Articles.php');
      const approvedArticles = response.data.filter(article => article.approval_status === 'Approved');
      setArticles(approvedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleArticleSelect = (articleId) => {
    let updatedFeatured = [];
    if (featuredArticles.includes(articleId)) {
      updatedFeatured = featuredArticles.filter(id => id !== articleId);
    } else if (featuredArticles.length < 4) {
      updatedFeatured = [...featuredArticles, articleId];
    } else {
      alert('Solo puedes seleccionar hasta 4 artículos destacados.');
      return;
    }
    setFeaturedArticles(updatedFeatured);
    localStorage.setItem('featuredArticles', JSON.stringify(updatedFeatured));
  };

  return (
    <div className="manage-featured-articles">
      <h2>Administrar Artículos Destacados</h2>
      <div className="articles-list">
        {articles.map(article => (
          <div key={article.id} className="article-item">
            <span>{article.title}</span>
            <button 
              onClick={() => handleArticleSelect(article.id)}
              className={featuredArticles.includes(article.id) ? 'selected' : ''}
            >
              {featuredArticles.includes(article.id) ? 'Deseleccionar' : 'Seleccionar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFeaturedArticles;

