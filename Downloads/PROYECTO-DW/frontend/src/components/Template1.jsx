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

const Template1 = ({ article, isEditing, handleChange, handleImageChange, categories = [], subcategories = [] }) => {
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
        {isEditing && article.templateType === 'Template1' ? (
          <>
            {/* Contenido principal */}
            <label htmlFor="content">Contenido principal:</label>
            <textarea
              id="content"
              value={article.content}
              name="content"
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', height: 'auto' }}
            ></textarea>

            {/* Contenido 1 */}
            <label htmlFor="content1">Contenido 1:</label>
            <textarea
              id="content1"
              value={article.content1}
              name="content1"
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', height: 'auto' }}
            ></textarea>

            <label htmlFor="content2">Contenido 2:</label>
            <textarea
              id="content2"
              value={article.content2}
              name="content2"
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', height: 'auto' }}
            ></textarea>

            <label htmlFor="content3">Contenido 3:</label>
            <textarea
              id="content3"
              value={article.content3}
              name="content3"
              onChange={handleChange}
              rows="5"
              style={{ width: '100%', height: 'auto' }}
            ></textarea>
          </>
        ) : (
          <>
            <div>{article.content}</div>
            <div>{article.content1}</div>
            <div>{article.content2}</div>
            <div>{article.content3}</div>
          </>
        )}
      </div>

      {isEditing && (
        <div>
          <label htmlFor="image">Imagen:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
      )}
  
      {console.log("Debugging article.image:", article.image)}
      {article.image ? <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} /> : "Imagen no disponible"}



    </div>
  );
  
};

export default Template1;