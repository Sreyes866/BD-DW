import React from 'react';

// Estilos para el blog
const blogStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  border: '1px solid #ccc',
  boxShadow: '0px 0px 10px #aaa'
};


const Template3 = ({ article, isEditing, handleChange, handleImageChange, categories = [], subcategories = [] }) => {
  
  const filteredSubcategories = subcategories.filter(sub => sub.category_id === article.category_id);

 
  const centralStyle = {
    textAlign: 'center',
    width: '100%'
  };

  const centralImageStyle = {
    maxWidth: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  if (!article) {
    return <p>Cargando artículo...</p>;
  }

  return (
    <div style={{ ...blogStyle, ...centralStyle }}>
      <h1>
        {isEditing ? (
          <input type="text" value={article.title} name="title" onChange={handleChange} style={{ width: '100%' }} />
        ) : (
          article.title
        )}
      </h1>
  
      <p>
        <strong>Categoría:</strong>{' '}
        {isEditing ? (
          <select name="category_id" value={article.category_id} onChange={handleChange}>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        ) : (
          categories.find(cat => cat.id === (article.category_id))?.name || 'No especificada'

        )}
      </p>
  
      <p>
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
  
      <p>
        <strong>Autor:</strong>{' '}
        {isEditing ? <input type="text" value={article.author_id} name="author_id" onChange={handleChange} /> : article.author_id}
      </p>

      
      <div style={centralStyle}>
        {isEditing ? (
          <>
            <label htmlFor="content">Contenido principal:</label>
            <textarea
              id="content"
              value={article.content}
              name="content"
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', height: 'auto' }}
            ></textarea>

            <label htmlFor="content1">Contenido 1:</label>
            <textarea
              id="content1"
              value={article.content1}
              name="content1"
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', height: 'auto' }}
            ></textarea>
          </>
        ) : (
          <>
            <div>{article.content}</div>
            <div>{article.content1}</div>
          </>
        )}
      </div>

      
      {article.image ? <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} style={centralImageStyle} /> : "Imagen no disponible"}
    </div>
  );
};

export default Template3;