import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentList = ({ articleId }) => {
  const { userId, userName } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar comentarios cuando el componente se monta
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost/getCommentReplies.php?article_id=${articleId}`);
        setComments(response.data.comments); 
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
        setError('No se pudieron cargar los comentarios.');
      }
    };

    fetchComments();
  }, [articleId]);

  
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
        const newReply = {
          CommentID: data.newReplyID,
          ParentCommentID: parentCommentId,
          Text: replyText,
          userName: userName, 
          replies: []
        };
        // Actualiza el estado con la nueva respuesta
        setComments(addReplyToComments(comments, newReply));
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

  // Función para añadir una respuesta de manera recursiva a los comentarios
  const addReplyToComments = (comments, newReply) => {
    return comments.map(comment => {
      if (comment.CommentID === newReply.ParentCommentID) {
        // Si el comentario actual es el padre de la nueva respuesta, añádela a sus respuestas
        return { ...comment, replies: [...(comment.replies || []), newReply] };
      } else if (comment.replies && comment.replies.length > 0) {
        // Si no, busca en sus respuestas de forma recursiva
        return { ...comment, replies: addReplyToComments(comment.replies, newReply) };
      }
      return comment;
    });
  };

  const reportComment = async (commentId) => {
    try {
      // Log en consola para verificar los datos enviados
      console.log("Reportando comentario", { comment_id: commentId, reported_by: userId });
  
      const response = await axios.post('http://localhost/reportComment.php', {
        comment_id: commentId,
        reported_by: userId // Cambiado a userId
      });
  
      if (response.data.message === 'Comentario reportado') {
        alert('Comentario reportado con éxito');
      } else {
        alert('Error al reportar el comentario en frontend');
      }
    } catch (error) {
      console.error('Error al reportar el comentario:', error);
      alert('Error al reportar el comentario');
    }
  };
  

  // Función recursiva para renderizar comentarios y respuestas
  const renderComments = (commentsToRender, parentId = null) => {
    return commentsToRender
      .filter((comment) => comment && comment.ParentCommentID === parentId)
      .map((comment) => (
        <div key={comment.CommentID} className={`comment ${parentId ? 'reply' : ''}`}>
          <strong>{comment.userName || 'Usuario Desconocido'}</strong>
          <p>{comment.Text}</p>
          {userId && (
            <>
              <button onClick={() => handleReplyClick(comment.CommentID)}>Responder</button>
              <button onClick={() => reportComment(comment.CommentID)}>Reportar</button>
            </>
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