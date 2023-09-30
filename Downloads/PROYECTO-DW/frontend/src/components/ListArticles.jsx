import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/Articles.php')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching articles:', error));

    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  if (!articles.length) return <div>Loading...</div>;

  return (
    <div className="container">
      {articles.map((article, index) => (
        <div key={index} style={{border: '1px solid #ccc', margin: '20px', padding: '15px'}}>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          
          <div>
            Categoría: {categories.find(cat => cat.id === article.category_id)?.name || 'No especificada'}
          </div>
          <div>
            Subcategoría: {subcategories.find(sub => sub.id === article.sub_category_id)?.name || 'No especificada'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListArticles;


