import React from 'react';
import { useParams } from 'react-router-dom'; 

const ArticlesByCategory = ({ articles }) => {
  const { category, subCategory } = useParams();

  return (
    <div>
      <h1>{subCategory}</h1>  {/* Título basado en la subcategoría */}
      {/* Renderizar los artículos filtrados */}
    </div>
  );
};

export default ArticlesByCategory;
