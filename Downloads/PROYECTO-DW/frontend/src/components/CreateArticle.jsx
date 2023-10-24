import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Template1 from './Template1';  
import Template2 from './Template2';
import Template3 from './Template3';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    content1: '',
    content2: '',
    content3: '',
    category_id: '',
    sub_category_id: '',
    author_id: '',
    templateType: '',
    image: null
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [articleCreated, setArticleCreated] = useState(false);
  const [authors, setAuthors] = useState([]);


  useEffect(() => {
    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));

    axios.get('http://localhost/Users.php')
      .then(response => setAuthors(response.data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  useEffect(() => {
    setFilteredSubcategories(subcategories.filter(sub => sub.category_id === article.category_id));
  }, [article.category_id, subcategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevArticle => ({
      ...prevArticle,
      [name]: value
    }));
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
    formData.append('content1', article.content1);
    formData.append('content2', article.content2);
    formData.append('content3', article.content3);
    formData.append('image', article.image);  
    formData.append('template_type', article.templateType);
    
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

  const AdditionalFields = () => {
    if (article.templateType === 'Template1' || article.templateType === 'Template2') {
      return (
        <>
          
          <div className="form-group">
            <label htmlFor="content1">Contenido Adicional 1</label>
            <textarea id="content1" name="content1" value={article.content1} onChange={handleChange} className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="content2">Contenido Adicional 2</label>
            <textarea id="content2" name="content2" value={article.content2} onChange={handleChange} className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="content3">Contenido Final</label>
            <textarea id="content3" name="content3" value={article.content3} onChange={handleChange} className="form-control" rows="5"></textarea>
          </div>
        </>
      );
    } else if (article.templateType === 'Template3') {
      return (
        <>
          <div className="form-group">
            <label htmlFor="content1">Contenido Adicional 1</label>
            <textarea id="content1" name="content1" value={article.content1} onChange={handleChange} className="form-control" rows="5"></textarea>
          </div>
        </>
      );
    }
    return null;
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
          <select id="author_id" name="author_id" value={article.author_id} onChange={handleChange} className="form-control">
            <option value="" disabled>Seleccione un autor</option>
            {authors.map((author, index) => (
              <option key={index} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>

        
        <div className="form-group">
          <label htmlFor="content">Contenido de Inicio</label>
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
            <option value="" disabled>Seleccione una plantilla</option>
            <option value="Template1">Plantilla 1</option>
            <option value="Template2">Plantilla 2</option>
            <option value="Template3">Plantilla 3</option>
          </select>
        </div>
        {article.templateType === 'Template1' && <Template1 article={article} categories={categories} subcategories={subcategories} />}
        {article.templateType === 'Template2' && <Template2 article={article} categories={categories} subcategories={subcategories} />}
        {article.templateType === 'Template3' && <Template3 article={article} categories={categories} subcategories={subcategories} />}
        <AdditionalFields />
        
        
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
