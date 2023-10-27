import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MyArticles = () => {
  const [showArticles, setShowArticles] = useState({ published: false, drafts: false, review: false });
  const [articles, setArticles] = useState([]);
  const { userName } = useAuth();

  useEffect(() => {
    axios.get('http://localhost/Articles.php')
      .then(response => {
        const myArticles = response.data.filter(article => article.author_id === userName);
        setArticles(myArticles);
      })
      .catch(error => console.error('Error:', error));
  }, [userName]);

  const toggleShowArticles = (type) => {
    setShowArticles({ ...showArticles, [type]: !showArticles[type] });
  };

  const publishedArticles = articles.filter(article => article.approval_status === 'Approved');
  const draftArticles = articles.filter(article => article.publish_status === 'Draft');
  const reviewArticles = articles.filter(article => article.approval_status === 'Pending');

  return (
    <div className="my-articles-container">
      <div className="article-section">
        <h3 onClick={() => toggleShowArticles('published')}>Artículos Publicados</h3>
        <div className={`article-list ${showArticles.published ? 'show' : ''}`}>
          {publishedArticles.map(article => <div key={article.id}>{article.title}</div>)}
        </div>
      </div>
      <div className="article-section">
        <h3 onClick={() => toggleShowArticles('drafts')}>Artículos sin Publicar (Drafts)</h3>
        <div className={`article-list ${showArticles.drafts ? 'show' : ''}`}>
          {draftArticles.map(article => <div key={article.id}>{article.title}</div>)}
        </div>
      </div>
      <div className="article-section">
        <h3 onClick={() => toggleShowArticles('review')}>Artículos en Revisión</h3>
        <div className={`article-list ${showArticles.review ? 'show' : ''}`}>
          {reviewArticles.map(article => <div key={article.id}>{article.title}</div>)}
        </div>
      </div>
    </div>
  );
};

export default MyArticles;


