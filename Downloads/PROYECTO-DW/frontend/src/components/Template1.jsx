import React from 'react';

const Template1 = ({ article }) => {
  if (!article) {
    return <p>Cargando artículo...</p>;
  }

  return (
    <div className="template1">
      <h1>{article.title}</h1>
      <p><strong>Categoría:</strong> {article.category}</p>
      <p><strong>Subcategoría:</strong> {article.subCategory}</p>
      <div className="content">
        {article.content}
      </div>
    </div>
  );
};

export default Template1;
