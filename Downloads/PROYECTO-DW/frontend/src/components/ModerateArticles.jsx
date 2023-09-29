import React, { useState, useEffect } from 'react';

const ModerateArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Aquí podrías hacer una llamada a la API para obtener los artículos pendientes de moderación
    // Simulamos una llamada a la API
    setArticles([
      { id: 1, title: 'Article 1', status: 'Pending' },
      { id: 2, title: 'Article 2', status: 'Pending' },
      // ...
    ]);
  }, []);

  const handleApprove = (id) => {
 // una llamada a la API para aprobar el artículo
    console.log(`Artículo ${id} aprobado`);
  };

  const handleReject = (id) => {
// una llamada a la API para rechazar el artículo
    console.log(`Artículo ${id} rechazado`);
  };

  return (
    <div>
      <h1>Moderate Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title} - {article.status}
            <button onClick={() => handleApprove(article.id)}>Approve</button>
            <button onClick={() => handleReject(article.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModerateArticles;
