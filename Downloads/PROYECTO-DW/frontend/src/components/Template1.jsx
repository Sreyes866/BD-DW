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
  textAlign: 'center'  // Cambiado a center
};

const categoryStyle = {
  color: '#777',
  marginBottom: '10px',
  textAlign: 'center'  // Cambiado a center
};

const authorStyle = {
  color: '#555',
  marginBottom: '10px',
  textAlign: 'center'  // Cambiado a center
};

const contentLeftStyle = {
  fontSize: '1.2em',
  textAlign: 'center', // Centrar el texto
  display: 'inline-block',
  verticalAlign: 'top',
  width: '48%', // Ajustar el ancho para dar espacio para el margen
  marginRight: '2%' // Agregar un pequeño margen a la derecha
};

const contentRightStyle = {
  fontSize: '1.2em',
  textAlign: 'center', // Centrar el texto
  display: 'inline-block',
  verticalAlign: 'top',
  width: '48%',
  marginLeft: '2%' // Agregar un pequeño margen a la derecha
};




const imageStyle = {
  width: '100%',  // Ajustar el ancho al 100% del contenedor
  height: 'auto'  // Altura automática para mantener las proporciones
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
  
      <div style={contentLeftStyle}>
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
        <div style={{width: '100%', textAlign: 'center'}}></div>
        {article.image ? <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} style={imageStyle} /> : "Imagen no disponible"}
      </div>

      <div style={contentRightStyle}>
        {isEditing ? (
          <>
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
    </div>
  );
};

export default Template1;
