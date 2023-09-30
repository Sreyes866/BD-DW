import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    // Reemplaza estas URLs con las URLs de tus APIs para obtener las categorías y subcategorías
    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  const createPage = () => {
    // Aquí puedes hacer una solicitud POST para crear una nueva página usando las categorías y subcategorías seleccionadas
    axios.post('http://localhost/create_pages.php', {
      category: selectedCategory,
      subCategory: selectedSubcategory
    })
    .then(response => {
      console.log('Page created:', response.data);
    })
    .catch(error => {
      console.log('Error creating page:', error);
    });
  };

  return (
    <div>
      <h1>Create a New Page</h1>
      <div>
        <label>Select Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">--Select Category--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Subcategory:</label>
        <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
          <option value="">--Select Subcategory--</option>
          {subcategories.filter(sub => sub.category_id === selectedCategory).map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={createPage}>Create Page</button>
    </div>
  );
};

export default CreatePage;
