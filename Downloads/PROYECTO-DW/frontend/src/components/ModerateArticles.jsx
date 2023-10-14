import React, { useState, useEffect } from 'react';

const ModerateArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Simulación de una llamada a la API para obtener los artículos pendientes de moderación
    setArticles([
      { id: 1, title: 'Article 1', status: 'Pending' },
      { id: 2, title: 'Article 2', status: 'Pending' },
      { id: 3, title: 'Article 3', status: 'Pending' },
      
    ]);
  }, []);

  const handleApprove = (id) => {
    // Simulación de la aprobación del artículo
    const updatedArticles = articles.map(article =>
      article.id === id ? { ...article, status: 'Approved' } : article
    );
    setArticles(updatedArticles);
    console.log(`Artículo ${id} aprobado`);
  };

  const handleReject = (id) => {
    // Simulación del rechazo del artículo
    const updatedArticles = articles.map(article =>
      article.id === id ? { ...article, status: 'Rejected' } : article
    );
    setArticles(updatedArticles);
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
