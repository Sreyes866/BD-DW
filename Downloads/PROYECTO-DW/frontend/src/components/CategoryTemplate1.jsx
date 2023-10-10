import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import techBackground from './Tecnologia.jpg';  
import scienceBackground from './ciencia.jpg';  
import image1 from './image1.jpg';
import image2 from './image2.jpg';


const categoryBackgrounds = {
  'Tecnologia': techBackground,
  'Ciencia': scienceBackground,
};

const CategoryTemplate1 = () => {
  const { category, subCategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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

  
  const backgroundImage = categoryBackgrounds[category];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    position: 'relative',
  };

  
  let filteredArticles = articles;
  if (category) {
    const categoryId = categories.find(cat => cat.name === category)?.id;
    filteredArticles = filteredArticles.filter(article => article.category_id === categoryId);
  }
  if (subCategory && subCategory !== 'all') {
    const subcategoryId = subcategories.find(sub => sub.name === subCategory)?.id;
    filteredArticles = filteredArticles.filter(article => article.sub_category_id === subcategoryId);
  }


  const textStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    width: '60%'
  };

  const carouselStyle = {
    position: 'sticky',
    top: 0,  
    height: '100vh',
    overflowY: 'auto',
    width: '35%'
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        <h2>Artículos Más Recientes</h2>
        <ul>
          {filteredArticles.map((article, index) => (  
            <li key={index}>
              <Link to={`/article/${article.id}`}>
                <h3>{article.title}</h3>
              </Link>
              <p>Autor: {article.author_id}</p>
              <p>Categoría: {categories.find(cat => cat.id === article.category_id)?.name}</p>
              <p>Subcategoría: {subcategories.find(sub => sub.id === article.sub_category_id)?.name}</p>
              <p>{article.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={carouselStyle}>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
                <img src={image1} alt="Descripción de la primera imagen" />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
                <img src={image2} alt="Descripción de la segunda imagen" />
            </div>

            {/* Agregar más imágenes aquí */}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplate1;






