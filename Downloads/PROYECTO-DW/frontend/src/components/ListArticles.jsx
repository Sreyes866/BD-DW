import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Template1 from './Template1';

const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const fetchData = (category = '', subcategory = '') => {
    let url = 'http://localhost/Articles.php';
    const params = [];
    if (category) params.push(`category_id=${category}`);
    if (subcategory) params.push(`sub_category_id=${subcategory}`);
    if (params.length) url += '?' + params.join('&');
    axios.get(url)
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching articles:', error));
  };

  useEffect(() => {
    fetchData();
    // Suponemos que tienes funciones similares para obtener categorías y subcategorías.
    // Si no es así, puedes adaptar este código según tus necesidades.
    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  const applyFilter = () => {
    let filteredArticles = articles;
    
    if (selectedCategory) {
      filteredArticles = filteredArticles.filter(article => article.category_id === selectedCategory);
    }
  
    if (selectedSubcategory) {
      filteredArticles = filteredArticles.filter(article => article.sub_category_id === selectedSubcategory);
    }
  
    setArticles(filteredArticles);
  };

  return (
    <div className="container">
      <div>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>

        <button onClick={applyFilter}>Apply Filter</button>
      </div>

      {articles.map((article, index) => (
        <Template1 
          key={index} 
          article={article}
          categories={categories}
          subcategories={subcategories}
        />
      ))}
    </div>
  );
};

export default ListArticles;







