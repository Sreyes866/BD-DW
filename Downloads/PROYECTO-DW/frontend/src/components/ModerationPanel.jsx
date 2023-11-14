import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModerationPanel = () => {
  const [reportedComments, setReportedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReportedComments = async () => {
    try {
      const response = await axios.get('http://localhost/getReportedComments.php');
      setReportedComments(response.data.reportedComments.map(comment => ({
        ...comment,
        isCensored: comment.IsCensored === 1  // Convertir IsCensored a booleano
      })));
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar los comentarios reportados:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportedComments();
  }, []);

  const handleCensorComment = async (commentId, shouldCensor) => {
    try {
      await axios.post('http://localhost/censorComment.php', {
        commentId,
        isCensored: shouldCensor ? 1 : 0
      });
      // Actualizar el estado de reportedComments para reflejar el cambio
      setReportedComments(currentComments =>
        currentComments.map(comment =>
          comment.CommentID === commentId
            ? { ...comment, isCensored: shouldCensor }
            : comment
        )
      );
    } catch (error) {
      console.error('Error al censurar/descensurar el comentario:', error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="moderation-panel">
      <h2>Panel de Moderación</h2>
      {reportedComments.length > 0 ? (
        <ul>
          {reportedComments.map((comment) => (
            <li key={comment.CommentID} className={comment.isCensored ? 'censored-comment-style' : ''}>
              <p><strong>Comentario:</strong> {comment.isCensored ? 'Este comentario ha sido censurado' : comment.Text}</p>
              <p><strong>Usuario:</strong> {comment.userName}</p>
              <p><strong>Reportes:</strong> {comment.reportCount}</p>
              <Link to={`/article/${comment.ArticleID}?comment=${comment.CommentID}`}>Ver comentario en el artículo</Link>
              <button onClick={() => handleCensorComment(comment.CommentID, !comment.isCensored)}>
                {comment.isCensored ? 'Descensurar' : 'Censurar'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios reportados.</p>
      )}
    </div>
  );
};

export default ModerationPanel;
