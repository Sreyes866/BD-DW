import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';

const CreateArticle = ({ addArticle }) => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    subCategory: '',
    templateType: 'Template1',
    image: null,
    author: '' 
  });


  const [articleCreated, setArticleCreated] = useState(false);
  const [newArticleId, setNewArticleId] = useState(null);


  
  const categories = {
    'Tecnologia': ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'Ciencia': ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'Salud': ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'Arte y cultura': ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'Negocios y finanzas': ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    setArticle({ ...article, image: e.target.files[0] });
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle(article);
    history.push('/article-templates');
  };

  const renderTemplate = () => {
    switch (article.templateType) {
      case 'Template1':
        return <Template1 article={article} />;
      case 'Template2':
        return <Template2 article={article} />;
      case 'Template3':
        return <Template3 article={article} />;
      default:
        return <p>No se seleccionó ninguna plantilla.</p>;
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded">
            <div className="form-group">
              <label htmlFor="templateType">Selecciona una plantilla</label>
              <select id="templateType" name="templateType" value={article.templateType} onChange={handleChange} className="form-control">
                <option value="Template1">Plantilla 1</option>
                <option value="Template2">Plantilla 2</option>
                <option value="Template3">Plantilla 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Autor</label>
              <input type="text" id="author" name="author" value={article.author} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="content">Contenido</label>
              <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-control" rows="5"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select id="category" name="category" value={article.category} onChange={handleChange} className="form-control">
                <option value="" disabled>Seleccione una categoría</option>
                {Object.keys(categories).map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subCategory">Subcategoría</label>
              <select id="subCategory" name="subCategory" value={article.subCategory} onChange={handleChange} className="form-control">
                <option value="" disabled>Seleccione una subcategoría</option>
                {categories[article.category]?.map((subCat, index) => (
                  <option key={index} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="image">Imagen</label>
              <input type="file" id="image" onChange={handleImageChange} className="form-control-file" />
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h2>Previsualización del artículo</h2>
          {renderTemplate()}
        </div>
      </div>
      {articleCreated && (
        <div>
          <h3>Artículo creado con éxito</h3>
          <button onClick={() => history.push(`/article/${newArticleId}`)}>Ver artículo</button>
        </div>
      )}
    </div>
  );
};

export default CreateArticle;

