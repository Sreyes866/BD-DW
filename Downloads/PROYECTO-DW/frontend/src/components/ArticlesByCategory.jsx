import React from 'react';
import { useParams } from 'react-router-dom';

const ArticlesByCategory = ({ articles }) => {
  const { category, subCategory } = useParams();
  const filteredArticles = articles.filter(
    article => article.category === category && article.subCategory === subCategory
  );
  
  return (
    <div>
      <h1>{subCategory}</h1>
      {/* Renderizar los artículos filtrados aquí */}
      {filteredArticles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesByCategory;
