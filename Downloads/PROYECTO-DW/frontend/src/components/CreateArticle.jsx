import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Template1 from './Template1';  
import Template2 from './Template2';
import Template3 from './Template3';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category_id: '',
    sub_category_id: '',
    author_id: '',
    templateType: 'Template2',  
    image: null
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [articleCreated, setArticleCreated] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  useEffect(() => {
    setFilteredSubcategories(subcategories.filter(sub => sub.category_id === article.category_id));
  }, [article.category_id, subcategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    setArticle({ ...article, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('author_id', article.author_id);
    formData.append('category_id', article.category_id);
    formData.append('sub_category_id', article.sub_category_id);
    formData.append('content', article.content);
    formData.append('image', article.image);  
    
    fetch('http://localhost/addarticule.php', {
      method: 'POST',
      body: formData  
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Artículo añadido') {
        setArticleCreated(true);
      } else {
        console.error('Error al crear el artículo:', data.message);
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
            {filteredSubcategories.map((subcategory, index) => (
              <option key={index} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="templateType">Tipo de Plantilla</label>
          <select id="templateType" name="templateType" value={article.templateType} onChange={handleChange} className="form-control">
            <option value="Template1">Plantilla 1</option>
            <option value="Template2">Plantilla 2</option>
            <option value="Template3">Plantilla 3</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input type="file" id="image" onChange={(e) => setArticle({ ...article, image: e.target.files[0] })} className="form-control-file" />
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input type="file" id="image" onChange={handleImageChange} className="form-control-file" />
        </div>

        {article.templateType === 'Template1' && <Template1 article={article} categories={categories} subcategories={subcategories} />}
        {article.templateType === 'Template2' && <Template2 article={article} categories={categories} subcategories={subcategories} />}
        {article.templateType === 'Template3' && <Template3 article={article} categories={categories} subcategories={subcategories} />}


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