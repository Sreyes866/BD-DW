import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import techBackground from './Tecnologia.jpg';  
import scienceBackground from './ciencia.jpg';  
import tecnologiaVideo from './tecnologia.mp4';
// import cienciaVideo from './ciencia.mp4';
import image1 from './image1.jpg';
import image2 from './image2.jpg';


const categoryBackgrounds = {
  'Tecnologia': techBackground,
  'Ciencia': scienceBackground,
};

const categoryVideos = {
  'Tecnologia': tecnologiaVideo, 
  //'Ciencia': 'ciencia.mp4',
  // añade más categorías y sus respectivos videos aquí
};

const categoryDescriptions = {
  'Tecnologia': 'Esta categoría se dedica a explorar las últimas tendencias, innovaciones y avances en el campo de la tecnología. Desde inteligencia artificial hasta computación en la nube, pasando por desarrollo de software y ciberseguridad, aquí encontrarás artículos detallados que te mantendrán al día en este mundo en constante evolución.',
  'Ciencia': 'Explora el mundo de la ciencia a través de nuestros artículos.',
  // añade más categorías y sus respectivas descripciones aquí
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
    width: '100%'  // Cambiado a 100% para llenar todo el ancho
  };

  const carouselContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  };

  const carouselStyle = {
    maxWidth: '80%',  // Puedes ajustar esto según tus necesidades
  };

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  };
  
  const itemStyle = {
    flex: '0 0 calc(33.333% - 10px)', // Asume que el espacio entre los elementos es de 10px
    marginBottom: '20px'
  };

  const titleStyle = {
    textAlign: 'center', // Centra el texto
    marginBottom: '20px' 
  };

  const videoStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'  // Puedes ajustar esto según tus necesidades
  };

  const carouselImageStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',  // Asegura que la imagen no exceda el ancho del contenedor
  };

  const containerWithBackgroundStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
  };
  
  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
     <div style={containerWithBackgroundStyle}></div> 
      <div style={textStyle}>
      <h2 style={titleStyle}>Descripcion de la categoria</h2>
      <p>{categoryDescriptions[category]}</p>
        <h2 style={titleStyle}>Los 10 Artículos Más Recientes</h2>
        
        <div style={listStyle}>
          {filteredArticles.map((article, index) => (  
            <div style={itemStyle} key={index}>
              <Link to={`/article/${article.id}`}>
                <h3>{article.title}</h3>
              </Link>
              <p>Autor: {article.author_id}</p>
            </div>
          ))}
        </div>
        <div style={flexContainerStyle}></div>
        <div>
        <h3 style={titleStyle}>{category}</h3>
        <video style={videoStyle} controls>
        <source src={categoryVideos[category]} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      </div>
    </div>
    
    <div style={carouselContainerStyle}>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={carouselStyle}>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={image1} alt="Descripción de la primera imagen" style={carouselImageStyle} />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={image2} alt="Descripción de la segunda imagen" style={carouselImageStyle} />
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






