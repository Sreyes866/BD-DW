import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignCategoriesToAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost/Users.php')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
      });

    
    axios.get('http://localhost/Categories.php')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAuthor) {
      alert('Por favor, selecciona un autor.');
      return;
    }
    axios.post('http://localhost/assign_categories_to_author.php', {
      author_id: selectedAuthor,
      categories: selectedCategories
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      console.error('Error assigning categories:', error);
    });
  };

  const handleAuthorChange = (authorId) => {
    setSelectedAuthor(authorId);
    
    setSelectedCategories([]);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prevSelected => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter(id => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  return (
    <div>
      <h2>Asignar Categorías a Autor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Selecciona un autor:</label>
          <select value={selectedAuthor} onChange={(e) => handleAuthorChange(e.target.value)}>
            <option value="">--Seleccionar--</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        {categories.map(category => (
          <div key={category.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.name}
            </label>
          </div>
        ))}
        <button type="submit">Asignar Categorías</button>
      </form>
    </div>
  );
};

export default AssignCategoriesToAuthor;

