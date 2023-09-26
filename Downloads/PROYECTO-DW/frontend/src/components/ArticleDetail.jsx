import React from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id, 10));

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <p>Categoría: {article.category}</p>
      <p>Subcategoría: {article.subcategory}</p>
    </div>
  );
};

export default ArticleDetail; // Asegúrate de exportar el componente
