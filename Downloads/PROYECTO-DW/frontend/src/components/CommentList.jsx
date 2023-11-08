import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentList = ({ comments, setComments, articleId }) => {
  const { userId } = useContext(AuthContext);
  const [replyText, setReplyText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState('');

  // Función para recargar las respuestas para un comentario específico
  const refreshReplies = async (commentId) => {
    try {
      const response = await axios.get(`http://localhost/getCommentReplies.php?parent_comment_id=${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching replies:', error);
      setError('No se pudieron cargar las respuestas.');
      return [];
    }
  };

  const submitReply = async (parentCommentId) => {
    if (!replyText.trim()) {
      setError('La respuesta no puede estar vacía.');
      return;
    }

    const formData = new FormData();
    formData.append('article_id', articleId);
    formData.append('user_id', userId);
    formData.append('text', replyText);
    formData.append('parent_comment_id', parentCommentId);

    try {
      const response = await axios.post('http://localhost/addCommentReply.php', formData);
      const data = response.data;

      if (data.message === 'Respuesta añadida exitosamente') {
        const newReplies = await refreshReplies(parentCommentId);
        const updatedComments = comments.map((comment) => {
          if (comment.CommentID === parentCommentId) {
            return { ...comment, replies: newReplies };
          }
          return comment;
        });

        setComments(updatedComments);
        setReplyText('');
        setReplyTo(null);
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Ocurrió un error al enviar la respuesta.');
      console.error('Error al enviar la respuesta:', error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyTo(commentId);
    setReplyText('');
  };

  const renderComments = (commentsToRender, parentId = null) => {
    if (!Array.isArray(commentsToRender)) {
      console.error('renderComments fue llamado con un argumento no array', commentsToRender);
      return null;
    }

    return commentsToRender
      .filter((comment) => comment && comment.ParentCommentID === parentId)
      .map((comment) => (
        <div key={comment.CommentID} className={`comment ${parentId ? 'reply' : ''}`}>
          <strong>{comment.userName}</strong> {/* Muestra el nombre del usuario aquí */}
          <p>{comment.Text}</p>
          {userId && (
            <button onClick={() => handleReplyClick(comment.CommentID)}>Responder</button>
          )}
          {replyTo === comment.CommentID && (
            <div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
              ></textarea>
              <button onClick={() => submitReply(comment.CommentID)}>Enviar Respuesta</button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
          {comment.replies && (
            <div className="replies">
              {renderComments(comment.replies, comment.CommentID)}
            </div>
          )}
        </div>
      ));
  };

  if (!comments.length) return <p>No hay comentarios para este artículo.</p>;

  return (
    <div className="comments-container">
      <h3>Comentarios</h3>
      {renderComments(comments)}
    </div>
  );
};

export default CommentList;