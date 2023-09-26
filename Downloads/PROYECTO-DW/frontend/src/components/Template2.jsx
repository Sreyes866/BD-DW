import React from 'react';

const Template2 = ({ article }) => {
  return (
    <div className="template2" style={{ backgroundColor: '#f2f2f2' }}>
      <h1 style={{ textAlign: 'center' }}>{article.title}</h1>
      <div style={{ textAlign: 'center' }}>
        <p><strong>Categoría:</strong> {article.category}</p>
        <p><strong>Subcategoría:</strong> {article.subCategory}</p>
      </div>
      <div className="content" style={{ margin: '20px' }}>
        {article.content}
      </div>
    </div>
  );
};

export default Template2;
