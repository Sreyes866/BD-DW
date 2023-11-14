import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Template2 from './Template2';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useAuth } from '../context/AuthContext';
import HighlightedCommentList from './HighlightedCommentList';

const ArticleDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const { isLoggedIn, userRole, isSubscribed } = useAuth();
  const location = useLocation();
  const commentIdToHighlight = new URLSearchParams(location.search).get('comment');



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
    if (!articles.length || !categories.length) {
      return;
    }
  
    const foundArticle = articles.find(a => a.id === parseInt(id, 10));
    if (foundArticle) {
      const articleCategoryId = parseInt(foundArticle.category_id, 10); 
      const articleCategory = categories.find(c => parseInt(c.id, 10) === articleCategoryId);
      
      if (articleCategory) {
        const updatedArticle = { ...foundArticle, categoryName: articleCategory.name };
  
        const isArticlePremium = articleCategory.is_premium === "1"; 
        const isUserSubscribed = isSubscribed === 1;
  
        console.log(`isArticlePremium: ${isArticlePremium}, isUserSubscribed: ${isUserSubscribed}`);
  
        if (isArticlePremium && !isUserSubscribed) {
          alert('Este contenido es exclusivo para suscriptores.');
        } else {
          setArticle(updatedArticle);
        }
      } else {
        console.log('Categoría no encontrada para el artículo:', foundArticle);
      }
    }
  }, [articles, categories, id, isSubscribed]);
  
  
  
  
  
  
  


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
      {/* Pasa commentIdToHighlight al componente CommentList */}
      <CommentList 
        comments={comments} 
        setComments={setComments} 
        articleId={id} 
        commentIdToHighlight={commentIdToHighlight} 
      />
    </div>
  );
};

export default ArticleDetail;