import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Template1 from './Template1';  

const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost/Articles.php')
      .then(response => setArticles(response.data))
      .catch(error => console.error('Error fetching articles:', error));

    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  };

  const handleDelete = (id) => {
    console.log("handleDelete called", id);
    axios.post('http://localhost/deleteArticle.php', { id: id })
      .then(response => {
        fetchData();  
      })
      .catch(error => console.error('Error deleting article:', error));
};

const handleEdit = (article) => {
  setEditingArticle(article);
};

const handleSave = () => {
  axios.post('http://localhost/updateArticle.php', editingArticle)
    .then(response => {
      setEditingArticle(null);
      fetchData();
    })
    .catch(error => console.error('Error updating article:', error));
};

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setEditingArticle({ ...editingArticle, [name]: value });
};

if (!articles.length) return <div>Loading...</div>;

return (
  <div className="container">
    {articles.map((article, index) => (
      <div key={index} style={{border: '1px solid #ccc', margin: '20px', padding: '15px'}}>
        {editingArticle && editingArticle.id === article.id ? (
          <>
            <Template1 
              article={editingArticle} 
              isEditing={true} 
              handleChange={handleInputChange} 
              categories={categories} 
              subcategories={subcategories} 
            />
            <button onClick={handleSave}>Guardar</button>
          </>
        ) : (
          <>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <div>
              Categoría: {categories.find(cat => cat.id === article.category_id)?.name || 'No especificada'}
            </div>
            <div>
              Subcategoría: {subcategories.find(sub => sub.id === article.sub_category_id)?.name || 'No especificada'}
            </div>
            <button onClick={() => handleDelete(article.id)}>Eliminar</button>
            <button onClick={() => handleEdit(article)}>Editar</button>
          </>
        )}
      </div>
    ))}
  </div>
);
};

export default ListArticles;





