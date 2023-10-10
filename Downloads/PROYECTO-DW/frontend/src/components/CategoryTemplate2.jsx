import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryTemplate2 = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const centeredContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const justifiedText = {
    textAlign: 'justify'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get('http://localhost/Articles.php'),
          axios.get('http://localhost/Categories.php'),
          axios.get('http://localhost/Subcategories.php')
        ]);

        setArticles(articlesRes.data);
        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Artículos Más Recientes (Carrusel)</h2>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {articles.slice(0, 10).map((article, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div style={centeredContent}>
                <Link to={`/article/${article.id}`}>
                  <h3>{article.title}</h3>
                </Link>
                <p>Autor: {article.author_id}</p>
                <p>Categoría: {categories.find(cat => cat.id === article.category_id)?.name}</p>
                <p>Subcategoría: {subcategories.find(sub => sub.id === article.sub_category_id)?.name}</p>
                <p style={justifiedText}>{article.content}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
};

export default CategoryTemplate2;



