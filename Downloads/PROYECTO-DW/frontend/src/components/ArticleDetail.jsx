import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Template2 from './Template2';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
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
    const fetchData = async () => {
      try {
        const articlesResponse = await axios.get('http://localhost/Articles.php');
        setArticles(articlesResponse.data);
        const categoriesResponse = await axios.get('http://localhost/Categories.php');
        setCategories(categoriesResponse.data);
        const subcategoriesResponse = await axios.get('http://localhost/Subcategories.php');
        setSubcategories(subcategoriesResponse.data);
        const commentsResponse = await axios.get(`http://localhost/getComments.php?article_id=${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost/getCommentReplies.php?article_id=${id}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
      }
    };
  
    fetchComments();
  
    // Configurar un polling cada 30 segundos (30000 milisegundos)
    const interval = setInterval(fetchComments, 30000);
  
    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [id]);



  useEffect(() => {
    const foundArticle = articles.find(a => a.id === parseInt(id, 10));
    setArticle(foundArticle);
  }, [articles, id]);


  const handleDelete = async () => {
    try {
      await axios.post('http://localhost/deleteArticle.php', { id });
      history.push('/articles');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleNewComment = (newComment) => {
    console.log('Nuevo comentario:', newComment);
    setComments(currentComments => {
      let updatedComments = [];
      if (newComment.ParentCommentID) {
        // Encuentra el comentario principal y añade la respuesta
        updatedComments = currentComments.map(comment => 
          comment.CommentID === newComment.ParentCommentID 
            ? {...comment, replies: [...comment.replies, newComment]} 
            : comment
        );
      } else {
        // Si es un comentario principal, añádelo al inicio de la lista de comentarios
        updatedComments = [newComment, ...currentComments];
      }
      return updatedComments;  // Asegúrate de retornar la lista actualizada de comentarios
    });
  };
  
  

  if (!article) return <div>Loading...</div>;

  return (

    <div className="container">
      <Template2 article={article} isEditing={false} handleChange={handleChange} categories={categories} subcategories={subcategories} />
      {(userRole === 'admin' || userRole === 'moderator') && (
        <>
          <button onClick={handleDelete}>Eliminar artículo</button>
        </>
      )}
      {isLoggedIn && (
        <CommentForm 
          articleId={id} 
          onCommentPosted={handleNewComment} 
        />
      )}
      <CommentList comments={comments} setComments={setComments} articleId={id} />
      {/* Otros códigos y componentes */}
    </div>
  );
};

export default ArticleDetail;