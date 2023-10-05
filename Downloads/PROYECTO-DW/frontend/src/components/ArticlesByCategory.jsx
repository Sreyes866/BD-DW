import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Template2 from './Template2';
import { Link } from 'react-router-dom';


const ArticlesByCategory = () => {
  const { category, subCategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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

  const categoryId = categories.find(cat => cat.name === category)?.id;
  const subcategoryId = subcategories.find(sub => sub.name === subCategory)?.id;

  const filteredArticles = articles.filter(
    article => article.category_id === categoryId && article.sub_category_id === subcategoryId
  );

  return (
    <div>
      <h1>Artículos en {category} - {subCategory}</h1>
      <ul>
        {filteredArticles.map((article, index) => (
          
          <li key={index}>
            {/* Envuelve cada artículo en un enlace que redireccione al detalle del artículo */}
            <Link to={`/article/${article.id}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesByCategory;





