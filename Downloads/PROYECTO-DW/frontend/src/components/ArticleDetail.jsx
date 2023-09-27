import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';

const ArticleDetail = ({ articles, deleteArticle, updateArticle }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(article);

  const [message, setMessage] = useState("");

  const categories = {
    'Tecnologia': ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'Ciencia': ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'Salud': ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'Arte y cultura': ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'Negocios y finanzas': ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
  };

  const handleDelete = () => {
    deleteArticle(article.id);
    setMessage("Artículo eliminado con éxito.");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedArticle({
      ...editedArticle,
      image: file
    });
  };

  const renderTemplate = (article, isEditing, handleChange, handleImageChange) => {
    const commonProps = {
      article,
      isEditing,
      handleChange,
      handleImageChange
    };

    switch (article.templateType) {
      case 'Template1':
        return <Template1 {...commonProps} />;
      case 'Template2':
        return <Template2 {...commonProps} />;
      case 'Template3':
        return <Template3 {...commonProps} />;
      default:
        return <p>Plantilla no encontrada</p>;
    }
  };

  return (
    <div className="container">
      {message && <p className="alert alert-success">{message}</p>}
      {isEditing ? (
        <div className="form-group">
          <input type="text" name="title" value={editedArticle.title} onChange={handleChange} />
          <textarea name="content" value={editedArticle.content} onChange={handleChange}></textarea>
          <select name="category" value={editedArticle.category} onChange={handleChange}>
            {Object.keys(categories).map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <select name="subCategory" value={editedArticle.subCategory} onChange={handleChange}>
            {categories[editedArticle.category]?.map((subCat, index) => (
              <option key={index} value={subCat}>{subCat}</option>
            ))}
          </select>
          <input type="file" onChange={handleImageChange} />
          <button className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
        </div>
      ) : (
        <div>
          {article && (
            <>
              {renderTemplate(article, isEditing, handleChange, handleImageChange)}
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
