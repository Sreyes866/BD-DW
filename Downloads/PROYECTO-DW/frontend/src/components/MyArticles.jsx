import React, { useState } from 'react';

const MyArticles = () => {
  const [showArticles, setShowArticles] = useState({ published: false, drafts: false, review: false });
  const publishedArticles = ['Artículo 1', 'Artículo 2'];
  const draftArticles = ['Draft 1', 'Draft 2'];
  const reviewArticles = ['Revisión 1', 'Revisión 2'];

  const toggleShowArticles = (type) => {
    setShowArticles({ ...showArticles, [type]: !showArticles[type] });
  };

  return (
    <div className="my-articles-container">
      <div className="article-section">
        <h3 onClick={() => toggleShowArticles('published')}>Artículos Publicados</h3>
        <div className={`article-list ${showArticles.published ? 'show' : ''}`}>
          {publishedArticles.map(article => <div key={article}>{article}</div>)}
        </div>
      </div>
      <div className="article-section">
        <h3 onClick={() => toggleShowArticles('drafts')}>Artículos sin Publicar (Drafts)</h3>
        <div className={`article-list ${showArticles.drafts ? 'show' : ''}`}>
          {draftArticles.map(article => <div key={article}>{article}</div>)}
        </div>
      </div>
      <div className="article-section">
        <h3 onClick={() => toggleShowArticles('review')}>Artículos en Revisión</h3>
        <div className={`article-list ${showArticles.review ? 'show' : ''}`}>
          {reviewArticles.map(article => <div key={article}>{article}</div>)}
        </div>
      </div>
    </div>
  );
};

export default MyArticles;