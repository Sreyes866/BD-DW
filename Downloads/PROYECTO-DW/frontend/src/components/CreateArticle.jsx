import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Template1 from './Template1';

const CreateArticle = ({ addArticle }) => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    subCategory: '',
    image: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState('Template1');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const renderTemplate = () => {
    if (selectedTemplate === 'Template1') {
      return <Template1 article={article} />;
    }
    return <p>No se seleccionó ninguna plantilla.</p>;
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle(article);
    history.push('/article-templates');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded">
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="content">Contenido</label>
              <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-control" rows="5"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">URL de la Imagen</label>
              <input type="text" id="image" name="image" value={article.image} onChange={handleChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </div>
      </div>
      <div>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default CreateArticle;