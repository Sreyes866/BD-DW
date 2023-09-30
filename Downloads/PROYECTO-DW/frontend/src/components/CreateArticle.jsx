import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category_id: '',
    sub_category_id: '',
    author_id: '',
    // templateType: 'Template1',
    // image: null
  });
  console.log(JSON.stringify(article))  

  const [articleCreated, setArticleCreated] = useState(false);
  const [articleLink, setArticleLink] = useState(null);
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/addarticule.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    })
    .then(response => {
      console.log("Raw Response: ", response);
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Not a valid response');
      }
    })
    .then(data => {
      console.log("Parsed Data: ", data);
      if (data.message === 'Artículo añadido') {
        setArticleCreated(true);
        setArticleLink('/ruta-del-articulo-creado');
      }
    })
    .catch((error) => {
      console.error('Fetch Error:', error);
    });
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="author_id">Autor</label>
          <input type="text" id="author_id" name="author_id" value={article.author_id} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-control" rows="5"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Categoría</label>
          <select id="category_id" name="category_id" value={article.category_id} onChange={handleChange} className="form-control">
            <option value="" disabled>Seleccione una categoría</option>
            {Object.keys(categories).map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sub_category_id">Subcategoría</label>
          <select id="sub_category_id" name="sub_category_id" value={article.sub_category_id} onChange={handleChange} className="form-control">
            <option value="" disabled>Seleccione una subcategoría</option>
            {categories[article.category_id]?.map((subcategory, index) => (
              <option key={index} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input type="file" id="image" onChange={handleImageChange} className="form-control-file" />
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
      {articleCreated && (
        <div className="alert alert-success">
          Artículo creado con éxito.
        </div>
      )}
      {renderTemplate()}
    </div>
  );
};

export default CreateArticle;




