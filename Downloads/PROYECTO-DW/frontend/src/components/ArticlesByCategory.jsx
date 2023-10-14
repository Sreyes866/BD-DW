import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import CategoryTemplate1 from './CategoryTemplate1';
import CategoryTemplate2 from './CategoryTemplate2';

const ArticlesByCategory = () => {
  const { category, subCategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('Template1');

  // Función que se llama cuando un artículo es visitado
  const onArticleVisited = async (articleId) => {
    const url = `http://localhost/AutoresVisitados.php?id=${articleId}`;
    console.log(`URL: ${url}`);  // Añade esta línea aquí
    try {
      const response = await axios.get(url);
      if (response.data.includes('Contador de visitas incrementado')) {
        console.log(`El contador de visitas para el artículo ID: ${articleId} se incrementó exitosamente`);
      } else {
        console.log('No se pudo incrementar el contador de visitas:', response.data);
      }
    } catch (error) {
      console.error('Hubo un error al incrementar el contador de visitas:', error);
    }
    
  };
  

  useEffect(() => {
    const fetchAllData = async () => {
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

    fetchAllData();
  }, []);

  useEffect(() => {
    // Incrementa el contador de visitas para cada artículo visitado
    articles.forEach(article => {
      onArticleVisited(article.id);
    });
  }, [articles]);

  const handleChangeTemplate = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const categoryId = categories.find(cat => cat.name === category)?.id;

  let filteredArticles = [];

  if (subCategory === 'all') {
    filteredArticles = articles.filter(article => article.category_id === categoryId);
  } else {
    const subcategoryId = subcategories.find(sub => sub.name === subCategory)?.id;
    filteredArticles = articles.filter(
      article => article.category_id === categoryId && article.sub_category_id === subcategoryId
    );
  }

  return (
    <div style={{ backgroundColor: 'lightblue' }}>  
      <h1>Artículos en {category} - {subCategory}</h1>
  
      <label htmlFor="templateSelector">Elegir plantilla: </label>
      <select id="templateSelector" onChange={handleChangeTemplate}>
        <option value="Template1">Plantilla 1</option>
        <option value="Template2">Plantilla 2</option>
      </select>
  
      {selectedTemplate === 'Template1' ? (
        <CategoryTemplate1 articles={filteredArticles} />
      ) : (
        <CategoryTemplate2 articles={filteredArticles} />
      )}
    </div>
  );
};

export default ArticlesByCategory;







