import React from 'react';

// Estilos para el blog
const blogStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  border: '1px solid #ccc',
  boxShadow: '0px 0px 10px #aaa'
};

const titleStyle = {
  fontSize: '2em',
  marginBottom: '20px',
  textAlign: 'left'
};

const categoryStyle = {
  color: '#777',
  marginBottom: '10px',
  textAlign: 'left'
};

const contentStyle = {
  fontSize: '1.2em',
  textAlign: 'left',
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%'
};

const authorStyle = {
  color: '#555',
  marginBottom: '10px',
  textAlign: 'left'
};

const imageStyle = {
  maxWidth: '40%',
  maxHeight: '40%',
  float: 'right',
  marginLeft: '10px'
};

const Template1 = ({ article, isEditing, handleChange, categories, subcategories }) => {
  // Filtrar subcategorías basadas en la categoría seleccionada
  const filteredSubcategories = subcategories.filter(sub => sub.category_id === article.category_id);

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
        {isEditing ? (
          <select name="category_id" value={article.category_id} onChange={handleChange}>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        ) : (
          categories.find(cat => cat.id === article.category_id)?.name || 'No especificada'
        )}
        
      </p>

      <p style={categoryStyle}>
        <strong>Subcategoría:</strong>{' '}
        {isEditing ? (
          <select name="sub_category_id" value={article.sub_category_id} onChange={handleChange}>
            {filteredSubcategories.map((subcategory, index) => (
              <option key={index} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select>
        ) : (
          subcategories.find(sub => sub.id === article.sub_category_id)?.name || 'No especificada'
        )}
        
      </p>

      <p style={authorStyle}>
        <strong>Autor:</strong>{' '}
        {isEditing ? <input type="text" value={article.author_id} name="author_id" onChange={handleChange} /> : article.author_id}
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

export default Template1;



