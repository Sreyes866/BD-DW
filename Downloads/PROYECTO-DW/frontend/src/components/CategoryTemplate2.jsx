import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import videoFile from './tecnologia1.mp4';  
import bgImage from './Tecnologia1.jpg';  


const CategoryTemplate2 = () => {
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

  let filteredArticles = articles;

  if (category) {
    const categoryId = categories.find(cat => cat.name === category)?.id;
    filteredArticles = filteredArticles.filter(article => article.category_id === categoryId);
  }

  if (subCategory && subCategory !== 'all') {
    const subcategoryId = subcategories.find(sub => sub.name === subCategory)?.id;
    filteredArticles = filteredArticles.filter(article => article.sub_category_id === subcategoryId);
  }

  return (
    <div style={{ 
      textAlign: 'center',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
      <h2 style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }} >Artículos Más Populares</h2>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>

        <div className="carousel-inner">
          {filteredArticles.slice(0, 10).map((article, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <Link to={`/article/${article.id}`}>
                <h3>{article.title}</h3>
              </Link>
              <p>Autor: {article.author_id}</p>
              <p>Categoría: {categories.find(cat => cat.id === article.category_id)?.name}</p>
              <p>Subcategoría: {subcategories.find(sub => sub.id === article.sub_category_id)?.name}</p>
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
      
      <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
      <h2>Datos Innovadores de la Tecnología</h2>
        <p>
          1. Computación cuántica: Se están desarrollando computadoras cuánticas que tienen el potencial de resolver problemas complejos mucho más rápido que las computadoras tradicionales. Esto podría revolucionar la criptografía, la simulación de materiales y la inteligencia artificial.
        </p>
        <p>
          2. Inteligencia Artificial (IA) en atención médica: La IA se está utilizando para mejorar el diagnóstico y el tratamiento médico. Los algoritmos de IA pueden analizar grandes conjuntos de datos de pacientes y ayudar a los médicos a tomar decisiones más precisas.
        </p>
        <p>
          3. Vehículos autónomos: La tecnología de vehículos autónomos está avanzando rápidamente. Empresas como Tesla, Waymo y Uber están desarrollando vehículos que pueden conducir de forma autónoma. Esto podría cambiar la forma en que nos desplazamos y reducir los accidentes de tráfico.
        </p>
        <p>
          Estos son solo algunos ejemplos de cómo la tecnología está evolucionando y transformando diversos campos en la actualidad.
        </p>
      </div>
  
      {/* Video de Tecnología */}
      <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <video width="640" height="360" controls>
          <source src={videoFile} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
  
};

export default CategoryTemplate2;





