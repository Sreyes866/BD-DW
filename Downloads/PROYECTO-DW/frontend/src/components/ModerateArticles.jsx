import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModerateArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost/Articles.php')
      .then(response => {
        if (Array.isArray(response.data)) {
          setArticles(response.data.map(article => ({ 
            id: article.id, 
            title: article.title, 
            status: 'Pending'  
          })));
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const handleApprove = (id) => {
    const updatedArticles = articles.map(article =>
      article.id === id ? { ...article, status: 'Approved' } : article
    );
    setArticles(updatedArticles);
    console.log(`Artículo ${id} aprobado`);
  };

  const handleReject = (id) => {
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

