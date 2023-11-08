import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentForm = ({ articleId, parentCommentId, onCommentPosted }) => {
  const [commentText, setCommentText] = useState('');
  const { userId, userName } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const submitComment = async () => {
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
          ...data.newComment,
          userName: userName, // Asumiendo que userName es proporcionado por AuthContext
          replies: [] // Asegura que los nuevos comentarios tengan la propiedad replies
        };
        setCommentText('');
        setError(null);
        onCommentPosted(newComment); // Actualiza la lista de comentarios en el componente padre
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
    </div>
  );
};

export default CommentForm;
