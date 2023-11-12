import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const ModerationPanel = () => {
  const [reportedComments, setReportedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const response = await axios.get('http://localhost/getReportedComments.php');
        setReportedComments(response.data.reportedComments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los comentarios reportados:', error);
        setIsLoading(false);
      }
    };

    fetchReportedComments();
  }, []);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Panel de Moderación</h2>
      {reportedComments.length > 0 ? (
        <ul>
          {reportedComments.map((comment) => (
            <li key={comment.CommentID}>
              <p><strong>Comentario:</strong> {comment.Text}</p>
              <p><strong>Autor:</strong> {comment.userName}</p>
              <p><strong>Reportes:</strong> {comment.reportCount}</p>
              {/* Enlace que incluye el ID del comentario para resaltar */}
              <Link to={`/article/${comment.ArticleID}?comment=${comment.CommentID}`}>Ver comentario en el artículo</Link>
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
