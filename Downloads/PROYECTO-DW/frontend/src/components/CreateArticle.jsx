import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category_id: '',
    sub_category_id: '',
    author_id: '',
    templateType: 'Template1',
    image: null
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [articleCreated, setArticleCreated] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/Categories.php')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    setArticle({ ...article, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost/addarticule.php', article)
      .then(response => {
        if (response.data.message === 'Artículo añadido') {
          setArticleCreated(true);
        }
      })
      .catch(error => console.error('Fetch Error:', error));
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-control" />
        </div>
        
        <div className="form-group">
          <label htmlFor="author_id">Autor</label>
          <input type="text" id="author_id" name="author_id" value={article.author_id} onChange={handleChange} className="form-control" />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-control" rows="5"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Categoría</label>
          <select id="category_id" name="category_id" value={article.category_id} onChange={handleChange} className="form-control">
            <option value="" disabled>Seleccione una categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sub_category_id">Subcategoría</label>
          <select id="sub_category_id" name="sub_category_id" value={article.sub_category_id} onChange={handleChange} className="form-control">
            <option value="" disabled>Seleccione una subcategoría</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input type="file" id="image" onChange={handleImageChange} className="form-control-file" />
        </div>

        <button type="submit" className="btn btn-primary">Crear</button>
      </form>

      {articleCreated && (
        <div className="alert alert-success">
          Artículo creado con éxito.
        </div>
      )}
    </div>
  );
};

export default CreateArticle;







