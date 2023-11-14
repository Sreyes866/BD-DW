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
  textAlign: 'center'
};

const categoryStyle = {
  color: '#777',
  marginBottom: '10px',
  textAlign: 'center'
};

const contentLeftStyle = {
  fontSize: '1.2em',
  textAlign: 'center', 
  display: 'inline-block',
  verticalAlign: 'top',
  width: '48%', 
  marginRight: '2%' 
};

const contentRightStyle = {
  fontSize: '1.2em',
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'top',
  width: '48%',
  marginLeft: '2%' 
};

const authorStyle = {
  color: '#555',
  marginBottom: '10px',
  textAlign: 'center'
};

const imageStyle = {
  width: '100%',
  height: 'auto'
};

const Template2 = ({ article, isEditing, handleChange, handleImageChange, categories = [], subcategories = [] }) => {
  
  const filteredSubcategories = subcategories.filter(sub => sub.category_id === article.category_id);

  if (!article) {
    return <p>Cargando artículo...</p>;
  }

  const textAreaRows = article.content ? article.content.split('\n').length : 1;

  return (
    <div className="template2" style={blogStyle}>
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
          article.categoryName || 'No especificada'
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
  
      <div style={contentLeftStyle}>
        {isEditing ? (
          <>
            <textarea value={article.content} name="content" onChange={handleChange} rows={textAreaRows} style={{ width: '100%', height: 'auto' }}></textarea>
            <textarea value={article.content1} name="content1" onChange={handleChange} rows="5" style={{ width: '100%', height: 'auto' }}></textarea>
            <textarea value={article.content2} name="content2" onChange={handleChange} rows="5" style={{ width: '100%', height: 'auto' }}></textarea>
          </>
        ) : (
          <>
            <div>{article.content}</div>
            <div>{article.content1}</div>
            <div>{article.content2}</div>
          </>
        )}
      </div>
  
      <div style={contentRightStyle}>
        {article.image ? <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} style={imageStyle} /> : "Imagen no disponible"}
        {isEditing ? (
          <textarea value={article.content3} name="content3" onChange={handleChange} rows="5" style={{ width: '100%', height: 'auto' }}></textarea>
        ) : (
          <div>{article.content3}</div>
        )}
      </div>
  
      {isEditing && (
        <div>
          <label htmlFor="image">Imagen:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
      )}

    </div>
  );
};

export default Template2;
