import React from 'react';

// Estilos para el blog
const blogStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  border: '1px solid #ccc',
  boxShadow: '0px 0px 10px #aaa',
};

const titleStyle = {
  fontSize: '2em',
  marginBottom: '20px',
  textAlign: 'left',
};

const categoryStyle = {
  color: '#777',
  marginBottom: '10px',
  textAlign: 'left',
};

const contentStyle = {
  fontSize: '1.2em',
  textAlign: 'left', // Cambiado a 'left'
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const authorStyle = {
  color: '#555',
  marginBottom: '10px',
  textAlign: 'left',
};

const imageStyle = {
  maxWidth: '40%',
  maxHeight: '40%',
  float: 'right', // Cambiado a 'right'
  marginRight: '10px', // Espacio a la izquierda de la imagen
};

const Template2 = ({ article, isEditing, handleChange }) => {
  if (!article) {
    return <p>Cargando artículo...</p>;
  }

  const textAreaRows = article.content ? article.content.split('\n').length : 1;

  return (
    <div className="template1" style={blogStyle}>
      <h1 style={titleStyle}>
        {isEditing ? (
          <input type="text" value={article.title} name="title" onChange={handleChange} style={{ width: '100%' }} />
        ) : (
          article.title
        )}
      </h1>
      <p style={categoryStyle}>
        <strong>Categoría:</strong>{' '}
        {isEditing ? <input type="text" value={article.category_id} name="category" onChange={handleChange} /> : article.category_id}
      </p>
      <p style={categoryStyle}>
        <strong>Subcategoría:</strong>{' '}
        {isEditing ? <input type="text" value={article.sub_category_id} name="subCategory" onChange={handleChange} /> : article.sub_category_id}
      </p>
      <p style={authorStyle}>
        <strong>Autor:</strong>{' '}
        {isEditing ? <input type="text" value={article.author_id} name="author" onChange={handleChange} /> : article.author_id}
      </p>

      <div className="content" style={contentStyle}>
        {isEditing ? (
          <textarea
            value={article.content}
            name="content"
            onChange={handleChange}
            rows={textAreaRows}
            style={{ width: '100%', height: 'auto' }}
          ></textarea>
        ) : (
          article.content
        )}
      </div>
      {article.image && <img src={URL.createObjectURL(article.image)} alt={article.title} style={imageStyle} />}
    </div>
  );
};

export default Template2;
