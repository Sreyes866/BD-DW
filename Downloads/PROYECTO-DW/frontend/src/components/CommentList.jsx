import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que esta sea la ruta correcta para AuthContext

const CommentList = ({ comments, setComments, articleId }) => {
  const { userId } = useContext(AuthContext);
  const [replyText, setReplyText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Asegurarse de que comments siempre es un array
    if (!Array.isArray(comments)) {
      console.error('comments debe ser un array', comments);
      return;
    }

    comments.forEach(async (comment) => {
      if (!comment.replies && comment.CommentID) {
        try {
          const response = await axios.get(`http://localhost/getCommentReplies.php?parent_comment_id=${comment.CommentID}`);
          comment.replies = response.data;
          setComments([...comments]);
        } catch (error) {
          console.error('Error fetching replies:', error);
          setError('No se pudieron cargar las respuestas.');
        }
      }
    });
  }, [comments, setComments]);

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
        const newReply = { ...data.newReply, replies: [] }; // Asegúrate de que la nueva respuesta tenga la propiedad replies
        // Actualiza el estado de forma inmutable
        const updatedComments = comments.map(comment => {
          if (comment.CommentID === parentCommentId) {
            // Crea una nueva copia de las respuestas existentes y añade la nueva
            const newReplies = [...(comment.replies || []), newReply];
            // Retorna una nueva copia del comentario con las nuevas respuestas
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
      .filter(comment => comment && comment.ParentCommentID === parentId)
      .map((comment) => {
        if (typeof comment.CommentID === 'undefined' || typeof comment.ParentCommentID === 'undefined') {
          console.error('Comentario mal formado', comment);
          return null;
        }
  
        return (
          <div key={comment.CommentID} className={`comment ${parentId ? "reply" : ""}`}>
            <strong>{comment.name}</strong> {/* Muestra el nombre del usuario aquí */}
            <p>{comment.Text}</p>
            {/* Solo muestra el botón de respuesta si no es una respuesta (sin parentId) */}
            {userId && !parentId && (
              <button onClick={() => handleReplyClick(comment.CommentID)}>Responder</button>
            )}
            {replyTo === comment.CommentID && !parentId && (
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
            {/* Llamada recursiva solo si no hay parentId */}
            {!parentId && comment.replies && (
              <div className="replies">
                {renderComments(comment.replies, comment.CommentID)}
              </div>
            )}
          </div>
        );
      });
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