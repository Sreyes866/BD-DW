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
    const foundArticle = articles.find(a => a.id === parseInt(id, 10));
    setArticle(foundArticle);
  }, [articles, id]);

  const refreshComments = async () => {
    try {
      const response = await axios.get(`http://localhost/getComments.php?article_id=${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

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
    refreshComments(); // Refresh comments to fetch the latest including new ones
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container">
      <Template2 article={article} isEditing={false} handleChange={handleChange} categories={categories} subcategories={subcategories} />
      {(userRole === 'admin' || userRole === 'moderator') && (
        <>
          <button onClick={handleDelete}>Eliminar artículo</button>
          {/* Add button for saving if needed */}
        </>
      )}
      {isLoggedIn && <CommentForm articleId={id} onCommentPosted={handleNewComment} />}
      <CommentList comments={comments} setComments={setComments} articleId={id} />
    </div>
  );
};

export default ArticleDetail;
