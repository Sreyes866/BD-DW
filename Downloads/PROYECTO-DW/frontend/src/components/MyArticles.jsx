import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { userName, userId, userRole } = useAuth();


  const fetchData = () => {
    axios.get('http://localhost/Articles.php')
      .then(response => {
        const myArticles = response.data.filter(article => article.author_id === userName);
        setArticles(myArticles);
      })
      .catch(error => console.error('Error fetching articles:', error));
  };
  
  useEffect(() => {
    fetchData();  
  
    
  
    
    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, [userName]);
  

  const handleDelete = (id) => {
    axios.post('http://localhost/deleteArticle.php', { id: id })
      .then(response => {
        fetchData();
      })
      .catch(error => console.error('Error deleting article:', error));
  };

  useEffect(() => {
    
    if (userRole === 'author' && userId) {
      axios.get(`http://localhost/AssignedCategories.php?author_id=${userId}`)
        .then(response => {
          console.log(response.data);
          const assignedCategoriesObject = response.data;
          if (assignedCategoriesObject.categories && Array.isArray(assignedCategoriesObject.categories)) {
            setCategories(assignedCategoriesObject.categories);
          } else {
            console.error('Expected an array for assigned categories, got:', assignedCategoriesObject);
          }
        })
        .catch(error => {
          console.error('Error fetching assigned categories:', error);
        });
    } else {
      
      axios.get('http://localhost/Categories.php')
        .then(response => setCategories(response.data))
        .catch(error => console.error('Error fetching categories:', error));
    }
  }, [userId, userRole]);
  

  const handleEdit = (article) => {
    setEditingArticle(article);
  };

  const handleSave = () => {
    
    if (editingArticle) {
      axios.post('http://localhost/updateArticle.php', editingArticle)
        .then(response => {
          setEditingArticle(null); 
          fetchData(); 
        })
        .catch(error => console.error('Error updating article:', error));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingArticle(prevArticle => ({ ...prevArticle, [name]: value })); 
  };

  const publishedArticles = articles.filter(article => article.approval_status === 'Approved');
  const draftArticles = articles.filter(article => article.publish_status === 'Draft');
  const reviewArticles = articles.filter(
    article => article.approval_status === 'Pending' && article.publish_status !== 'Draft'
  );

  const handlePublish = (article) => {
    axios.post('http://localhost/publishArticle.php', { id: article.id })
      .then(response => {
        fetchData();
      })
      .catch(error => console.error('Error publishing article:', error));
  };


  return (
    <div className="container">
      <div className="article-section">
        <h3>Artículos Publicados</h3>
        {publishedArticles.map((article, index) => (
          <ArticleRenderer key={index} article={editingArticle?.id === article.id ? editingArticle : article} categories={categories} subcategories={subcategories} isEditing={editingArticle?.id === article.id} handleChange={handleInputChange} handleEdit={handleEdit} handleSave={handleSave} handleDelete={handleDelete} handlePublish={handlePublish} />

        ))}
      </div>

      <div className="article-section">
        <h3>Artículos sin Publicar (Drafts)</h3>
        {draftArticles.map((article, index) => (
          <ArticleRenderer key={index} article={editingArticle?.id === article.id ? editingArticle : article} categories={categories} subcategories={subcategories} isEditing={editingArticle?.id === article.id} handleChange={handleInputChange} handleEdit={handleEdit} handleSave={handleSave} handleDelete={handleDelete} handlePublish={handlePublish} />

        ))}
      </div>

      <div className="article-section">
        <h3>Artículos en Revisión</h3>
        {reviewArticles.map((article, index) => (
          <ArticleRenderer key={index} article={editingArticle?.id === article.id ? editingArticle : article} categories={categories} subcategories={subcategories} isEditing={editingArticle?.id === article.id} handleChange={handleInputChange} handleEdit={handleEdit} handleSave={handleSave} handleDelete={handleDelete} handlePublish={handlePublish} />

        ))}
      </div>
    </div>
  );
};
const renderTemplate = (article, isEditing, handleChange, categories, subcategories) => {
  switch(article.template_type) {
    case 'Template1':
      return <Template1 article={article} isEditing={isEditing} handleChange={handleChange} categories={categories} subcategories={subcategories} />;
    case 'Template2':
      return <Template2 article={article} isEditing={isEditing} handleChange={handleChange} categories={categories} subcategories={subcategories} />;
    case 'Template3':
      return <Template3 article={article} isEditing={isEditing} handleChange={handleChange} categories={categories} subcategories={subcategories} />;
    default:
      return <p>Plantilla no soportada</p>;
  }
};

const ArticleRenderer = ({ article, categories, subcategories, isEditing, handleChange, handleEdit, handleSave, handleDelete, handlePublish }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '20px', padding: '15px' }}>
      {isEditing ? (
        <>
          {renderTemplate(article, isEditing, handleChange, categories, subcategories)}
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => handleEdit(null)}>Cancelar</button>
        </>
      ) : (
        <>
          {renderTemplate(article, false, null, categories, subcategories)}
          <button onClick={() => handleEdit(article)}>Editar</button>
          <button onClick={() => handleDelete(article.id)}>Eliminar</button>
          {article.publish_status === 'Draft' && <button onClick={() => handlePublish(article)}>Publicar</button>}
        </>
      )}
    </div>
  );
};

export default MyArticles;




