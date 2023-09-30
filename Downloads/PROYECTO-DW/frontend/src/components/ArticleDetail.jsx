import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Cargar categorías y subcategorías
    axios.get('http://localhost/getCategories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/getSubcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));

  }, [id]);

  const handleDelete = () => {
    axios.post('http://localhost/deleteArticle.php', { id })
      .then(response => {
        history.push('/articles'); // Redirigir al usuario a la lista de artículos
      })
      .catch(error => console.error('Error deleting article:', error));
  };

  const handleSave = () => {
    axios.post('http://localhost/updateArticle.php', article)
      .then(response => {
        console.log('Artículo actualizado');
      })
      .catch(error => console.error('Error updating article:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value
    });
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      
      <select name="category_id" value={article.category_id} onChange={handleChange}>
        {categories.map((category, index) => (
          <option key={index} value={category.id}>{category.name}</option>
        ))}
      </select>

      <select name="sub_category_id" value={article.sub_category_id} onChange={handleChange}>
        {subcategories.map((subcategory, index) => (
          <option key={index} value={subcategory.id}>{subcategory.name}</option>
        ))}
      </select>

      <button onClick={handleSave}>Guardar cambios</button>
      <button onClick={handleDelete}>Eliminar artículo</button>
    </div>
  );
};

export default ArticleDetail;

