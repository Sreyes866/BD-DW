import React from 'react';

const Template3 = ({ article }) => {
  return (
    <div className="template3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '0.6' }}>
        <h1>{article.title}</h1>
        <p><strong>Categoría:</strong> {article.category}</p>
        <p><strong>Subcategoría:</strong> {article.subCategory}</p>
        <div className="content">
          {article.content}
        </div>
      </div>
    </div>
  );
};

export default Template3;
