import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const HighlightedCommentList = ({ articleId, commentIdToHighlight }) => {
  const [comments, setComments] = useState([]);
  const highlightedCommentRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost/getCommentReplies.php?article_id=${articleId}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
      }
    };

    fetchComments();
  }, [articleId]);

  useEffect(() => {
    if (highlightedCommentRef.current) {
      highlightedCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [comments]);

  const renderComments = (commentsToRender, parentId = null) => {
    return commentsToRender.map((comment) => {
      const isHighlighted = comment.CommentID.toString() === commentIdToHighlight;

      return (
        <div 
          key={comment.CommentID}
          ref={isHighlighted ? highlightedCommentRef : null} 
          className={`comment ${parentId ? 'reply' : ''} ${isHighlighted ? 'highlighted-comment' : ''}`}
        >
          <strong>{comment.userName || 'Usuario Desconocido'}</strong>
          <p>{comment.Text}</p>
          {/* Aquí puedes incluir botones de responder o reportar si es necesario */}
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

export default HighlightedCommentList;
