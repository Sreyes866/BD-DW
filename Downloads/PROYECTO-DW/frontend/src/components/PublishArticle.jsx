import React from 'react';

const PublishArticle = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <p>Categoría: {article.category}</p>
      <p>Subcategoría: {article.subCategory}</p>
    </div>
  );
};

export default PublishArticle;
