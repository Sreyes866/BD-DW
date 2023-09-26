import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = ({ articles, deleteArticle, updateArticle }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState({ ...article, category: article?.category || 'tecnologia' });

  const subCategories = {
    'tecnologia': ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'ciencia': ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'salud': ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'arte y cultura': ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'negocios y finanzas': ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateArticle(editedArticle);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle({
      ...editedArticle,
      [name]: value
    });
  };

  const [message, setMessage] = useState("");

  const handleDelete = () => {
    deleteArticle(article.id);
    setMessage("Artículo eliminado con éxito.");
  };

  if (!article && !message) return <p>Artículo no encontrado</p>;


  return (
    <div className="container">
    {message && <p className="alert alert-success">{message}</p>}
      {isEditing ? (
      <div className="form-group">
          <input type="text" name="title" value={editedArticle.title} onChange={handleChange} />
          <textarea name="content" value={editedArticle.content} onChange={handleChange}></textarea>
          <select name="category" value={editedArticle.category} onChange={handleChange}>
            <option value="tecnologia">Tecnología</option>
            <option value="ciencia">Ciencia</option>
            <option value="salud">Salud</option>
            <option value="arte y cultura">Arte y Cultura</option>
            <option value="negocios y finanzas">Negocios y Finanzas</option>
          </select>
          <select name="subCategory" value={editedArticle.subCategory} onChange={handleChange}>
            {editedArticle.category && subCategories[editedArticle.category] ? (
              subCategories[editedArticle.category].map((subCat, index) => (
                <option key={index} value={subCat.toLowerCase()}>{subCat}</option>
              ))
            ) : null}
          </select>
          <button className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
      </div>
      ) : (
        <div>
          {article && (
            <>
              <h1>{article.title}</h1>
              <p>{article.content}</p>
              <p>{article.category}</p>
              <p>{article.subCategory}</p>
            </>
          )}
          {!message && (
            <>
            <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            <button className="btn btn-warning" onClick={handleEdit}>Modificar</button>
          </>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;