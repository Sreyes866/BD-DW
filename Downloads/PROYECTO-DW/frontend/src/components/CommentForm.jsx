import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentForm = ({ articleId, parentCommentId, onCommentPosted }) => {
  const [commentText, setCommentText] = useState('');
  const { userId, userName } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isCommentAdded, setIsCommentAdded] = useState(false);

  const submitComment = async () => {
    setError(null);
    setIsCommentAdded(false);

    if (!commentText.trim()) {
      setError('El comentario no puede estar vacío.');
      return;
    }

    if (!userId) {
      setError('Error de autenticación. Por favor, inicia sesión.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('article_id', articleId);
      formData.append('user_id', userId);
      formData.append('text', commentText);
      if (parentCommentId) {
        formData.append('parent_comment_id', parentCommentId);
      }

      const response = await axios.post('http://localhost/addComment.php', formData);
      const data = response.data;

      if (data.message === 'Comentario añadido exitosamente') {
        const newComment = {
          CommentID: data.newCommentID, // Asegúrate de que el backend realmente devuelve el ID del nuevo comentario
          Text: commentText,
          userName: userName,
          ParentCommentID: parentCommentId, // Asegúrate de incluir el ID del comentario padre si existe
          replies: [] // Inicializar las respuestas como un arreglo vacío
        };
        setCommentText('');
        onCommentPosted(newComment); // Llama a esta función para actualizar el estado en el componente padre
        setIsCommentAdded(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      setError('Ocurrió un error al enviar el comentario.');
    }
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Escribe tu comentario aquí..."
      ></textarea>
      <button onClick={submitComment}>Enviar Comentario</button>
      {error && <p className="error">{error}</p>}
      {isCommentAdded && <p>Comentario añadido</p>}
    </div>
  );
};

export default CommentForm;