import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Template1 from './Template1';  
import Template2 from './Template2';
import Template3 from './Template3';
import { useAuth } from '../context/AuthContext'; 


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
  const { userName, userRole, userId } = useAuth();
  const [publishStatus, setPublishStatus] = useState('');




  useEffect(() => {
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

  useEffect(() => {
    console.log(`Current user role: ${userRole}, User ID: ${userId}`);
    if (userRole === 'author' && userId) {
      axios.get(`http://localhost/AssignedCategories.php?author_id=${userId}`)
        .then(response => {
          console.log('Assigned categories to author:', response.data);
          const categoriesData = response.data.categories; // Aquí accedes al array dentro del objeto
          if (Array.isArray(categoriesData)) {
            setCategories(categoriesData);
          } else {
            console.log('Expected an array for categories, but got:', categoriesData);
          }
        })
        .catch(error => {
          console.error('Error fetching assigned categories:', error);
        });
    } else {
      // Fetch all categories if the user is not an author
      axios.get('http://localhost/Categories.php')
        .then(response => {
          if (Array.isArray(response.data)) {
            setCategories(response.data);
          } else {
            console.error('Expected an array for categories, but got:', response.data);
          }
        })
        .catch(error => console.error('Error fetching all categories:', error));
    }}, [userId, userRole]);
  
  


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


  const handlePublishStatus = (status) => {  
    setPublishStatus(status);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('author_id', userName);
    formData.append('category_id', article.category_id);
    formData.append('sub_category_id', article.sub_category_id);
    formData.append('content', article.content);
    formData.append('content1', article.content1);
    formData.append('content2', article.content2);
    formData.append('content3', article.content3);
    formData.append('image', article.image);  
    formData.append('template_type', article.templateType);
    formData.append('publish_status', publishStatus);
    
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
          <label htmlFor="content">Contenido de Inicio</label>
          <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-control" rows="5"></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="category_id">Categoría</label>
            <select id="category_id" name="category_id" value={article.category_id} onChange={handleChange} className="form-control">
              <option value="" disabled>Seleccione una categoría</option>
              {categories.map((category, index) => (
                // Asegúrate de que el valor de 'category.id' sea el esperado y coincida con el valor que usa la subcategoría para filtrar.
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

        <div className="form-group">  
          <label htmlFor="publishStatus">Estado de Publicación</label>
          <select id="publishStatus" name="publishStatus" value={publishStatus} onChange={(e) => setPublishStatus(e.target.value)} className="form-control">
            <option value="" disabled>Seleccione el estado</option>
            <option value="Published">Publicar</option>
            <option value="Draft">Borrador</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear</button>
      </form>

      {articleCreated && (
      <div>
        <div className="alert alert-success">
          Artículo creado con éxito.
        </div>
        <div className="alert alert-info">
          ¿Quieres publicar este artículo ahora?
          <button onClick={() => handlePublishStatus('Published')}>Publicar</button>
          <button onClick={() => handlePublishStatus('Draft')}>Guardar como borrador</button>
        </div>
      </div>
    )}
  </div>
);
};

export default CreateArticle;
