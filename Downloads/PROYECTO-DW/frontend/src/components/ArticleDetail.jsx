import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; 
import Template2 from './Template2';  
import CommentForm from './CommentForm';
import CommentList from './CommentList'; // Este sería un nuevo componente para listar comentarios
import { useAuth } from '../context/AuthContext'; 


const ArticleDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const { isLoggedIn, userRole } = useAuth(); 


  useEffect(() => {
    // Cargar todos los artículos
    axios.get('http://localhost/Articles.php')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => console.error('Error fetching articles:', error));

    // Cargar categorías y subcategorías
    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));


      axios.get(`http://localhost/getComments.php?article_id=${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  

  }, [id]);

  // Buscar el artículo específico por ID
  useEffect(() => {
    const foundArticle = articles.find(a => a.id === parseInt(id, 10));
    setArticle(foundArticle);
  }, [articles, id]);


  const refreshComments = () => {
    axios.get(`http://localhost/getComments.php?article_id=${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

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
      <Template2 article={article} isEditing={false} handleChange={handleChange} categories={categories} subcategories={subcategories} />
      {/* Solo mostrar estos botones a los admins y moderadores */}
      {(userRole === 'admin' || userRole === 'moderator') && (
        <>
          <button onClick={handleDelete}>Eliminar artículo</button>
        </>
      )}
      {/* Renderizar CommentForm solo si isLoggedIn es true */}
      {isLoggedIn && <CommentForm articleId={id} onCommentPosted={refreshComments} />}
      <CommentList comments={comments} setComments={setComments} articleId={id} />
    </div>
  );
};

export default ArticleDetail;

