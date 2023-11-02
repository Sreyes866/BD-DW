import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PremiumCategoriesManager = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get('http://localhost/Categories.php')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const togglePremiumStatus = (categoryId) => {
    axios({
        method: 'post',
        url: 'http://localhost/UpdateCategoryPremiumStatus.php',
        data: `id=${categoryId}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => {
        console.log(response.data);  
        fetchCategories();
    })
    .catch(error => {
        console.error('Error updating category premium status:', error);
    });
};

  

  return (
    <div>
      <h2>Administrar Categorías Premium</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} (Es premium: {Number(category.is_premium) ? 'Sí' : 'No'})

            <button onClick={() => togglePremiumStatus(category.id)}>
            {Number(category.is_premium) === 1 ? 'Quitar premium' : 'Hacer premium'}

            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumCategoriesManager;

