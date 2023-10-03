import React from 'react';

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
  textAlign: 'left',
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
  float: 'right',
  marginRight: '10px',
};

const Template2 = ({ article, categories, subcategories, isEditing, handleChange }) => {
  const categoryName = categories.find(cat => cat.id === article.category_id)?.name || 'No especificada';
  const subcategoryName = subcategories.find(sub => sub.id === article.sub_category_id)?.name || 'No especificada';

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
        <strong>Categoría:</strong> {isEditing ? (
          <input type="text" value={categoryName} name="category" onChange={handleChange} />
        ) : (
          categoryName
        )}
      </p>
      <p style={categoryStyle}>
        <strong>Subcategoría:</strong> {isEditing ? (
          <input type="text" value={subcategoryName} name="subCategory" onChange={handleChange} />
        ) : (
          subcategoryName
        )}
      </p>
      <p style={authorStyle}>
        <strong>Autor:</strong> {isEditing ? <input type="text" value={article.author_id} name="author" onChange={handleChange} /> : article.author_id}
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
